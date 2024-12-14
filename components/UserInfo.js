class UserInfo {
  constructor({ userName, userDescription }) {
    this._userName = document.querySelector(`.${userName}`);
    this._userDescription = document.querySelector(`.${userDescription}`);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}

export default UserInfo;
