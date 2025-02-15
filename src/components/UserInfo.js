class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
  }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._userName.textContent = name;
    if (about) this._userDescription.textContent = about;
    if (avatar) this._userAvatar.src = avatar;
  }
}

export default UserInfo;
