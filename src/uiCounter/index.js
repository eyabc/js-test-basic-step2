import { createUICounter } from './practice';

createUICounter(document.querySelector('#counter'), {
  initVal: 10,
  min: 8,
  max: 12
});
