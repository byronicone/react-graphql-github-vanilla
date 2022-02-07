import { React, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Organization from "./Organization";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const TITLE = "React GraphQL GitHub Client";

const GET_ISSUES_OF_REPOSITORY = `
query ($organization: String!, $repository: String!) {
  organization(login: $organization) {
    name
    url
    repository(name: $repository) {
      name
      url
      issues(last: 5){
        edges{
          node{
            id
            title
            url
          }
        }
      }
    }
  }
}`;

function App() {
  const defaultPath = "the-road-to-learn-react/the-road-to-learn-react";
  const [path, setPath] = useState(defaultPath);
  const [organization, setOrganization] = useState();
  const [errors, setErrors] = useState();

  useEffect(() => {
    onFetchFromGithub();
  }, []);

  const getIssuesOfRepository = () => {
    const [organization, repository] = path.split("/");
    return axiosGitHubGraphQL.post("/graphql", {
      query: GET_ISSUES_OF_REPOSITORY,
      variables: { organization, repository },
    });
  };

  const onFetchFromGithub = async () => {
    let result = await getIssuesOfRepository();
    setOrganization(result.data.data.organization);
    setErrors(result.data.errors);
  };

  const onChange = (e) => {
    setPath(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onFetchFromGithub();
  };

  return (
    <div>
      <h1>{TITLE}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="url">Show open issues for https://github.com/</label>
        <input
          value={path}
          id="url"
          type="text"
          onChange={onChange}
          style={{ width: "300px" }}
        />
        <button type="submit">Search</button>
      </form>

      <hr />

      {organization ? (
        <Organization organization={organization} errors={errors} />
      ) : (
        <p>No information yet...</p>
      )}
    </div>
  );
}

export default App;
