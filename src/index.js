import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button } from "element-react";
import "element-theme-default";
import RepositoryTable from "./components/RepositoryTable";
import RepositoryDetail from "./components/RepositoryDetail";
import GitHubAPI from "./services/GitHubAPI";
import { Loading } from "element-react";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    const username = 'hellofax';

    this.state = {
      username: username,
      tableData: [],
      selectedRepository: null,
      searchText: ""
    };

    this.getRepositories(username);
  }

  getRepositories(username) {
    GitHubAPI.getRepositories(username).then(tableData => {
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

  handleInput(searchText) {
    this.setState({searchText});
  }

  handleSearch(e) {
    e.preventDefault();
    console.log(this.state.searchText)
    this.setState(prevState => {
      this.getRepositories(this.state.searchText);
      return {
        username: prevState.searchText,
        selectedRepository: null,
        searchText: ""
      }
    });
  }

  render() {
    return (
      <div className="App container">
        <Form 
          inline={true}
          onSubmit={this.handleSearch.bind(this)} 
          style={{margin: "1em 0"}}
          >
          <Form.Item>
            <Input 
              icon="search"
              placeholder="Search  Github users"
              ref="searchText"
              value={this.state.searchText}
              onChange={this.handleInput.bind(this)}
              />
          </Form.Item>
          <Form.Item>
            <Button nativeType="submit" type="primary">Search</Button>
          </Form.Item>
        </Form>
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
