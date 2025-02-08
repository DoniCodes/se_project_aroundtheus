class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Check if the response from server is successful
  _checkResponse(res) {
    if (!res.ok) {
      Promise.reject(`Error ${res.status}`);
    }
    return res.json();
  }
  //GET request to the server to get the cards
  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  //POST request to the server to add a new card
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //PATCH request to the server to update the user info
  updateUserInfo({ name, about }) {
    console.log("Name:", name, "About:", about);
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error("Error updating user info:", err);
      });
  }
}

export default Api;
