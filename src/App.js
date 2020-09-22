import "./App.css";
import React from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { municipalities } from "./municipalities.js";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "75%",
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    width: "100%",
  },
  formControl: {
    width: "100%",
  },
  boldText: {
    fontWeight: "bold",
  },
}));

export default function App() {
  const classes = useStyles();
  const [price, setPrice] = React.useState(null);
  const [municipality, setMunicipality] = React.useState("");
  const [mortgage, setMortgage] = React.useState("");
  const [titleInsurance, setTitleInsurance] = React.useState("");
  const [strata, setStrata] = React.useState("");
  const [construction, setConstruction] = React.useState("");
  const [numChargers, setNumChargers] = React.useState("");

  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const handleMunicipalityChange = (event) => {
    setMunicipality(event.target.value);
  };

  const handleMortageChange = (event) => {
    setMortgage(event.target.value);
  };

  const handleTitleInsuranceChange = (event) => {
    setTitleInsurance(event.target.value);
  };

  const handleStrataChange = (event) => {
    setStrata(event.target.value);
  };

  const handleConstruction = (event) => {
    setConstruction(event.target.value);
  };

  const handleNumCharges = (event) => {
    setNumChargers(event.target.value);
  };

  const calcServiceCharge = () => {
    const charge = 1.65;
    return 6 * charge;
  };

  const calcSearchFee = () => {
    const fee = 9.88;
    return 3 * fee;
  };

  const getTaxCertificates = () => {
    const found = municipalities.find((city) => city.name === municipality);
    return typeof found === "undefined" ? 0 : found.fees;
  };

  const calcGST = () => {
    const gst = 0.05;
    let lawyerFee = 800 + calcComplexityUnit() + calcPPT();
    let specialtyFees = 75;
    let renovatationFee = construction === "yes" ? price : 0;
    return (
      (calcServiceCharge() + lawyerFee + specialtyFees + renovatationFee) * gst
    );
  };

  const calcPST = () => {
    return 0;
  };

  const calcPPT = () => {
    if (!price) {
      return 0;
    } else if (price < 200000) {
      return price * 0.01;
    } else if (price < 2000000) {
      return 2000 + (price - 200000) * 0.02;
    } else if (price < 3000000) {
      return 38000 + (price - 2000000) * 0.03;
    } else {
      return 68000 + (price - 3000000) * 0.05;
    }
  };

  const calcComplexityUnit = () => {
    let value = 0;
    if (strata === "yes") {
      value += 100;
    }
    if (mortgage === "yes") {
      value += 100;
    }
    if (mortgage === "yes1") {
      value += 200;
    }
    value += parseInt(numChargers) * 100;

    return value;
  };

  const calcTitleInsurance = (type) => {
    if (titleInsurance === "no" || titleInsurance === "") {
      return 0;
    }
    return type === "low" ? 100 : 200;
  };

  const calcAdministrativeFees = (type) => {
    if (type === "low") {
      return 30 + 50 + 20 + 75;
    } else {
      return 50 + 75 + 20 + 75;
    }
  };

  const calcInsuranceBinder = (type) => {
    if (type === "low") {
      return 30;
    } else {
      return 50;
    }
  };

  const calcStrataFee = (type) => {
    if (strata !== "yes") {
      return 0;
    }
    if (type === "low") {
      return 50;
    }
    return 100;
  };

  const calcTotal = (type) => {
    return (
      calcServiceCharge() +
      calcSearchFee() +
      getTaxCertificates() +
      calcGST() +
      calcPST() +
      calcPPT() +
      calcTitleInsurance(type) +
      800 +
      calcComplexityUnit() +
      calcAdministrativeFees(type) +
      calcInsuranceBinder(type) +
      calcStrataFee(type)
    );
  };

  return (
    <div>
      <div className={classes.container}>
        <form className={classes.root} noValidate autoComplete="off">
          <CssBaseline />
          <div className="Container">
            <div className="Header">
              <Avatar className={classes.avatar}>
                <AccountBalanceIcon />
              </Avatar>
              <div className="Title-Padding">
                <Typography component="h1" variant="h5">
                  Price My Conveyance
                </Typography>
              </div>
            </div>
            <div className="body-container">
              <div className="body-flex-container">
                <div className="Flex-Row">
                  <CurrencyTextField
                    className={classes.textField}
                    label="Price"
                    variant="outlined"
                    value={price}
                    currencySymbol="$"
                    minimumValue="0"
                    outputFormat="number"
                    decimalCharacter="."
                    digitGroupSeparator=","
                    onChange={(event, price) => setPrice(price)}
                  />
                </div>
                <div className="Flex-Row">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Municipality
                    </InputLabel>
                    <Select
                      native
                      value={municipality}
                      onChange={handleMunicipalityChange}
                      label="Municipality"
                    >
                      <option aria-label="none" value={""} />
                      {municipalities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="Flex-Row">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Num of Charges
                    </InputLabel>
                    <Select
                      native
                      value={numChargers}
                      onChange={handleNumCharges}
                      label="Num of Charges"
                    >
                      <option aria-label="none" value={""} />
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                      <option value={"5"}>5</option>
                      <option value={"6"}>6</option>
                      <option value={"7"}>7</option>
                      <option value={"8"}>8</option>
                      <option value={"9"}>9</option>
                      <option value={"10"}>10</option>
                    </Select>
                  </FormControl>
                </div>
                <div className="Flex-Row">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Mortgage?
                    </InputLabel>
                    <Select
                      native
                      value={mortgage}
                      onChange={handleMortageChange}
                      label="Mortgage?"
                    >
                      <option aria-label="none" value="" />
                      <option value={"no"}>No</option>
                      <option value={"yes"}>Yes (one mortgage)</option>
                      <option value={"yes1"}>
                        Yes (more than one mortgage)
                      </option>
                    </Select>
                  </FormControl>
                  <div className="Spacing" />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Title Insurance?
                    </InputLabel>
                    <Select
                      native
                      value={titleInsurance}
                      onChange={handleTitleInsuranceChange}
                      label="Title Insurance?"
                    >
                      <option aria-label="none" value="" />
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                  </FormControl>
                </div>
                <div className="Flex-Row">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Strata?
                    </InputLabel>
                    <Select
                      native
                      value={strata}
                      onChange={handleStrataChange}
                      label="Strata?"
                    >
                      <option aria-label="none" value="" />
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                  </FormControl>
                  <div className="Spacing" />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Construction?
                    </InputLabel>
                    <Select
                      native
                      value={construction}
                      onChange={handleConstruction}
                      label="Construction?"
                    >
                      <option aria-label="none" value="" />
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="body-flex-container">
                <div className="Flex-Row-Output" />
                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Land Title Office Fees
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Service Charge (6 X $1.65)
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcServiceCharge())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Title Search Fee (3 X $9.88)
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcSearchFee())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Tax Certificates
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(getTaxCertificates())}
                  </Typography>
                </div>
                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Taxes
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    GST
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcGST())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    PST
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcPST())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Provincial Property Tax
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcPPT())}
                  </Typography>
                </div>
                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Insurance
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Title Insurance
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {titleInsurance === "no" || titleInsurance === ""
                      ? currencyFormat(0)
                      : `${currencyFormat(
                          calcTitleInsurance("low")
                        )} - ${currencyFormat(calcTitleInsurance("high"))} `}
                  </Typography>
                </div>

                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Insurance Binder
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Insurance Binder
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {`${currencyFormat(30)} - ${currencyFormat(50)}`}
                  </Typography>
                </div>

                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Strata
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Strata Information Fee
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {strata === "yes"
                      ? `${currencyFormat(50)} - ${currencyFormat(100)}`
                      : currencyFormat(0)}
                  </Typography>
                </div>

                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Administrative Fees
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Printing/Postage
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {`${currencyFormat(30)} - ${currencyFormat(50)}`}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Courier
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {`${currencyFormat(50)} - ${currencyFormat(75)}`}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Wire Transfer
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {"$20"}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Specialty Software Fees
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {"$75"}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Total
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {`${currencyFormat(
                      calcAdministrativeFees("low")
                    )} - ${currencyFormat(calcAdministrativeFees("high"))}`}
                  </Typography>
                </div>

                <div className="Flex-Row-Output">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Lawyer Fees
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Base Fee
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {"$800.00"}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    {`Complexity Fee (${calcComplexityUnit()} CU x $1)`}
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcComplexityUnit())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Total
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(800 + calcComplexityUnit())}
                  </Typography>
                </div>
                <div className="Flex-Row-Total">
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    Total
                  </Typography>
                  <Typography
                    className={classes.boldText}
                    component="p"
                    variant="inherit"
                  >
                    {calcTotal("low") === calcTotal("high")
                      ? currencyFormat(calcTotal("low"))
                      : `${currencyFormat(calcTotal("low"))} - ${currencyFormat(
                          calcTotal("high")
                        )}`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
