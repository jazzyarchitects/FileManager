import express from 'express';
import path from 'path';

import Encrypter from '../../utils/crypto';

import React from 'react';

import ShareFilePassword from './views/share-file-password';
import Constants from '../../../constants';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.post('/url', (req, res) => {
    let obj = JSON.parse(Buffer.from(req.body.data, 'base64').toString());
    let filePath = obj.filePath;
    let password = obj.password;
    res.json({success: true, link: Encrypter.encryptString(filePath + '__password__=' + password)});
  });

  Router.get('/file/:filename', (req, res) => {
    if (!req.query.p) {
      return res.json({success: false, error: 'invalid url'});
    }
    let params = Encrypter.decryptString(req.query.p).split('__password__=');
    let filePath = params[0];
    let password = params[1];
    if (password === "no-password") {
      return res.sendFile(filePath);
    } else {
      res.cookie('p_f_a', Encrypter.encryptString([...password].reverse().join(''), true), {maxAge: 20 * 60 * 1000, httpOnly: true});
      res.cookie('p_f_l', Encrypter.encryptString(filePath, true), {maxAge: 20 * 60 * 1000, httpOnly: true});
      res.send(ShareFilePassword({hostname: Constants.BASE_URL, filename: req.params.filename}));
    }
  });

  Router.post('/file/:filename', (req, res) => {
    // console.log(req.body);
    // console.log([...req.body.password].reverse().join(''));
    // console.log(req.cookies['p_f_a']);
    // console.log(Encrypter.encryptString([...req.body.password].reverse().join(''), true));
    if (req.cookies['p_f_a'] === Encrypter.encryptString([...req.body.password].reverse().join(''), true)) {
      res.cookie('p_f_l', Encrypter.encryptString(req.cookies['p_f_l'] + '___ac___' + Encrypter.encryptString('__acceess__=true', true), true), {maxAge: 5 * 60 * 1000, httpOnly: true});
      res.cookie('p_f_a', '', {maxAge: 1});
      return res.json({success: true, link: `${Constants.BASE_URL}/share/${req.params.filename}`});
    } else {
      res.json({success: false});
    }
  });

  Router.get('/:filename', (req, res) => {
    let cook = Encrypter.decryptString(req.cookies['p_f_l']);
    if (!cook) {
      res.status(404);
      return res.send("File not found or Unautherised access");
    }
    let link = Encrypter.decryptString(cook.split('___ac___')[0]);
    let access = Encrypter.decryptString(cook.split('___ac___')[1]);
    if (access === '__acceess__=true') {
      res.sendFile(link);
    } else {
      res.status(404);
      res.send("File not found or Unautherised access");
    }
  });

  router.use('/share', Router);
}
