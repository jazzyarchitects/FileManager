import express from 'express';
import path from 'path';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.get('/raw/:filename', (req, res) => {
    let filePath = req.query.path;
    if (!filePath) {
      return res.json({success: false, error: 'No path Supplied', code: 500});
    }
    return res.sendFile(filePath);
  });

  Router.get('/:fileType', (req, res) => {
    let query = req.query;
    if (req.params.fileType === "video") {
      Utils.Video.getVideoThumbnail(query.path)
      .then((result) => {
        res.json(result);
      });
    } else {
      Utils.File.readFile({ base: query.path }, {fileType: req.params.fileType})
      .then(result => {
        res.json(result);
      });
    }
  });

  Router.get('/thumb/video', (req, res) => {
    let params = req.query;
    res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'tmp', 'video', params.path));
  });

  Router.get('/thumb/audio', (req, res) => {
    Utils.Audio.getAudioDetails(req.query.path)
    .then(result => {
      result.success = true;
      res.json(result);
    });
  });

  // Router.get('/thumb/pdf', (req, res) => {

  // });

  Router.get('/thumb/:fileType/:size', (req, res) => {
    let params = req.query;
    let dimens = req.params.size.split('x');
    Utils.File.readFile({ base: params.path }, {fileType: req.params.fileType, isThumbnail: true, width: dimens[0], height: dimens[1]})
    .then(result => {
      res.json({success: result.success, content: result.content.toString('base64'), mime: result.mime});
    });
  });

  router.use('/file', Router);
}
