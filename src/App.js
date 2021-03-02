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
import firebase from "./helpers/Firestore"
import {
  rangeFormat,
  currencyFormat,
  calcPTT,
  calcLegalFees,
  calcTitleInsurance,
  calcInsuranceBinder,
  calcStrataFormsFee,
  calcSpecialitySoftwareFee,
  calcPostage,
  calcWireTransfer,
  calcLandTitleFormA,
  calcLandTitleFormB,
  calcLandTitleSearchFees,
  calcTaxCertificate,
  calcTrustAdministrationFee,
  calcStateOfTitleCertificate,
  calcTotalClosingCosts,
  calcPriceOfConveyance,
} from "./helpers/Calculations.js";

const db = firebase.firestore();
const timeout = 2000;
const templateID = "template_nljfzyj"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "8px auto",
      width: "80%",
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
  const [firstTimeBuyer, setFirstTimeBuyer] = React.useState(false);

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

  const handleSetFirstTimeBuyer = (event) => {
    setFirstTimeBuyer(event.target.checked);
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
    uploadCalcToFirebase();
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

  const clearEmailError = () => {
    setEmailError("")
  }

  //Custom EmailJS method
  const sendEmail = () => {
    const variables = {
      name: name ? name : "", 
      email: email,
      purchase_price: currencyFormat(price),
      ppt: currencyFormat(calcPTT(price)),
      legal_fees: currencyFormat(calcLegalFees(purchasers, mortgage, strata)),
      title_insurance: rangeFormat(calcTitleInsurance()),
      insurance_binder: rangeFormat(calcInsuranceBinder()),
      strata_forms_fee: strata ? rangeFormat(calcStrataFormsFee(strata)) : currencyFormat(0),
      speciality_software_fee: currencyFormat(calcSpecialitySoftwareFee()),
      postage_courier: rangeFormat(calcPostage()),
      wire_transfer: rangeFormat(calcWireTransfer()),
      land_title_a: currencyFormat(calcLandTitleFormA()),
      land_title_b: currencyFormat(calcLandTitleFormB(mortgage)),
      land_title_search_fees: currencyFormat(calcLandTitleSearchFees()),
      tax_certificate: currencyFormat(calcTaxCertificate(municipality)),
      trust_admin_fee: currencyFormat(calcTrustAdministrationFee()),
      state_title_cert: currencyFormat(calcStateOfTitleCertificate()),
      total_closing_costs: rangeFormat(calcTotalClosingCosts(purchasers, municipality, mortgage, strata)),
      total_price: rangeFormat(calcPriceOfConveyance(price,purchasers,municipality,mortgage,strata,firstTimeBuyer))
    }
    setEmailLoading(true)
    uploadConfirmToFirebase()
    window.emailjs.send(
      'gmail', templateID,
      variables
      ).then(res => {
        // Email successfully sent alert
        setEmailLoading(false)
        setScreen("confirm");
      }, error => {
        console.log('Failed...', error)
        setEmailLoading(false)
        setEmailError("Failed to send email")
      }
    )
  }

const uploadCalcToFirebase = () => {
  db.collection("calculate").add({
      price: price,
      municipality: municipality,
      purchasers: purchasers,
      strata: strata,
      mortgage: mortgage
  })
}

const uploadConfirmToFirebase = () => {
  db.collection("confirm").add({
      name: name,
      email: email,
  })
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
              firstTimeBuyer={firstTimeBuyer}
              handleSetFirstTimeBuyer={handleSetFirstTimeBuyer}
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
              firstTimeBuyer={firstTimeBuyer}
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
