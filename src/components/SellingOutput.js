import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HelpIcon from '@mui/icons-material/Help';
import Button from "@material-ui/core/Button";
import ReactTooltip from 'react-tooltip';
import {
  currencyFormat,
  rangeFormat
} from "../helpers/Calculations.js";

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
  },
}));

const SellingOutput = (props) => {
  const classes = useStyles();
  const { price } = props;
  return (
    <div className="container">
      <ReactTooltip />
      {/* Insurance */}
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
        <div className="info" data-tip="Total price of property."><div>Selling Price</div><HelpIcon fontSize='small'/></div>
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(price)}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Legal Fees
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(800)}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Disbursements
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Mortgage Instruction Fee
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(31.50)}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          ID Verification Fee
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(11.73)}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Total Price of Conveyance
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat([1000,2000])}
        </Typography>
      </div>
      <div className="flex-container">
        <Button
          onClick={props.handleCalculateAgain}
          variant="contained"
          color="secondary"
        >
          Price another conveyance
        </Button>
      </div>
    </div>
  );
};

export default SellingOutput;