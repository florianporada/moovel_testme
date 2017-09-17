import helper from '../app/helper'

describe('testing helper: formatDate', () => {
  const dateString = 'Sun Sep 17 2017 12:21:20 GMT+0200 (CEST)';

  it('should convert dateStrings to yyyy-mm-dd format', () => {
    return expect(helper.formatDate(dateString)).toEqual('2017-09-17');
  });
});

describe('testing helper: formatNumber', () => {
  it('should convert numbers >1000 to 1k', () => {
    return expect(helper.formatNumber(1000)).toEqual('1k');
  });

  it('should convert number 20000 to 20k', () => {
    return expect(helper.formatNumber(20000)).toEqual('20k');
  });

  it('should convert number 5000000 to 5m', () => {
    return expect(helper.formatNumber(5000000)).toEqual('5m');
  });
});

describe('testing helper: isEmtpy', () => {
  it('should return false', () => {
    return expect(helper.isEmpty('hi')).toEqual(false);
  });

  it('should return false', () => {
    return expect(helper.isEmpty('')).toEqual(false);
  });

  it('should return true', () => {
    return expect(helper.isEmpty(null)).toEqual(true);
  });
});

describe('#dummy component', () => {
  it('dummy test', () => expect('dummy').toEqual('dummy'));
});
