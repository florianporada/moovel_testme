const chai = require('chai');
const mocha = require('mocha');
const server = require('../server/index');

mocha.describe('server testing', () => {
  mocha.it('should do something', () => {
    const result = server.getUsers();
    chai.expect(result).to.equal('1');
  });
});
