import { IsJsonPipe } from './is-json.pipe';

describe('IsJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new IsJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
