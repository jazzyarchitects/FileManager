import express from 'express';
import Encrypter from '../../utils/crypto';
import * as Utils from '../../utils';
import md5 from 'md5';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.get('/share', (req, res) => {
    let query = req.query.p;
    if (!query) {
      return res.json({success: false, error: 'No File Specified'});
    }
    query = Encrypter.decryptString(query);
    let parts = query.split('__password__=');
    let filePath = parts[0];
    let password = Encrypter.encryptString(md5(parts[1]));
    res.json({filePath, password});
  });

  Router.use((req, res, next) => {
    if (req.loggedIn) {
      next();
      return;
    }
    res.status(403);
    res.json({success: false, error: 'Authentication Error', code: 403});
  });

  Router.get('/', (req, res) => {
    let params = req.query;
    Utils.Directory.readDir({ base: params.base })
      .then(result => {
        res.json(result);
      });
  });

  Router.put('/:operation', (req, res) => {
    let pathObj = {
      targetFile: Encrypter.decryptString(req.body.tf),
      targetDirectory: Encrypter.decryptString(req.body.td)
    };
    Utils.Directory.transferFile(pathObj, req.params.operation === 'cut')
      .then(result => {
      // console.log(result)
        res.json(result);
      })
      .catch(err => {
        console.log(err);
        res.json({success: false});
      })
  });

  router.use('/directory', Router);
}
