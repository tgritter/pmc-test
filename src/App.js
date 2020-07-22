import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import "./App.css";
import { findByLabelText } from "@testing-library/react";

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
  const [toggle, setToggle] = React.useState(true);
  const [price, setPrice] = React.useState(null);
  const [province, setProvince] = React.useState(null);
  const [mortgages, setMortgages] = React.useState(null);
  const [strata, setStrata] = React.useState(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleMortageChange = (event) => {
    setMortgages(event.target.value);
  };

  const handleStrataChange = (event) => {
    setStrata(event.target.value);
  };

  const currencyFormat = (num) => {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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

  const calcMortageFee = () => {
    if (!mortgages) {
      return 0;
    }
    return mortgages * 75;
  };

  const calcComplexityFee = () => {
    if (!mortgages) {
      return 0;
    }
    return mortgages * 50;
  };

  const calcGST = () => {
    const gst = 0.05;
    var lawyerFee = 800 + calcComplexityFee() + calcMortageFee() + calcPPT();
    return 1.65 * gst + lawyerFee * gst;
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
                      Province
                    </InputLabel>
                    <Select
                      native
                      value={province}
                      onChange={handleProvinceChange}
                      label="Province"
                    >
                      <option aria-label="none" value="" />
                      <option value={"ab"}>Alberta</option>
                      <option value={"bc"}>British Columbia</option>
                    </Select>
                  </FormControl>
                </div>
                <div className="Flex-Row">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Mortgages
                    </InputLabel>
                    <Select
                      native
                      value={mortgages}
                      onChange={handleMortageChange}
                      label="Mortgages"
                    >
                      <option aria-label="none" value="" />
                      <option value={"0"}>0</option>
                      <option value={"1"}>1</option>
                      <option value={"2"}>2</option>
                      <option value={"3"}>3</option>
                      <option value={"4"}>4</option>
                      <option value={"5"}>5</option>
                    </Select>
                  </FormControl>
                  <div className="Spacing" />
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
                    MyLTSA
                  </Typography>
                  <Typography component="p" variant="inherit"></Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Search Fee
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(9.88)}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Service Charge
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(1.65)}
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
                    Provincial Property Tax
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcPPT())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    {`Mortgage Fee (${mortgages ? mortgages : 0} x $75)`}
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcMortageFee())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    GST
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcGST())}
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
                    {`Complexity Fee (${mortgages ? mortgages : 0} x $50)`}
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(calcComplexityFee())}
                  </Typography>
                </div>
                <div className="Flex-Row-Narrow">
                  <Typography component="p" variant="inherit">
                    Total
                  </Typography>
                  <Typography component="p" variant="inherit">
                    {currencyFormat(800 + calcComplexityFee())}
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
                    {currencyFormat(
                      800 +
                        calcComplexityFee() +
                        calcMortageFee() +
                        calcPPT() +
                        calcGST()
                    )}
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
