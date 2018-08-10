import axios from "axios";
const GITHUB_URL = "https://api.github.com";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com"

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
      .then(data => data.data ? data.data : 'No Issues Found')
      .catch(err => console.log(err.response));
  }

  static getReadMe(repo) {
    return axios
      .get(`${GITHUB_RAW_URL}/${repo}/master/README.md`)
      .then(x => new Promise(resolve => setTimeout(() => resolve(x), 1000)))
      .then(data => {
        return data.data;
      })
      .catch(error => {
        console.log("Error: GitHubAPI: getReadMe()", error.response);
        return "No README file found";
      });
  }
}
