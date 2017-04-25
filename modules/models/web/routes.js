import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import * as Utils from '../../utils';
import FolderListItem from '../../../react/components/FolderListItem';

export function initiateRoute (router) {
  let Router = express.Router();
  Router.all('/', (req, res) => {
    let markup = renderToString(<FolderListItem />)
    res.render('index', { markup });
  });

  router.use(Router);
}
