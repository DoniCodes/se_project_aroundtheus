class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._userName ? this._userName.textContent : "",
      description: this._userDescription
        ? this._userDescription.textContent
        : "",
    };
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}

export default UserInfo;
