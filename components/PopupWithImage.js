import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open(data) {
    this._selector.querySelector("#popup-caption").textContent = data.name;
    const image = this._selector.querySelector("#popup-image");
    image.src = data.link;
    image.alt = `Image ${data.name}`;
    super.open();
  }
}

export default PopupWithImage;
