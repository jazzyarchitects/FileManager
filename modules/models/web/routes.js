import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import * as Utils from '../../utils';
import FolderList from '../../../react/components/FolderList';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.all('/', async (req, res) => {
    try {
      let pathObj = {base: '/home/jibin/Documents/NodeJS/'};
      let result = await Utils.Directory.readDir(pathObj);
      let list = result.content;

      pathObj.name = 'FileManager';
      result = await Utils.Directory.readDir(pathObj);
      let folderContent = result.content;

      let folderList = renderToString(<FolderList folderContents={list} />);
      res.render('index', { pathObj, folderList, folderContent});
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  Router.all('/test/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html'));
  });

  router.use(Router);
}
