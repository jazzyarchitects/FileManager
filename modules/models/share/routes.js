import express from 'express';
import path from 'path';

import Encrypter from '../../utils/crypto';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.post('/url', (req, res) => {
    let obj = JSON.parse(Buffer.from(req.body.data, 'base64').toString());
    let filePath = obj.filePath;
    let password = obj.password;
    res.json({success: true, link: Encrypter.encryptString(filePath + '__password__=' + password)});
  });

  Router.get('/file', (req, res) => {
    let param = Encrypter.decryptString(req.query.p)
    console.log(param);
  });

  router.use('/share', Router);
}
