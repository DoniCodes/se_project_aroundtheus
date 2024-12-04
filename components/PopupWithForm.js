import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });

    this._popupForm = this._selector.querySelector(".modal__form");
    this._inputList = this._selector.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener("submit ", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues);
      this.close();
    });
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}

export default PopupWithForm;
