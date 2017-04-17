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
    .then( content => {
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
      .then( content => {
        expect(content).to.be.undefined;
        done();
      });
  });

});