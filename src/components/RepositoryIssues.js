import React from "react";
import GitHubAPI from "../services/GitHubAPI";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { Table, Card } from "element-react";

const columns = [
  {
    label: "Title",
    prop: "title"
  },
  {
    label: (
      <span>
        <FontAwesomeIcon icon={faCalendarAlt} /> Created
      </span>
    ),
    prop: "created_at",
    render: function(data) {
      return <Moment format="MM/DD/YYYY">{data.created_at}</Moment>;
    }
  },
  {
    label: (
      <span>
        <FontAwesomeIcon icon={faCalendarAlt} /> Updated
      </span>
    ),
    prop: "updated_at",
    render: function(data) {
      return <Moment format="MM/DD/YYYY">{data.updated_at}</Moment>;
    }
  }
];

export default class RepositoryIssues extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns,
      data: []
    };

    this.getIssues();
  }

  getIssues() {
    GitHubAPI.getIssues(this.props.repo).then(data => {
      this.setState(prevState => ({
        ...prevState,
        data
      }));
    });
  }

  render() {
    return (
      <Card
        header="Open Issues"
        style={{
          marginBottom: "1rem"
        }}
        bodyStyle={{ padding: 0 }}
      >
        {!this.state.data.length && (
          <div style={{ padding: "18px 20px" }}>No Open Issues</div>
        )}
        {!!this.state.data.length && (
          <Table
            style={{ width: "100%" }}
            columns={this.state.columns}
            data={this.state.data}
          />
        )}
      </Card>
    );
  }
}
