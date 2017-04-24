const chai = require('chai');
const path = require('path');
const expect = chai.expect;

const request = require('request');

const app = require(path.join(__dirname, '..'));

const BASE = "http://localhost:3000";

before( ()=>{
  app.start();
});

describe("Server startup test", () => {
  ['GET', 'PUT', 'DELETE', 'POST'].forEach( (method) => {
    it(`Server ${method}`, done => {
      request({
        uri: `${BASE}/test`,
        method: `${method}`
      }, (err, response, body) => {
        expect(response.statusCode).to.equal(200);
        expect(response).to.not.be.null;
        expect(response).to.not.be.undefined;

        let res = JSON.parse(body);

        expect(res.success).to.be.true;
        done();
      });
    });
  });
});