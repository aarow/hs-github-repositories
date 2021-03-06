import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, AutoComplete } from "element-react";
import "element-theme-default";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducer from './reducers';
import RepositoryTable from "./components/RepositoryTable";
import RepositoryDetail from "./components/RepositoryDetail";
import GitHubAPI from "./services/GitHubAPI";
import "./styles.css";

/**Class representing root of application */
class App extends Component {
  
  constructor(props) {
    super(props);

    const username = 'hellofax';

    this.state = {
      username: username,
      tableData: [],
      selectedRepository: null,
      searchText: "",
      userSearchResults: []
    };

    // initialize repositories from default user provided as requirement of app
    this.getRepositories(username);
  }

  /**
   * Allows autocomplete to continuously update during typing in to git user search field.
   * Provides asynchronous look up with debouncing 
   * @param {string} queryString 
   * @param {function} cb 
   */
  searchUsers(queryString, cb) {
    this.handleInput(queryString);

    clearTimeout(this.timeout);
    if(queryString.trim() === '') {
      cb([])
      return;
    };

    this.timeout = setTimeout(() => {
      GitHubAPI.searchUsers(queryString)
      .then(userSearchResults => {
        this.setState({userSearchResults})
        console.log(userSearchResults);
        cb(this.state.userSearchResults);    
      })
    }, 300);
  }

  /**
   * Calls github API for list of repositories by specified username
   * @param {string} username 
   */
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

  handleSelect(selected) {
    this.setState({searchText: selected.value})
    this.handleSearch();
  }

  handleSearch(e=null) {
    if(e) e.preventDefault();
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
          <AutoComplete
            placeholder="Search for users"
            ref="searchText"
            value={this.state.searchText}
            fetchSuggestions={this.searchUsers.bind(this)}
            onSelect={this.handleSelect.bind(this)}
            triggerOnFocus={false}
          ></AutoComplete>
          </Form.Item>
          {/* <Form.Item>
            <Input 
              icon="search"
              placeholder="Search Github users"
              ref="searchText"
              value={this.state.searchText}
              onChange={this.handleInput.bind(this)}
              />
          </Form.Item> */}
          <Form.Item>
            <Button nativeType="submit" type="primary">Search</Button>
          </Form.Item>
        </Form>

        {!this.state.selectedRepository && (
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


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById("root")
);
