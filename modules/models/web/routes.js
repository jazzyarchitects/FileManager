import express from 'express';
import path from 'path';

export function initiateRoute (router) {
  let Router = express.Router();

  Router.all('/', async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'public', 'index.html'));
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
