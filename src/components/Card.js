class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.setAttribute("src", this._link);
    cardTitle.setAttribute("alt", this._name);
    cardTitle.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    const likeBtn = this._element.querySelector(".card__like-button");
    const deleteBtn = this._element.querySelector(".card__delete-button");

    cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, src: this._link });
    });

    likeBtn.addEventListener("click", this._handleLikeIcon);
    deleteBtn.addEventListener("click", this._handleDeleteCard);
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
  }
}

export default Card;
