import { MaxStringLengthPipe } from './max-string-length.pipe';

describe('MaxStringLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxStringLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
