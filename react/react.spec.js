import { InputCell, ComputeCell, CallbackCell } from './react';

describe('React module', () => {
    //1
  test('accepts input', () => {
    const inputCell = new InputCell(10);
    expect(inputCell.value).toEqual(10);
  });

    //2
  test('allows input cell value to be set', () => {
    const inputCell = new InputCell(4);
    inputCell.setValue(20);
    expect(inputCell.value).toEqual(20);
  });

    //3
  test('allows setting compute cells', () => {
    const inputCell = new InputCell(1);
    const fn = inputCells => inputCells[0].value + 1;
    const computeCell = new ComputeCell([inputCell], fn);
    expect(computeCell.value).toEqual(2);
  });

    //4
  test('compute cell takes inputs in correct order', () => {
    const inputCells = [
      new InputCell(1),
      new InputCell(2),
    ];

    const computeCell = new ComputeCell(
      inputCells,
      inputs => inputs[0].value + inputs[1].value * 10,
    );

    expect(computeCell.value).toEqual(21);
  });

    //5
  test('compute cells update value when inputs are changed', () => {
    const inputCell = new InputCell(1);
    const computeCell = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value + 1,
    );
    inputCell.setValue(3);
    expect(computeCell.value).toEqual(4);
  });

    //6
  test('compute cells can depend on other compute cells', () => {
    const inputCell = new InputCell(1);
    const timesTwo = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value * 2,
    );

    const timesThirty = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value * 30,
    );

    const sum = new ComputeCell(
      [timesTwo, timesThirty],
      inputs => inputs[0].value + inputs[1].value,
    );

    expect(sum.value).toEqual(32);

    inputCell.setValue(3);
    expect(sum.value).toEqual(96);
  });

    //7
  xtest('compute cells fire callbacks', () => {
    const inputCell = new InputCell(1);
    const output = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value + 1,
    );

    const callback = new CallbackCell(cell => cell.value);
    output.addCallback(callback);

    inputCell.setValue(3);
    expect(callback.values).toEqual([4]);
  });

    //8
  xtest('callbacks fire only when output values change', () => {
    const inputCell = new InputCell(1);
    const output = new ComputeCell(
      [inputCell],
      inputs => (inputs[0].value < 3 ? 111 : 222),
    );

    const callback = new CallbackCell(cell => cell.value);
    output.addCallback(callback);

    inputCell.setValue(2);
    expect(callback.values).toEqual([]);

    inputCell.setValue(4);
    expect(callback.values).toEqual([222]);
  });

    //9
  xtest('callbacks can be added and removed', () => {
    const inputCell = new InputCell(1);
    const output = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value + 1,
    );

    const callback1 = new CallbackCell(cell => cell.value);
    const callback2 = new CallbackCell(cell => cell.value);

    output.addCallback(callback1);
    output.addCallback(callback2);

    inputCell.setValue(31);

    output.removeCallback(callback1);

    const callback3 = new CallbackCell(cell => cell.value);
    output.addCallback(callback3);

    inputCell.setValue(41);

    expect(callback1.values).toEqual([32]);
    expect(callback2.values).toEqual([32, 42]);
    expect(callback3.values).toEqual([42]);
  });

    //10
  xtest('removing a callback multiple times doesn\'t interfere with other callbacks', () => {
    const inputCell = new InputCell(1);
    const output = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value + 1,
    );

    const callback1 = new CallbackCell(cell => cell.value);
    const callback2 = new CallbackCell(cell => cell.value);

    output.addCallback(callback1);
    output.addCallback(callback2);

    output.removeCallback(callback1);
    output.removeCallback(callback1);
    output.removeCallback(callback1);

    inputCell.setValue(2);

    expect(callback1.values).toEqual([]);
    expect(callback2.values).toEqual([3]);
  });

    //11
  xtest('callbacks should only be called once, even if multiple dependencies change', () => {
    const inputCell = new InputCell(1);
    const plusOne = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value + 1,
    );

    const minusOne1 = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value - 1,
    );

    const minusOne2 = new ComputeCell(
      [minusOne1],
      inputs => inputs[0].value - 1,
    );

    const output = new ComputeCell(
      [plusOne, minusOne2],
      inputs => inputs[0].value * inputs[1].value,
    );

    const callback1 = new CallbackCell(cell => cell.value);
    output.addCallback(callback1);

    inputCell.setValue(4);

    expect(callback1.values).toEqual([10]);
  });

    //12
  xtest('callbacks should not be called if dependencies change but output value doesn\'t change', () => {
    const inputCell = new InputCell(1);
    const plusOne = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value + 1,
    );

    const minusOne = new ComputeCell(
      [inputCell],
      inputs => inputs[0].value - 1,
    );

    const alwaysTwo = new ComputeCell(
      [plusOne, minusOne],
      inputs => inputs[0].value - inputs[1].value,
    );


    const callback = new CallbackCell(cell => cell.value);
    alwaysTwo.addCallback(callback);

    inputCell.setValue(2);
    inputCell.setValue(3);
    inputCell.setValue(4);
    inputCell.setValue(5);

    expect(callback.values).toEqual([]);
  });
});
