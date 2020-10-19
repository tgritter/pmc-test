import "./App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header.js";
import Loading from "./components/Loading.js";
import Input from "./components/Input.js";
import Output from "./components/Output.js";

const timeout = 2000;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "75%",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const App = () => {
  const classes = useStyles();
  const [screen, setScreen] = React.useState("input");
  const [price, setPrice] = React.useState(null);
  const [municipality, setMunicipality] = React.useState("");
  const [purchasers, setPurchasers] = React.useState("");
  const [mortgage, setMortgage] = React.useState(false);
  const [strata, setStrata] = React.useState(false);

  const handleSetPrice = (value) => {
    setPrice(value);
  };

  const handleSetMunicipality = (event) => {
    setMunicipality(event.target.value);
  };

  const handleSetPurchasers = (event) => {
    setPurchasers(event.target.value);
  };

  const handleSetMortgage = (event) => {
    setMortgage(event.target.checked);
  };

  const handleSetStrata = (event) => {
    setStrata(event.target.checked);
  };

  const handleSubmit = () => {
    if (screen === "output") {
      setScreen("input");
      return;
    }
    setScreen("loading");
    setTimeout(() => {
      setScreen("output");
    }, timeout);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <CssBaseline />
      <div className="app">
        <Header />
        <div className="container">
          {screen === "input" && (
            <Input
              price={price}
              handleSetPrice={handleSetPrice}
              municipality={municipality}
              handleSetMunicipality={handleSetMunicipality}
              purchasers={purchasers}
              handleSetPurchasers={handleSetPurchasers}
              mortgage={mortgage}
              handleSetMortgage={handleSetMortgage}
              strata={strata}
              handleSetStrata={handleSetStrata}
              handleSubmit={handleSubmit}
            />
          )}
          {screen === "output" && (
            <Output
              price={price}
              municipality={municipality}
              purchasers={purchasers}
              mortgage={mortgage}
              strata={strata}
              handleSubmit={handleSubmit}
            />
          )}
          {screen === "loading" && <Loading />}
        </div>
      </div>
    </form>
  );
};

export default App;
