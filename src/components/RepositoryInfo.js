import React from "react";
import { Card, Layout, Tag } from "element-react";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import GithubLogo from "./GitHubLogo";
const styles = {
  avatar: {
    width: "100%",
    maxWidth: 44,
    verticalAlign: "middle",
    display: "inline-block",
    margin: "0 1rem 0 0"
  }
};

export default props => (
  <Card
    header={
      <Layout.Row type="flex" justify="space-between" align="middle" tag="div">
        <h2>
          <a href={props.repository.html_url}>
            <GithubLogo
              width="2rem"
              height="2rem"
              style={{ marginRight: "1rem", verticalAlign: "middle" }}
            />
            {props.repository.name}
          </a>
        </h2>
        <div>
          <Tag style={{ marginRight: "1rem" }}>
            <FontAwesomeIcon icon={faEye} />
            <span> Watch </span>
            <strong>{props.repository.watchers_count}</strong>
          </Tag>

          <Tag style={{ marginRight: "1rem" }}>
            <FontAwesomeIcon icon={faStar} />

            <span> Stars </span>
            <strong>{props.repository.stargazers_count}</strong>
          </Tag>

          <Tag>
            <FontAwesomeIcon icon={faCodeBranch} />

            <span> Forks </span>
            <strong>{props.repository.forks_count}</strong>
          </Tag>
        </div>
      </Layout.Row>
    }
    style={{
      marginBottom: "1rem"
    }}
  >
    <p>
      Created:{" "}
      <strong>
        <Moment format="MM/DD/YYYY">{props.repository.created_at}</Moment>
      </strong>
    </p>
    <p>
      Updated:
      <strong>
        <Moment format="MM/DD/YYYY">{props.repository.updated_at}</Moment>
      </strong>
    </p>
    <p>
      Language:<strong>
        {props.repository.language
          ? props.repository.language
          : "(not specified)"}
      </strong>
    </p>
    {props.repository.homepage && (
      <p>
        <a href={props.repository.homepage}>Home Page</a>
      </p>
    )}
    <p>
      Git URL: <strong>{props.repository.git_url}</strong>
    </p>
  </Card>
);
