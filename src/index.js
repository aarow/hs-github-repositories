import React, { Component } from "react";
import ReactDOM from "react-dom";
import "element-theme-default";
import RepositoryTable from "./components/RepositoryTable";
import RepositoryDetail from "./components/RepositoryDetail";
import GitHubAPI from "./services/GitHubAPI";
import { Loading } from "element-react";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "hellofax",
      tableData: [],
      selectedRepository: null
    };

    this.getRepositories();
  }

  getRepositories() {
    GitHubAPI.getRepositories(this.state.username).then(tableData => {
      this.setState(prevState => {
        return {
          ...prevState,
          tableData
        };
      });
    });
  }

  selectRepository(selectedRepository) {
    this.setState(prevState => ({
      ...prevState,
      selectedRepository
    }));
  }

  removeSelectedRepository() {
    this.setState(prevState => ({
      ...prevState,
      selectedRepository: null
    }));
  }

  render() {
    return (
      <div className="App container">
        {!this.state.tableData && <Loading fullscreen={true} />}
        {!this.state.selectedRepository &&
          this.state.tableData && (
            <RepositoryTable
              username={this.state.username}
              tableData={this.state.tableData}
              selectRepository={this.selectRepository.bind(this)}
            />
          )}

        {this.state.selectedRepository && (
          <RepositoryDetail
            repository={this.state.selectedRepository}
            removeSelectedRepository={this.removeSelectedRepository.bind(this)}
          />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
