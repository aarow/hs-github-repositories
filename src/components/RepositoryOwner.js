import React from "react";
import { Card } from "element-react";

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
  <Card header={`Owner (${props.owner.type})`}>
    <h2>
      <a href={props.owner.html_url} target="_blank">
        <img
          style={styles.avatar}
          src={props.owner.avatar_url}
          alt={`${props.owner.login}'s Avatar`}
        />
        {props.owner.login}
      </a>
    </h2>

    {props.owner.homepage && (
      <div>
        Site:{" "}
        <a href={props.owner.homepage}>
          {props.owner.homepage}
        </a>
      </div>
    )}
  </Card>
);
