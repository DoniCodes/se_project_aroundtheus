/* fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "d4997095-81bc-45a1-b79a-a4bada00470e",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  }); */

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  //GET request to the server to get the cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        //if the server returns an error reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error("Error:", error));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        name: "Placeholder name",
        about: "Placeholder description",
        avatar:
          "https://practicum-content.s3.amazonaws.com/resources/avatar_placeholder_1704989734.svg",
        _id: "d8d70f3cb03e440723aea056",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d4997095-81bc-45a1-b79a-a4bada00470e",
    "Content-Type": "application/json",
  },
});
