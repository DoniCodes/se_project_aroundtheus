import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: " Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardListEl = document.querySelector(".cards__list");
const modalCloseButtons = document.querySelectorAll(".modal__close");

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.forms["profile-form"];
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addCardModal = document.querySelector("#profile-add-card-modal");
const addCardForm = document.forms["card-form"];
const addCardButton = document.querySelector("#card-add-button");
const addCardTitleInput = addCardForm.querySelector("#card-title-input");
const addCardUrlInput = addCardForm.querySelector("#card-url-input");

const previewModal = document.querySelector("#image-preview-modal");
const previewModalImg = document.querySelector(".modal__image");
const previewModalCaption = document.querySelector(".modal__caption");

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
  document.removeEventListener("mouseup", handleOverlayClick);
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
  document.addEventListener("mouseup", handleOverlayClick);
};

const isEscEvent = (e, action) => {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    action(activeModal);
  }
};

const handleEscUp = (e) => {
  e.preventDefault();
  isEscEvent(e, closeModal);
};

const handleOverlayClick = (e) => {
  if (e.target.classList.contains("modal_opened")) {
    closeModal(e.target);
  }
};

const handleProfileSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
};

const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
  addFormValidator.toggleButtonState();
};

const handleImageClick = (name, link) => {
  previewModalImg.src = link;
  previewModalImg.alt = name;
  previewModalCaption.textContent = name;
  openModal(previewModal);
};

modalCloseButtons.forEach((modalCloseBtn) => {
  modalCloseBtn.addEventListener("click", (e) => {
    const modals = modalCloseBtn.closest(".modal");
    closeModal(modals);
  });
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

//Validation
const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(formValidationConfig, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);
editFormValidator.enableValidation();

//Card
const createCard = (cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.generateCard();
};

const renderCard = (data, wrapper) => {
  const card = createCard(data);
  wrapper.prepend(card);
};

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
