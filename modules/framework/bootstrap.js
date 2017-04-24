import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

export default function (config) {
  let app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '..', '..', '..', 'public'), { maxAge: 60 }));

  for (let key of Object.keys(config)) {
    if (typeof (config[key]) !== 'function') {
      app.set(`config.${key}`, config[key]);
    }
  }

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
