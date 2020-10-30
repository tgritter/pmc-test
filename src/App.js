import "./App.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header.js";
import Loading from "./components/Loading.js";
import Input from "./components/Input.js";
import Output from "./components/Output.js";
import Confirm from "./components/Confirm.js";
import Contact from "./components/Contact.js";

const timeout = 2000;
const templateID = "template_nljfzyj"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "8px auto",
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
  const [priceErrorText, setPriceErrorText] = React.useState("");
  const [municipality, setMunicipality] = React.useState("");
  const [purchasers, setPurchasers] = React.useState("1");
  const [mortgage, setMortgage] = React.useState(false);
  const [strata, setStrata] = React.useState(false);

  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");


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

  const handleSetName = (event) => {
    setName(event.target.value);
  };

  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleCalculate = () => {
    if (!price) {
      setPriceErrorText("Please enter a purchase price");
      return
    }
    setPriceErrorText("");
    submitCalculateDataToGA();
    setScreen("loading");
    setTimeout(() => {
      if (!price) {
        setPrice(0);
      }
      setScreen("output");
    }, timeout);
  }

  const handleCalculateAgain = () => {
    setScreen("input");
  };

  const handleSendEmail = () => {
    if (!validEmail(email)){
      setEmailError("Please enter a valid email")
      return
    }
    setEmailError("")
    sendEmail()
  };

  const validEmail = (email) => {
    if (!email) {
      return false
    }
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  //Custom EmailJS method
const sendEmail = () => {
  const variables = {
    name: name ? name : "", 
    email: "good@emailfake.com"
  }
  setEmailLoading(true)
  window.emailjs.send(
    'gmail', templateID,
    variables
    ).then(res => {
      // Email successfully sent alert
      submitEmailDataToGA()
      setEmailLoading(false)
      setScreen("confirm");
    }, error => {
      console.log('Failed...', error)
      setEmailLoading(false)
      setEmailError("Failed to send email")
    })
}

const clearEmailError = () => {
  setEmailError("")
}

  const submitCalculateDataToGA = () => {
    window.gtag('event', 'PurchasePrice', {value: price});
    window.gtag('event', 'Municipality', {value: municipality});
    window.gtag('event', 'NumOfPurchasers', {value: purchasers});
    window.gtag('event', 'Mortgage', {value: mortgage});
    window.gtag('event', 'Strata', {value: strata});
  }

  const submitEmailDataToGA = () => {
    window.gtag('event', 'Name', {value: name});
    window.gtag('event', 'Email', {value: email});
  }

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
              priceErrorText={priceErrorText}
              municipality={municipality}
              handleSetMunicipality={handleSetMunicipality}
              purchasers={purchasers}
              handleSetPurchasers={handleSetPurchasers}
              mortgage={mortgage}
              handleSetMortgage={handleSetMortgage}
              strata={strata}
              handleSetStrata={handleSetStrata}
              handleCalculate={handleCalculate}
            />
          )}
          {screen === "output" && (
            <div>
            <Output
              price={price}
              municipality={municipality}
              purchasers={purchasers}
              mortgage={mortgage}
              strata={strata}
              handleCalculateAgain={handleCalculateAgain}
            />
            <Contact 
              name={name}
              handleSetName={handleSetName}
              email={email}
              handleSetEmail={handleSetEmail}
              emailError={emailError}
              handleSendEmail={handleSendEmail}
              emailLoading={emailLoading}
              clearEmailError={clearEmailError}
            />
            </div>
          )}
          {screen === "loading" && <Loading />}
          {screen === "confirm" && 
            <Confirm 
              handleCalculateAgain={handleCalculateAgain}
            />
          }
        </div>
      </div>
    </form>
  );
};

export default App;
