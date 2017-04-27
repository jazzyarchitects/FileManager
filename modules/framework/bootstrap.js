import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

export default function (config) {
  let app = express();

  app.locals.pretty = true;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', '..', '..', 'public'));

  app.use(compression({
    level: 9
  }));

  app.use(helmet());

  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV && !global.isTesting) {
    app.use(morgan('dev'));
  }

  for (let key of Object.keys(config)) {
    if (typeof (config[key]) !== 'function') {
      app.set(`config.${key}`, config[key]);
    }
  }

  app.use('/public', express.static(path.join(__dirname, '..', '..', '..', 'public'), { maxAge: 60 }));

  app.all('/test', (req, res) => {
    res.json({ success: true });
  });

  (function () {
    let modelPath = path.join(__dirname, '..', 'models');
    fs.readdirSync(modelPath).forEach(model => {
      let folderPath = path.join(modelPath, model);
      let stat = fs.lstatSync(folderPath);
      if (stat.isDirectory()) {
        let routePath = path.join(folderPath, 'routes.js');
        if (fs.existsSync(routePath)) {
          require(routePath).initiateRoute(app);
        }
      }
    });
  })();

  return app;
}
