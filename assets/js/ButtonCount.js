class ButtonCount extends HTMLElement {
  count = 0;

  constructor() {
    super();
    this.render(this.count);
    this.addEventListener("click", () => {
      this.count++;
      this.render(this.count);
    });
  }

  render = (count) => {
    this.innerHTML = `<button class="dialogButton">Times Clicked: ${count}</button>`;
  };
}

customElements.define("button-count", ButtonCount);
