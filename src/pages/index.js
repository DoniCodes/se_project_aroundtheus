import "../pages/index.css";

import {
  selectors,
  editProfilebtn,
  addCardbtn,
  newCardForm,
  editProfileForm,
  profileImageForm,
  profileImage,
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
import ConfirmPopup from "../components/ConfirmPopup.js";
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

const profileImagePopup = new PopupWithForm({
  popupSelector: selectors.profileImagePopup,
  handleFormSubmit: handleProfileImageSubmit,
});

const newCardPopUp = new PopupWithForm({
  popupSelector: selectors.newCardModal,
  handleFormSubmit: handleAddCardFormSubmit,
});

const confirmPopup = new ConfirmPopup({
  popupSelector: selectors.deleteCardPopup,
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
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
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
confirmPopup.setEventListeners();
profileImagePopup.setEventListeners();

/* Functions */

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

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

function handleDeleteCard(card) {
  confirmPopup.setSubmitFunction(() => {
    confirmPopup.setIsDeleting(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.getElement().remove();
        confirmPopup.setIsDeleting(false);
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        confirmPopup.close();
      });
  });

  confirmPopup.open();
}

function handleCardLike(card) {
  if (card.getIsLiked()) {
    api
      .unlikeCard(card.getId())
      .then(() => {
        card.setIsLiked(false);
        card.renderLike();
      })
      .catch((err) => {
        console.error("Error unliking card:", err);
      });
  } else {
    api
      .likeCard(card.getId())
      .then(() => {
        card.setIsLiked(true);
        card.renderLike();
      })
      .catch((err) => {
        console.error("Error liking card:", err);
      });
  }
}

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

function handleProfileImageSubmit(inputValue) {
  const imageData = {
    avatar: inputValue.avatar,
  };
  profileImagePopup.setIsSaving(true);
  api
    .updateProfilePicture(imageData)
    .then(() => {
      userInfo.setUserInfo(imageData);
      profileImagePopup.close();
      profileImageFormValidator.disableButton();
      profileImageForm.reset();
    })
    .catch((err) => {
      console.error("Error updating profile picture:", err);
    })
    .finally(() => {
      profileImagePopup.setIsSaving(false);
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

/* Event Listeners */

addCardbtn.addEventListener("click", () => newCardPopUp.open());

editProfilebtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  userInfoPopup.open();
});

profileImage.addEventListener("click", () => {
  profileImagePopup.open();
});

//Validation

const addFormValidator = new FormValidator(formValidationConfig, newCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  editProfileForm
);
editFormValidator.enableValidation();

const profileImageFormValidator = new FormValidator(
  formValidationConfig,
  profileImageForm
);
profileImageFormValidator.enableValidation();
