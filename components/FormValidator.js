class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
  }

  _showInputError = (inputElement) => {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorMessageElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _disableButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  };

  _enableButton = (buttonElement) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
