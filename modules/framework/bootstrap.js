import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

export default function (config) {
  let app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  for (let key of Object.keys(config)) {
    if (typeof (config[key]) !== 'function') {
      app.set(`config.${key}`, config[key]);
    }
  }

  app.all('/test', (req, res) => {
    res.json({success: true});
  });

  return app;
};
