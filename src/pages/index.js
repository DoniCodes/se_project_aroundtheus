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
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({
  userNameSelector: "#profile-title",
  userDescriptionSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.editProfileModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.title, description: data.description });
    userInfoPopup.close();
  },
});

const newCardPopUp = new PopupWithForm({
  popupSelector: selectors.newCardModal,
  handleFormSubmit: (cardData) => {
    const card = createCard({ name: cardData.title, link: cardData.url });
    selectors.cardTemplate;
    cardSection.addItem(card);
    newCardPopUp.close();
    addFormValidator.disableButton();
  },
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

const createCard = (cardData) => {
  const card = new Card(
    {
      data: cardData,
      handleImageClick: () => {
        popupWithImage.open(cardData);
      },
    },
    selectors.cardTemplate
  );
  return card.generateCard();
};

userInfoPopup.setEventListeners();
newCardPopUp.setEventListeners();
popupWithImage.setEventListeners();
cardSection.renderItems(initialCards);

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
