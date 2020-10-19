import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
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
}));

const Input = (props) => {
  const classes = useStyles();
  return (
    <div className="container">
      <div className="input-container">
        <CurrencyTextField
          className={classes.textField}
          label="Price"
          value={props.price}
          onChange={(event, price) => props.handleSetPrice(price)}
          variant="outlined"
          currencySymbol="$"
          minimumValue="0"
          outputFormat="number"
          decimalCharacter="."
          digitGroupSeparator=","
        />
      </div>
      <div className="input-container">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Municipality
          </InputLabel>
          <Select
            native
            label="Municipality"
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
            # of Purchasers
          </InputLabel>
          <Select
            native
            label="# of Purchasers"
            value={props.purchasers}
            onChange={(event) => props.handleSetPurchasers(event)}
          >
            <option aria-label="none" value="" />
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
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
          label="Are you in a strata?"
        />
      </div>
      <div className="button-container">
        <Button
          onClick={props.handleSubmit}
          variant="contained"
          color="primary"
        >
          Calculate
        </Button>
      </div>
    </div>
  );
};

export default Input;
