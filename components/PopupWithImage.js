import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._selector.querySelector(".modal__image");
    this._imageCaption = this._selector.querySelector(".modal__caption");
  }
  open({ data }) {
    this._imageElement.src = data.link;
    this._imageElement.alt = `Image ${data.name}`;
    this._imageCaption.textContent = data.name;
    super.open();
  }
}
export default PopupWithImage;
