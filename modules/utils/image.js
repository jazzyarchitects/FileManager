import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

import 'babel-polyfill';

const getImageThumbnail = (imagePath, width, height) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, (err, buf) => {
      sharp(imagePath)
      .resize(Number(width) || 200, Number(height) || 300)
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
