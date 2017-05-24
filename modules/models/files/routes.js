import express from 'express';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.get('/:fileType', (req, res) => {
    let params = req.query;
    Utils.File.readFile({ base: params.path }, {isImage: req.params.fileType === "image"})
    .then(result => {
      res.json(result);
    });
  });

  Router.get('/thumb/:fileType/:size', (req, res) => {
    let params = req.query;
    let dimens = req.params.size.split('x');
    Utils.File.readFile({ base: params.path }, {isImage: req.params.fileType === "image", isThumbnail: true, width: dimens[0], height: dimens[1]})
    .then(result => {
      res.json({success: result.success, content: result.content.toString('base64'), mime: result.mime});
    });
  });

  router.use('/file', Router);
}
