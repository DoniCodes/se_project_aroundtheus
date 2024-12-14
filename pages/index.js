import {
  initialCards,
  selectors,
  formValidationConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({
  userName: selectors.profileTitle,
  userDescription: selectors.profileDescription,
});

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.profileEditForm,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.profileTitle,
      description: data.profileDescription,
    });
    userInfoPopup.close();
  },
});

const newCardPopUp = new PopupWithForm({
  popupSelector: selectors.addCardForm,
  handleFormSubmit: (cardData) => {
    const card = new Card(
      {
        data: cardData,
        handleImageClick: () => {
          popupWithImage.open(cardData);
        },
      },
      selectors.cardTemplate
    );
    cardSection.addItem(card.generateCard());
  },
});

const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = new Card(
        {
          data: cardData,
          handleImageClick: () => {
            popupWithImage.open(cardData);
          },
        },
        selectors.cardTemplate
      ); // Add the card to the DOM
      cardSection.addItem(cardElement.generateCard());
    },
  },
  selectors.cardList
);
userInfoPopup.setEventListeners();
newCardPopUp.setEventListeners();
popupWithImage.setEventListeners();
cardSection.renderItems(initialCards);

//Validation

const addFormValidator = new FormValidator(
  formValidationConfig,
  selectors.addCardForm
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  selectors.profileEditForm
);
editFormValidator.enableValidation();
