import React from "react";
import { Button, Layout } from "element-react";
import RepositoryInfo from "./RepositoryInfo";
import RepositoryOwner from "./RepositoryOwner";
import RepositoryIssues from "./RepositoryIssues";

/*
 - Time Stamps (created, updated etc.)
 - Owner information
 - List of issues
 - etc.
 */

export default props => (
  <div>
    
    <Button
      style={{ marginBottom: "1rem" }}
      size="mini"
      onClick={props.removeSelectedRepository}
    >
      Back
    </Button>

    <Layout.Row gutter="20">
      <Layout.Col sm={24}>
        <RepositoryInfo repository={props.repository} />
      </Layout.Col>
      <Layout.Col sm={8}>
        <RepositoryOwner owner={props.repository.owner} />
      </Layout.Col>
      <Layout.Col sm={16}>
        <RepositoryIssues repo={props.repository.full_name} />
      </Layout.Col>
    </Layout.Row>
  </div>
);
