import '@testing-library/jest-dom/extend-expect';
import { getByText, fireEvent, getByTestId } from '@testing-library/dom';
import { createUICounter } from '../../src/uiCounter/practice.js';

const INCREASE_TEXT = '+';
const DECREASE_TEXT = '-';
const CURR_VALUE = 'value';

let $container;
const options = {
  initVal: 10,
  min: 8,
  max: 12,
};

beforeEach(() => {
  $container = document.createElement('div');
  document.body.appendChild($container);

  createUICounter($container, options);
});

afterEach(() => {
  document.body.innerHTML = '';
});

it('생성시 버튼과 초기값을 렌더링한다.', () => {
  expect(getByText($container, INCREASE_TEXT)).toBeInTheDocument();
  expect(getByText($container, DECREASE_TEXT)).toBeInTheDocument();
  expect(getByTestId($container, CURR_VALUE)).toHaveTextContent(String(options.initVal));
});

it('+ 버튼 클릭시 1 증가한다.', async() => {
  fireEvent.click(getByText($container, INCREASE_TEXT));
  expect(getByTestId($container, CURR_VALUE)).toHaveTextContent(String(options.initVal + 1));
});

it('- 버튼 클릭시 1 감소한다.', async() => {
  fireEvent.click(getByText($container, DECREASE_TEXT));
  expect(getByTestId($container, CURR_VALUE)).toHaveTextContent(String(options.initVal - 1));
});

it('Max 값인 경우 + 버튼이 disabled 상태가 되며 클릭해도 증가하지 않는다.', async() => {
  fireEvent.click(getByText($container, INCREASE_TEXT));
  fireEvent.click(getByText($container, INCREASE_TEXT));
  fireEvent.click(getByText($container, INCREASE_TEXT));
  fireEvent.click(getByText($container, INCREASE_TEXT));

  expect(getByTestId($container, CURR_VALUE)).toHaveTextContent(String(options.max));
  expect(getByText($container, INCREASE_TEXT)).toBeDisabled();
});

it('Min 값인 경우 - 버튼이 disabled 상태가 되며, 클릭해도 감소하지 않는다.', () => {
  fireEvent.click(getByText($container, DECREASE_TEXT));
  fireEvent.click(getByText($container, DECREASE_TEXT));
  fireEvent.click(getByText($container, DECREASE_TEXT));
  fireEvent.click(getByText($container, DECREASE_TEXT));

  expect(getByTestId($container, CURR_VALUE)).toHaveTextContent(String(options.min));
  expect(getByText($container, DECREASE_TEXT)).toBeDisabled();
});
