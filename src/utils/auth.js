class Auth {
  constructor(options) {
    this._options = options;
  }

  _verifyResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error();
  }

  _logInfo(res) {
    console.log("Request was successful:");
    console.log(res);
  }

  signUpUser({ email, password }) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      header: this._options.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }

  signInUser({ email, password }) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      header: this._options.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }

  getMyInfo(jwt) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      header: { ...this._options.headers, Authorization: `Bearer ${jwt}` },
    })
      .then(this._verifyResponse)
      .then((res) => {
        this._logInfo(res);
        return res;
      });
  }
}

const auth = new Auth({
  baseUrl: "https://register.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
});