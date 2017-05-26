import ffmpeg from 'fluent-ffmpeg';

import * as File from './file';
import path from 'path';

const saveVideoThumbnail = (videoPath) => {
  return new Promise((resolve, reject) => {
    let tempFolder = path.join(__dirname, '..', '..', '..', 'tmp', 'video');
    let filename;
    ffmpeg(videoPath)
    .on('filenames', (filenames) => { filename = filenames[0] })
    .on('end', () => resolve(filename))
    .screenshots({
      timestamps: ['50%'],
      filename: videoPath.replace(/\//g, '-').slice(0, videoPath.lastIndexOf('.')) + '.png',
      folder: tempFolder,
      size: '320x240'
    });
  });
};

const getVideoThumbnail = async (videoPath) => {
  let tempFolder = path.join(__dirname, '..', '..', '..', 'tmp');
  let filePath = path.join(tempFolder, encodeURI(videoPath));
  let fileExists = await File.doesExists(filePath);
  if (fileExists) {
    return {success: true, path: filePath};
  } else {
    let thumbnailPath = await saveVideoThumbnail(videoPath);
    return {success: true, path: thumbnailPath};
  }
};

export {getVideoThumbnail};
