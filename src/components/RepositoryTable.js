import React, { Component } from "react";
import {connect} from 'react-redux';
import { Table, Card, Input } from "element-react";
import { Markdown } from 'react-showdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import GithubLogo from "./GitHubLogo";
import GitHubAPI from "../services/GitHubAPI";
/*
 - Name (include description in line below name in lighter print)
 - Last Updated
 - Primary language
 - Number of Watchers
 - Number of Forks
 - Number of Issues
 - Link to GitHub repo page (to be opened in new tab)
 */

class RepositoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptions: [],
      searchText: ""
    };

    const columnStandards = {
      standardWidth: 128
    };

    this.columns = [
      {
        type: "expand",
        expandPannel: data => {
          return (
            <div className="readme-summary">
            <Markdown markup={ this.state.descriptions.find(desc => {
                    return desc.id === data.id;
                  }).description } />
            </div>
          );
        }
      },
      {
        label: "Title",
        prop: "name",
        minWidth: 300,
        render: data => (
          <div
            className="clickable"
            onClick={e => this.props.selectRepository(data)}
          >
            <strong>
              {data.name + " "}
              <FontAwesomeIcon icon={faInfoCircle} />
            </strong>
          </div>
        )
      },
      {
        label: "Primary Language",
        prop: "language",
        width: 180,
        render: data => (data.language ? data.language : "(unspecified)")
      },
      {
        label: "Watchers",
        prop: "watchers",
        align: "right",
        width: columnStandards.standardWidth
      },
      {
        label: "Forks",
        prop: "forks",
        align: "right",
        width: columnStandards.standardWidth
      },
      {
        label: "Open Issues",
        prop: "open_issues_count",
        align: "right",
        width: columnStandards.standardWidth
      },
      {
        label: <GithubLogo width="1.4em" height="1.4em" />,
        prop: "html_url",
        align: "right",
        fit: true,
        render: data => (
          <a href={data.html_url} title={data.name} target="_blank">
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </a>
        )
      }
    ];
  }

  componentWillMount() {
    this.setupDescriptionsInState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setupDescriptionsInState(nextProps);
  }

  setupDescriptionsInState(props) {
    this.setState(prevState => {
      return {
        ...prevState,
        descriptions: props.tableData.map(repo => (
          { id: repo.id, description: "" }
        ))
      };
    });
  }

  getDescription(repo) {
    const description = this.state.descriptions.find(desc => {
      return desc.id === repo.id;
    }).description;

    if (!!description.trim()) return;

    GitHubAPI.getReadMe(repo.full_name).then(newDesc => {
      this.setState(prevState => {
        return {
          ...prevState,
          descriptions: prevState.descriptions.map(desc => {
            if (desc.id === repo.id) {
              return {
                id: desc.id,
                description: newDesc
              };
            } else return desc;
          })
        };
      });
    });
  }

  handleSearch(searchText) {
    this.setState({searchText});
  }

  render() {
    return (
      <Card
        bodyStyle={{ padding: 0 }}
        header={
          <h2>
            <GithubLogo
              width="1.4em"
              height="1.4em"
              style={{ marginRight: "1rem", verticalAlign: "middle" }}
            />
            {this.props.username} {this.props.isFetching}
          </h2>
        }
      >

        <Input 
          icon="search"
          value={this.state.searchText} 
          onChange={this.handleSearch.bind(this)}  
          placeholder="Search  repositorie titles"
          style={{margin: "1em", width: "66%"}} />

        <Table
          data={this.props.tableData.filter(repo => {
            return repo.name.includes(this.state.searchText);
          })}
          columns={this.columns}
          onExpand={(row, expanded) => {
            this.getDescription(row);
          }}
        />
      </Card>
    );
  }
}


const mapStateToProps = state => {
  const { repos } = state;
  const {
    isFetching,
    items
  } = repos;

  return {
    repos,
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(RepositoryTable);