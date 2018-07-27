import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import RepositoryTable from "../components/RepositoryTable";
import RepositoryDetail from "../components/RepositoryDetail";

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={RepositoryTable} />
      <Route path="/:repoId" component={RepositoryDetail} />
    </div>
  </Router>
);

export default Routes;
