import express from 'express';
import path from 'path';

import Encrypter from '../../utils/crypto';

import ShareFilePassword from '../../../react-server/ShareFilePassword';
import ShareFilePasswordTemplate from '../../../react-server/ShareFilePassword-template';

import React from 'react';
import {renderToString} from 'react-dom/server';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.post('/url', (req, res) => {
    let obj = JSON.parse(Buffer.from(req.body.data, 'base64').toString());
    let filePath = obj.filePath;
    let password = obj.password;
    res.json({success: true, link: Encrypter.encryptString(filePath + '__password__=' + password)});
  });

  Router.get('/file/:filename', (req, res) => {
    let params = Encrypter.decryptString(req.query.p).split('__password__=');
    let filePath = params[0];
    let password = params[1];
    console.log(password);
    console.log(password === "no-password");
    if (password === "no-password") {
      res.sendFile(filePath);
    } else {
      console.log("Actual password: " + password);
      res.cookie('p_f_a', Encrypter.encryptString([...password].reverse().join('')), {maxAge: 20 * 60 * 1000, httpOnly: true});
      res.send(ShareFilePasswordTemplate({
        body: renderToString(<ShareFilePassword baseURL={req.query.p} filename={filePath.split('/')[filePath.split('/').length - 1]}/>)
      }));
    }
  });

  Router.post('/file/:filename', (req, res) => {
    console.log("Received password: " + [...req.body.password].reverse().join());
    if (req.cookies['p_f_a'] === Encrypter.encryptString([...req.body.password].reverse().join())) {
      return res.sendFile(filePath);
    } else {
      res.json({success: false});
    }
  });

  router.use('/share', Router);
}
