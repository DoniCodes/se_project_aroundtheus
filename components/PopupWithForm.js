import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._selector.querySelector(".modal__form");

    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".modal__input");

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit ", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();

    super.close();
  }
}

export default PopupWithForm;
