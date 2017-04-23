"use strict";

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const path = require('path');

const Module = require('../compiled/utils');

describe('File operation test', () => {
  it('Reads file contents correctly', done => {
    let basePath = path.join(__dirname, '..');
    Module.File.readFile({
      base: basePath,
      name: 'package.json'
    })
    .then(result => {
      let c = fs.readFileSync(path.join(basePath, 'package.json')).toString();

      expect(result.success).to.be.true;
      expect(result.content).to.equal(c);
      done();
    });
  });

  it('Does not crash if trying to read non-existent file', done => {
    let basePath = path.join(__dirname, '..');
    Module.File.readFile({
      base: basePath,
      name: 'packageWhichDoesNotExists.json'
    })
      .then(result => {
        expect(result.success).to.be.false;
        expect(result.error).to.not.be.undefined;
        expect(result.code).to.equal('ENOENT');
        done();
      });
  });

  it('Creates a blank file', done => {
    let basePath = path.join(__dirname, '..');
    let fileName = "newBlankFile.js";
    Module.File.createFile({
      base: basePath,
      name: fileName
    })
    .then(result => {
      let fileCreated = fs.existsSync(path.join(basePath, fileName));
      if (fileCreated) {
        let content = fs.readFileSync(path.join(basePath, fileName)).toString();
        expect(content).to.equal("");
        fs.unlinkSync(path.join(basePath, fileName));
      }
      expect(result.success).to.be.true;
      expect(fileCreated).to.be.true;
      done();
    });
  });

  it('Show error when creating an existing file', done => {
    let basePath = path.join(__dirname, '..');
    let fileName = "testPath1.json";
    fs.writeFileSync(path.join(basePath, fileName), "Some random file");
    Module.File.createFile({
      base: basePath,
      name: fileName
    })
    .then(result => {
      expect(result.success).to.be.false;
      expect(result.error).to.not.be.undefined;
      expect(result.code).to.equal('EEXIST');

      fs.unlinkSync(path.join(basePath, fileName));
      done();
    });
  });

  it('Successfully deletes a file', done => {
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
      expect(result.success).to.be.true;
      expect(fileCreated).to.be.true;
      expect(fileDeleted).to.be.true;
      done();
    });
  });

  it('Does not crash when trying to delete non-existent file', done => {
    let basePath = path.join(__dirname, '..');
    let fileName = "non-existent-file.json";
    Module.File.deleteFile({
      base: basePath,
      name: fileName
    })
    .then(result => {
      expect(result.success).to.be.false;
      expect(result.error).to.not.be.undefined;
      expect(result.code).to.equal('ENOENT');
      done();
    })
  })
});
