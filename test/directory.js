"use strict";

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

const Module = require('../compiled/modules/utils');

describe('Directory Operation test', () => {
  it('Reads directory contents list correctly', (done) => {
    let basePath = path.join(__dirname, '..');
    Module.Directory.readDir({
      base: basePath
    })
    .then(data => {
      let found = [];
      let contents = fs.readdirSync(basePath);
      contents.forEach((content) => {
        let contentPath = path.join(basePath, content);
        let stat = fs.lstatSync(contentPath);

        let foundObject = data.find((element) => {
          return element.path === contentPath &&
          element.name === content &&
          element.size === stat.size &&
          element.mtime === new Date(stat.mtime).getTime() &&
          element.ctime === new Date(stat.ctime).getTime() &&
          element.isFile === stat.isFile()
        });
        found.push(foundObject);
      });
      expect(found.length).to.equal(data.length);
      done();
    });
  });
});
