import Popup from "./Popup";

class ConfirmPopup extends Popup {
  constructor(selector) {
    super(selector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector("#confirm-delete-btn")
      .addEventListener("click", () => {
        if (this._submitFunction) {
          this._submitFunction();
        }
      });
  }

  setSubmitFunction(submitFunction) {
    this._handleSubmit = action;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}

export default ConfirmPopup;
