"use strict";

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

const Module = require('../compiled');

describe('File operation test', () => {
  it('Reads file contents correctly', (done)=>{
    let basePath = path.join(__dirname, '..');
    Module.File.readFile({
      base: basePath,
      name: 'package.json'
    })
    .then(content => {
      let c = fs.readFileSync(path.join(basePath, 'package.json')).toString();
      expect(content).to.equal(c);
      done();
    });
  });

  it('Does not crash if file not exists', (done)=>{
    let basePath = path.join(__dirname, '..');
    Module.File.readFile({
      base: basePath,
      name: 'packageWhichDoesNotExists.json'
    })
      .then(content => {
        expect(content).to.be.false;
        done();
      });
  });

  it('Creates a blank file', (done)=>{
    let basePath = path.join(__dirname, '..');
    let fileName = "newBlankFile.js";
    Module.File.createFile({
      base: basePath,
      name: fileName
    })
    .then(result => {
      let fileCreated = fs.existsSync(path.join(basePath, fileName));
      if (fileCreated) {
        fs.unlinkSync(path.join(basePath, fileName));
      }
      expect(fileCreated).to.be.true;
      done();
    });
  });

  it('Successfully deletes a file', (done)=>{
    let basePath = path.join(__dirname, '..');
    let fileName = "deleteTestFile.json";
    fs.writeFileSync(path.join(basePath, fileName), "This is a test file... Should have been deleted");

    let fileCreated = false, fileDeleted = false;
    if (fs.existsSync(path.join(basePath, fileName))) {
      fileCreated = true;
    }
    Module.File.deleteFile({
      base: basePath,
      name: fileName
    })
    .then(result => {
      if (!fs.existsSync(path.join(basePath, fileName))) {
        fileDeleted = true;
      }
      expect(fileCreated).to.be.true;
      expect(fileDeleted).to.be.true;
      done();
    });
  });
});
