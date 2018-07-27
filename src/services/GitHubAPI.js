import axios from "axios";
const USERS_URL = "https://api.github.com/users/";

export default class GitHubAPI {
  static getRepositories(userName) {
    return axios.get(`${USERS_URL}${userName}/repos`).then(data => data.data);
  }
}
