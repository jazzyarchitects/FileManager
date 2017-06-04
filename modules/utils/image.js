import fs from 'fs';
import sharp from 'sharp';

import 'babel-polyfill';

const getImageThumbnail = (imagePath, width, height) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, buf) => {
      sharp(imagePath)
      .resize(Number(Math.floor(width)) || 200, Number(Math.floor(height)) || 300)
      .max()
      .toBuffer()
      .then(data => {
        resolve(data.toString('base64'));
      })
      .catch(err => {
        console.log("err" + JSON.stringify(err));
        reject(err);
      });
    });
  });
}

export {getImageThumbnail};
