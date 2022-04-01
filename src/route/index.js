import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Registrasi from "../page/register";
import Login from "../page/login";
import Dashboard from "../page/dashboard";
import NotFound from "../page/notFound";

const NewRoute = () => {
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
};

const PrivateRoute = ({ children, ...rest }) => {
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
};

const PublicRoute = ({ children, ...rest }) => {
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
};

export default NewRoute;
