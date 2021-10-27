import { Either as sut } from './either';

describe('Either ValueObject', () => {
  test('Should return a Failure if fail function is call', () => {
    const left = sut.left(new Error());

    expect(left.value).toEqual(new Error());
    expect(left.isLeft()).toBeTruthy();
    expect(left.isRight()).toBeFalsy();
  });

  test('Should return a Success if success function is call', () => {
    const right = sut.right(Object());

    expect(right.value).toEqual(Object());
    expect(right.isRight()).toBeTruthy();
    expect(right.isLeft()).toBeFalsy();
  });
});
