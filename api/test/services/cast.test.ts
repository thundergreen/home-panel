import app from '../../src/app';

describe('\'cast\' service', () => {
  it('registered the service', () => {
    const service = app.service('cast');
    expect(service).toBeTruthy();
  });
});
