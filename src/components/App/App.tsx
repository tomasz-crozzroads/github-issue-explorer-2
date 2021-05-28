import { Link, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import BookmarkOverview from "../BookmarkOverview";
import IssueOverview from "../IssueOverview";

const App = () => {
  return (
    <div className="app">
      <h1>GitHub Issue Explorer</h1>
      <nav>
        <ul>
          <li>
            <Link to="/issues">Issues</Link>
          </li>
          <li>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/issues" component={IssueOverview} />
        <Route exact path="/bookmarks" component={BookmarkOverview} />
        <Redirect to="/issues" />
      </Switch>
    </div>
  );
};

export default App;
