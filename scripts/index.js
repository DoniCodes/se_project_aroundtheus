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

/* ----------------------------------------------------------------------------- */
/*                               Elements                                        */
/* ----------------------------------------------------------------------------- */
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#profile-edit-form");

const addCardButton = document.querySelector("#card-add-button");
const addCardModal = document.querySelector("#profile-addcard-modal");
const addCardCloseModalButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector("#card-add-form");
const addCardTitleInput = addCardForm.querySelector("#card-title-input");
const addCardUrlInput = addCardForm.querySelector("#card-img-link");

/* ----------------------------------------------------------------------------- */
/*                              Functions                                        */
/* ----------------------------------------------------------------------------- */
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const newCardElement = getCardElement(cardData);
  wrapper.prepend(newCardElement);
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  // set the path to the image to the link field of the object
  cardImageEl.setAttribute("src", cardData.link);
  // set the image alt text to the name field of the object
  cardTitleEl.setAttribute("alt", cardData.name);
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // return the ready HTML element with the filled-in data
  return cardElement;
}

/* ----------------------------------------------------------------------------- */
/*                             Event Handlers                                    */
/* ----------------------------------------------------------------------------- */
function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
}

/* ----------------------------------------------------------------------------- */
/*                             Event Listeners                                   */
/* ----------------------------------------------------------------------------- */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardCloseModalButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
