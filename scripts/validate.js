const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add(options.inputErrorClass);
  errorMessageElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(options.errorClass);
  inputElement.classList.remove(options.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (buttonElement, options) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(options.inactiveButtonClass);
};

const enableButton = (buttonElement, options) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(options.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, options);
  } else {
    buttonElement.disabled = false;
    enableButton(buttonElement, options);
  }
};

const resetValidation = (formElement, inputList, options) => {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options);
  });
};

const setEventListeners = (formElement, options) => {
  // get the form elements
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  // setup listenrs for the form elements
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      // check if the input is valid
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const setEventListners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

// enabling validation by calling enableValidation()
// pass all the settings on call
const enableValidation = ({ formSelector, ...options }) => {
  // select all the forms
  const formList = Array.from(document.querySelectorAll(formSelector));
  // loop through forms and setup listeners
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // setup event listeners for the form fields
    setEventListeners(formElement, options);
  });
};

enableValidation(config);
