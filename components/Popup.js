class Popup {
  constructor(popupselector) {
    this._selector = document.querySelector(`#${popupselector}`);
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
    if (e.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._selector.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classlist.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
