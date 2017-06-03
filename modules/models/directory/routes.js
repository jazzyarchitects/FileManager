import express from 'express';
import Encrypter from '../../utils/crypto';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

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
