import React, { Component } from "react";
import { Table, Card } from "element-react";
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

export default class RepositoryTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptions: []
    };

    const columnStandards = {
      standardWidth: 128
    };

    this.columns = [
      {
        type: "expand",
        width: "100%",
        expandPannel: data => {
          return (
            <pre className="readme-summary">
              {
                this.state.descriptions.find(desc => {
                  return desc.id === data.id;
                }).description
              }
            </pre>
          );
        }
      },
      {
        label: "Title",
        prop: "name",
        minWidth: "300px",
        render: data => (
          <div onClick={e => this.props.selectRepository(data)}>
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
        width: "180px",
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
        label: <GithubLogo width="1.2rem" height="1.2rem" />,
        prop: "html_url",
        align: "right",
        fit: true,
        width: 32,
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
        descriptions: props.tableData.map(repo => {
          return { id: repo.id, description: "" };
        })
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

  render() {
    return (
      <Card
        bodyStyle={{ padding: 0 }}
        header={
          <h2>
            <GithubLogo
              width="2rem"
              height="2rem"
              style={{ marginRight: "1rem", verticalAlign: "middle" }}
            />
            {this.props.username}
          </h2>
        }
      >
        <Table
          data={this.props.tableData}
          columns={this.columns}
          onExpand={(row, expanded) => {
            this.getDescription(row);
          }}
        />
      </Card>
    );
  }
}
