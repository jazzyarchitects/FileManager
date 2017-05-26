import fs from 'fs';
import path from 'path';

import PDFImage from 'pdf-image';

const createPDFImage = function (pdfFilePath) {
  return new Promise(resolve => {
    let pdf = new PDFImage(pdfFilePath);
    pdf.convertPage(0)
    .then(imagePath => {
      resolve(imagePath);
    });
  });
}

const getPDFImagePath = async function (pdfFilePath) {

}

export {getPDFImagePath};
