export const initialCards = [
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

export const selectors = {
  cardList: ".cards__list",
  cardTemplate: "#card-template",
  previewPopup: "#image-preview-modal",
  addCardForm: "#new-card-form",
  profileEditForm: "#profile-edit-form",
  newCardModal: "#profile-add-card-modal",
  editProfileModal: "#profile-edit-modal",
  deleteCardPopup: "#delete-card-modal",
  profileImagePopup: "#image-edit-modal",
};

export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileImage = document.querySelector(".profile__image");
export const editProfilebtn = document.querySelector("#profile-edit-button");
export const addCardbtn = document.querySelector("#card-add-button");
export const newCardForm = document.forms["new-card-form"];
export const editProfileForm = document.forms["profile-edit-form"];
export const profileImageForm = document.forms["profile-image-edit-form"];

export const formValidationConfig = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
