import fetch from "isomorphic-fetch";

class Database {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  get(ref) {
    return fetch(`${this.baseUrl}/${ref}.json`).then(res => res.json());
  }

  post(ref, body) {
    const options = {
      method: "POST",
      body
    };
    return fetch(`${this.baseUrl}/${ref}.json`, options).then(res =>
      res.json()
    );
  }

  put(ref, body) {
    const options = {
      method: "POST",
      body
    };
    return fetch(`${this.baseUrl}/${ref}.json`, options).then(res =>
      res.json()
    );
  }
}
export default Database;
