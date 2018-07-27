import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import GithubLogo from "./GitHubLogo";

const RepositoryTable = props => (
  <div>
    <h2>{props.username}</h2>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Repository Name</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Language</TableCell>
            <TableCell numeric>Watchers</TableCell>
            <TableCell numeric>Forks</TableCell>
            <TableCell numeric>Issues</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData.map(row => {
            return (
              <TableRow
                key={row.id}
                hover
                onClick={e =>
                  props.selectRepository(row)
                }
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.updated_at}</TableCell>
                <TableCell>
                  {row.language ? row.language : "--"}
                </TableCell>
                <TableCell numeric>
                  {row.watchers}
                </TableCell>
                <TableCell numeric>
                  {row.forks}
                </TableCell>
                <TableCell numeric>
                  {row.open_issues}
                </TableCell>
                <TableCell component="th" scope="row">
                  <a
                    href={row.html_url}
                    title={row.name}
                    target="_blank"
                  >
                    <GithubLogo
                      height="1.6em"
                      width="1.6em"
                      style={{
                        verticalAlign: "middle",
                        fill: "green"
                      }}
                    />
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default RepositoryTable;
