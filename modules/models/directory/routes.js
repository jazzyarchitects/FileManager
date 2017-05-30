import express from 'express';
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

  router.use('/directory', Router);
}
