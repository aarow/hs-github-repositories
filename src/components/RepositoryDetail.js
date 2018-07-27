import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import GithubLogo from "./GitHubLogo";
import Button from "@material-ui/core/Button";

/*
 - Time Stamps (created, updated etc.)
 - Owner information
 - List of issues
 - etc.
 */

export default props => (
  <div>
    <Button
      variant="outlined"
      size="small"
      onClick={props.removeSelectedRepository}
    >
      Back
    </Button>
    <h2>{props.repository.name}</h2>
    {console.log(props.repository)}
    <Paper>
      <div>{props.repository.name}</div>
    </Paper>
  </div>
);
