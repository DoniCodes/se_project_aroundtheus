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
  userName: ".profile__title",
  userDescription: ".profile__description",
});

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.previewPopup,
});

const userInfoPopup = new PopupWithForm({
  popupSelector: selectors.editProfileModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data.name,
      description: data.description,
    });
    editProfileForm.reset();
    userInfoPopup.close();
  },
});

newCardForm.reset();

const newCardPopUp = new PopupWithForm({
  popupSelector: selectors.newCardModal,
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
    newCardPopUp.close();
    addFormValidator.disableButton();
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
