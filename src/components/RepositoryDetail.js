import React from "react";
import { Button, Layout } from "element-react";
import RepositoryInfo from "./RepositoryInfo";
import RepositoryOwner from "./RepositoryOwner";
import RepositoryIssues from "./RepositoryIssues";
// import {connect} from 'react-redux';

/*
 - Time Stamps (created, updated etc.)
 - Owner information
 - List of issues
 - etc.
 */

export class RepositoryDetail extends React.Component {
  // componentDidMount() {
  //   this.props.receiveRepos();
  // }

  render(){
    return (
      <div>
        <Button
          style={{ marginBottom: "1rem" }}
          size="mini"
          onClick={this.props.removeSelectedRepository}
        >
          Back
        </Button>

        <Layout.Row gutter="20">
          <Layout.Col sm={24}>
            <RepositoryInfo repository={this.props.repository} />
          </Layout.Col>
          <Layout.Col sm={8}>
            <RepositoryOwner owner={this.props.repository.owner} />
          </Layout.Col>
          <Layout.Col sm={16}>
            <RepositoryIssues repo={this.props.repository.full_name} />
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}

export default RepositoryDetail;

// const mapDispatchToProps = dispatch => {
//   return {
//     receiveRepos: () => {
//       dispatch(receiveRepos())
//     }
//   }
// }

// export default connect(null,mapDispatchToProps)(RepositoryDetail);