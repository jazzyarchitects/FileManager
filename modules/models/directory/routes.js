import express from 'express';
import path from 'path';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.get('/', (req, res) => {
    let params = req.query;
    Utils.Directory.readDir({ base: params.base })
    .then(result => {
      res.json(result);
    });
  });

  router.use('/directory', Router);
}
