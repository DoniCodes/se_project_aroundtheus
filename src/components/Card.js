class Card {
  constructor(
    { _id, name, link, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleCardLike
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardLike = handleCardLike;
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

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._link;
    cardTitle.alt = this._name;
    cardTitle.textContent = this._name;

    if (this._isLiked) {
      this._handleLikeIcon();
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    const likeBtn = this._element.querySelector(".card__like-button");
    const deleteBtn = this._element.querySelector(".card__delete-button");

    cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    likeBtn.addEventListener("click", () => {
      this._handleCardLike(this);
    });
    deleteBtn.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this._element);
    });
  }

  _handleLikeIcon(evt) {
    evt.target.classList.toggle("card__like-button_active", this._isLiked);
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
    return this._isLiked;
  }

  renderLike() {
    this._handleLikeIcon(this);
  }

  delete() {
    this._handleDeleteCard(this._id, this._element);
  }

  _handleDeleteCard(evt) {
    evt.target.closest(".card").remove();
  }
}

export default Card;
