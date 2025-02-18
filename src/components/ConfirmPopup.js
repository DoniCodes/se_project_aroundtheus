import Popup from "./Popup";

class ConfirmPopup extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popupElement.querySelector(".modal__container");
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-btn_delete"
    );
    this._submitbuttonTextContent = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector("#confirm-delete-btn")
      .addEventListener("click", () => {
        if (this._submitFunction) {
          this._submitFunction();
        }
      });
  }

  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }

  setIsDeleting(isDeleting) {
    if (isDeleting) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._submitbuttonTextContent;
    }
  }
}

export default ConfirmPopup;
