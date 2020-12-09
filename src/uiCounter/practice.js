import { createCounter } from '../backup/counter';

export function createUICounter(el, options) {
  const $el = el;
  const counter = createCounter(options);

  function render() {
    const val = counter.val();
    const decDisabled = counter.isMin() ? 'disabled' : '';
    const incDisabled = counter.isMax() ? 'disabled' : '';

    $el.innerHTML = `
      <button type="button" ${decDisabled} class="btn btn-secondary btn-dec">-</button>
      <span data-testid="value">${val}</span>
      <button type="button" ${incDisabled} class="btn btn-primary btn-inc">+</button>
    `;
  }

  render();

  $el.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('btn-inc')) return;
    counter.inc();
    render();
  })

  $el.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('btn-dec')) return;
    counter.dec();
    render();
  })

}
