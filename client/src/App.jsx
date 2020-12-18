import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import JobDetailPage from "./routes/JobDetailPage";
import { JobsContextProvider } from "./context/JobsContext";
const App = () => {
  return (
    <JobsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/jobs/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/jobs/:id"
              component={JobDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </JobsContextProvider>
  );
};

export default App;
