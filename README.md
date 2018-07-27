# Problem Description

HelloSign has a collection of public GitHub repositories, which can be seen here via GitHub’s API: https://api.github.com/orgs/HelloFax/repos

Fetch the data from the URL above, and write a single page application that 
shows the GitHub repos in a tabular format, showing the following columns:
 - Name (include description in line below name in lighter print)
 - Last Updated
 - Primary language
 - Number of Watchers
 - Number of Forks
 - Number of Issues
 - Link to GitHub repo page (to be opened in new tab)

From this table, there should be a way to show more details of the repos. 
There is no hard requirement as to what pieces of information is shown 
in the details page, feel free to show what makes sense. Below are a 
few suggestions:
 - Time Stamps (created, updated etc.)
 - Owner information
 - List of issues
 - etc.

Feel free to use helpers to get your app started
 - React:  https://github.com/facebook/create-react-app
 - Angular: https://angular.io/guide/quickstart