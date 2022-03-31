import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registrasi from "./page/register";
import Login from "./page/login";
import { Redirect } from "react-router-dom";
import Dashboard from "./page/dashboard";
import NotFound from "./page/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/login">
          <Login />
        </PublicRoute>
        <PublicRoute path="/register">
          <Registrasi />
        </PublicRoute>
        <PrivateRoute path="/">
          <Dashboard />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem("kunci");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ children, ...rest }) {
  let auth = localStorage.getItem("kunci");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
