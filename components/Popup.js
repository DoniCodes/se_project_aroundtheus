class Popup {
  constructor({ popupSelector }) {
    this._selector = document.querySelector(`.${popupSelector}`);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._selector.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._selector.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    e.preventDefault();
    if (e.key === "Escape" || e.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    this._selector
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._selector.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains(".modal")) {
        this.close();
      }
    });
  }
}

export default Popup;
