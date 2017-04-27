import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import * as Utils from '../../utils';
import App from '../../../react/components/MainApp';

export function initiateRoute (router) {
  let Router = express.Router();
  Router.all('/', (req, res) => {
    let markup = renderToString(<App />)
    res.render('index', { markup });
  });

  Router.all('/test/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html'));
  });

  router.use(Router);
}
