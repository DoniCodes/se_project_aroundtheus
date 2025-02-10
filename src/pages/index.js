import "../pages/index.css";

import {
  initialCards,
  selectors,
  editProfilebtn,
  addCardbtn,
  newCardForm,
  editProfileForm,
  profileTitleInput,
  profileDescriptionInput,
  formValidationConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({
  userNameSelector: "#profile-title",
  userDescriptionSelector: ".profile__description",
  userAvatarSelector: ".profile__image",
});

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.editProfileModal,
  handleFormSubmit: handleProfileEditSubmit,
});

const newCardPopUp = new PopupWithForm({
  popupSelector: selectors.newCardModal,
  handleFormSubmit: handleAddCardFormSubmit,
});

const cardSection = new Section(
  {
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    },
  },
  selectors.cardList
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "95813e96-588f-4415-8ffb-bcee955e5070",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => console.error(err));

api
  .getInitialCards()
  .then((cards) => {
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error fetching initial cards:", err);
  });

userInfoPopup.setEventListeners();
newCardPopUp.setEventListeners();
popupWithImage.setEventListeners();

/* Functions */

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

function handleDeleteCard(card) {}

function handleCardLike(card) {}

function handleProfileEditSubmit(inputValue) {
  userInfoPopup.setIsSaving(true);

  api
    .updateUserInfo({
      name: inputValue.title,
      about: inputValue.description,
    })
    .then((updateUserData) => {
      userInfo.setUserInfo({
        name: updateUserData.name,
        about: updateUserData.about,
      });
      userInfoPopup.close();
    })
    .catch((err) => {
      console.error("Error updating user info:", err);
    })
    .finally(() => {
      userInfoPopup.setIsSaving(false);
    });
}

function handleAddCardFormSubmit(inputValue) {
  newCardPopUp.setIsSaving(true);
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };
  api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      newCardPopUp.close();
      newCardForm.reset();
      addFormValidator.disableButton();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => {
      newCardPopUp.setIsSaving(false);
    });
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick,
    handleDeleteCard,
    handleCardLike
  );
  return card.generateCard();
}

addCardbtn.addEventListener("click", () => newCardPopUp.open());

editProfilebtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  userInfoPopup.open();
});

//Validation

const addFormValidator = new FormValidator(formValidationConfig, newCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  editProfileForm
);
editFormValidator.enableValidation();
