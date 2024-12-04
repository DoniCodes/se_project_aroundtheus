import {
  initialCards,
  selectors,
  formValidationConfig,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";

const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];

const popupWithImage = new PopupWithImage({
  popupSelector: selectors.previewPopup,
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
popupWithImage.setEventListeners();
cardSection.renderItems(initialCards);

//Validation

const addFormValidator = new FormValidator(formValidationConfig, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);
editFormValidator.enableValidation();

/* const closeModal = (modal) => {
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
}; */

/* const handleProfileSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}; */

/* const handleAddCardSubmit = (e) => {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
  addFormValidator.toggleButtonState();
}; */

/* const handleImageClick = (name, link) => {
  previewModalImg.src = link;
  previewModalImg.alt = name;
  previewModalCaption.textContent = name;
  openModal(previewModal);
}; */

/* modalCloseButtons.forEach((modalCloseBtn) => {
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
}); */
