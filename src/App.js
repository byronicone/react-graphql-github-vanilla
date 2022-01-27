import { React, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const TITLE = "React GraphQL GitHub Client";

function App() {
  const defaultPath = "the-road-to-learn-react/the-road-to-learn-react";
  const [path, setPath] = useState(defaultPath);

  useEffect(() => {
    //fetch data
  }, []);

  const onChange = (e) => {
    setPath(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //fetch data
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

      {/*Here comes the result! */}
    </div>
  );
}

export default App;
