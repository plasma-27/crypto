import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import FavoritesPage from './Pages/FavoritesPage';
import ProtectedRoute from "./components/ProtectedRoute"; // Correctly import the ProtectedRoute

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/coins/:id">
            <CoinPage />
          </Route>
          <Route path="/favorites">
            <FavoritesPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
