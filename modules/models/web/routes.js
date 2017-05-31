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

  Router.post('/login', (req, res) => {
    if (req.body.password === global.password) {
      res.cookie("_p_u_id", global.password, {
        // httpOnly: true,
        maxAge: 20 * 60 * 1000
      });
      return res.json({success: true});
    }
    res.json({success: false});
  });

  router.use(Router);
}
