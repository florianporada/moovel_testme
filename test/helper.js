const chai = require('chai');
const mocha = require('mocha');

const helper = require('../server/components/helper');

mocha.describe('testing helpers', () => {
  mocha.it('should sort users by name', () => {
    const unsorted = [
      { login: 'Pete' },
      { login: 'Bri' },
      { login: 'Xander' },
      { login: 'Nora' },
      { login: 'Hans' },
    ];

    const sorted = [
      { login: 'Bri' },
      { login: 'Hans' },
      { login: 'Nora' },
      { login: 'Pete' },
      { login: 'Xander' },
    ];

    chai.expect(sorted).eql(unsorted.sort(helper.compareUsernames));
  });
});
