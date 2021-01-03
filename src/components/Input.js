import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { municipalities } from "../helpers/Municipalities.js";

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
  formControl: {
    width: "100%",
  },
  textField: {
    width: "100%",
  },
  centerText: {
    textAlign: "center"
  },
  boldUnderlineText: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    textAlign: "center",
    fontSize: "12px"
  }
}));

const Input = (props) => {
  const classes = useStyles();
  return (
    <div className="container">
      <div className="input-container">
        <CurrencyTextField
          className={classes.textField}
          label="Your home's purchase price"
          value={props.price}
          onChange={(event, price) => props.handleSetPrice(price)}
          variant="outlined"
          currencySymbol="$"
          minimumValue="0"
          outputFormat="number"
          decimalCharacter="."
          digitGroupSeparator=","
          error={props.priceErrorText !== ""}
          helperText={props.priceErrorText}
        />
      </div>
      <div className="input-container">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Location
          </InputLabel>
          <Select
            native
            label="Location"
            value={props.municipality}
            onChange={(event) => props.handleSetMunicipality(event)}
          >
            <option aria-label="none" value={""} />
            {municipalities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <div className="spacing" />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            How many purchasers?
          </InputLabel>
          <Select
            native
            label="How many purchasers?"
            value={props.purchasers}
            onChange={(event) => props.handleSetPurchasers(event)}
          >
            <option aria-label="none" value="" />
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3+"}>3+</option>
          </Select>
        </FormControl>
      </div>
      <div className="checkbox-container">
        <FormControlLabel
          control={
            <Checkbox
              checked={props.mortgage}
              onChange={props.handleSetMortgage}
              name="mortgage"
              color="primary"
            />
          }
          label="Are you getting a mortgage?"
        />
      </div>
      <div className="checkbox-container">
        <FormControlLabel
          control={
            <Checkbox
              checked={props.strata}
              onChange={props.handleSetStrata}
              name="strata"
              color="primary"
            />
          }
          label="Are you buying into a strata?"
        />
      </div>
      <div className="flex-container">
        <Button
          onClick={props.handleCalculate}
          variant="contained"
          color="secondary"
        >
          Price my conveyance
        </Button>
      </div>
      <div className="flex-container">
        <Typography className={classes.centerText} component="p" variant="inherit">
          Price My Conveyance is powered by Arora Zbar LLP. We built Price My Conveyance to help you better understand the cost of your home, especially the legal fees and disbursements involved. 
        </Typography>
        <br/>
        <Typography component="p" variant="inherit">
          There are potential additional costs which are not included in this calculation:<br/>
        </Typography>
        <ul>
          <li>GST on New/Substantially renovated homes</li>
          <li>Foreign purchaser Property Transfer Tax </li>
          <li>Adjustments for property tax, strata fees, move in fees, utilities</li>
          <li>Appraisals and inspections</li>
          <li>Lender fees  </li>
        </ul>
        <Typography className={classes.boldUnderlineText} component="p" variant="inherit">
        Price My Conveyance is for informational purposes only. This is not legal advice, a guarantee, or a quote. You must seek legal advice regarding the costs of your particular conveyance. 
        </Typography>
      </div>
    </div>
  );
};

export default Input;
