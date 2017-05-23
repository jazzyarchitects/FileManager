import express from 'express';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.get('/:fileType', (req, res) => {
    let params = req.query;
    console.log(params);
    Utils.File.readFile({ base: params.path }, req.params.fileType === "image")
    .then(result => {
      res.json(result);
    });
  });

  router.use('/file', Router);
}
