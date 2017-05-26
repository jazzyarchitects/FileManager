"use strict";

import fs from 'fs';
import id3 from 'id3-parser';

const getAudioDetails = function (filePath) {
  return new Promise((resolve, reject) => {
    let file = fs.readFileSync(filePath);
    id3.parse(file)
      .then((tag) => {
        if (!tag.image) {
          tag.imageURL = "";
          return resolve(tag);
        }
        tag.imageURL = 'data:' + tag.image.mime + ';base64,' + tag.image.data.toString('base64');
        delete tag.image;
        resolve(tag);
      });
  });
};

export {getAudioDetails};
