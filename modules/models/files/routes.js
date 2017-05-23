import express from 'express';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.get('/', (req, res) => {
    let params = req.query;
    console.log(params);
    Utils.File.readFile({ base: params.path })
    .then(result => {
      res.json(result);
    });
  });

  router.use('/file', Router);
}
