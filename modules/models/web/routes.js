import express from 'express';
import path from 'path';
import * as Utils from '../../utils';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.all('/', async (req, res) => {
    try {
      // let pathObj = {base: '/home/jibin/Documents/NodeJS/'};
      // let result = await Utils.Directory.readDir(pathObj);
      // let list = result.content;

      // pathObj.name = 'FileManager';
      // result = await Utils.Directory.readDir(pathObj);
      // let folderContent = result.content;

      // let folderList = renderToString(<FolderList folderContents={list} pathObj={pathObj}/>);
      // res.render('index', { pathObj, folderList, folderContent});
      res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html'));
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  Router.all('/test/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html'));
  });

  Router.get('/directory', async (req, res) => {
    let pathObj = {};
    pathObj.base = path.join(req.body.currentBase, '..');
    let result = await Utils.Directory.readDir(pathObj);

    let list = result.content;

    res.json(result);
  });

  router.use(Router);
}
