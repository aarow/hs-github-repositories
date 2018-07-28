import axios from "axios";
const GITHUB_URL = "https://api.github.com";

export default class GitHubAPI {
  static getRepositories(userName) {
    return axios
      .get(`${GITHUB_URL}/users/${userName}/repos`)
      .then(data => data.data)
      .catch(err => console.log(err.response));
  }

  static getIssues(repo) {
    return axios
      .get(`${GITHUB_URL}/repos/${repo}/issues`)
      .then(data => data.data)
      .catch(err => console.log(err.response));
  }

  static getReadMe(repo) {
    return axios
      .get(`https://raw.githubusercontent.com/${repo}/master/README.md`)
      .then(data => {
        return data.data;
      })
      .catch(error => {
        console.log("Error: getReadMe()", error.response);
        return "";
      });
  }
}
