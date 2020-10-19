import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  rangeFormat,
  currencyFormat,
  calcTitleInsurance,
  calcInsuranceBinder,
  serviceCharge,
  numServiceCharge,
  calcServiceCharge,
  numTitleSearchFee,
  titleSearchFee,
  calcTitleSearchFee,
  calcTaxCertificate,
  calcStrataFees,
  calcGST,
  calcPST,
  calcPPT,
  lawyerBaseFee,
  calcComplexityUnit,
  calcTotal,
} from "../helpers/Calculations.js";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
  },
}));

const Output = (props) => {
  const classes = useStyles();
  const { price, purchasers, municipality, mortgage, strata } = props;
  return (
    <div className="container">
      {/* Insurance */}
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Insurance
        </Typography>
        <Typography component="p" variant="inherit"></Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Title Insurance
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat(calcTitleInsurance())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Insurance Binder
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat(calcInsuranceBinder())}
        </Typography>
      </div>
      {/* Land Title Office Fees */}
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Land Title Office Fees
        </Typography>
        <Typography component="p" variant="inherit"></Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          {`Service Charge (${numServiceCharge} X $${serviceCharge})`}
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcServiceCharge())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          {`Title Search Fee (${numTitleSearchFee} X $${titleSearchFee})`}
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcTitleSearchFee())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Tax Certificate
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcTaxCertificate(municipality))}
        </Typography>
      </div>
      {/* Strata */}
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Strata
        </Typography>
        <Typography component="p" variant="inherit"></Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Strata Information Fee
        </Typography>
        <Typography component="p" variant="inherit">
          {strata ? rangeFormat(calcStrataFees(strata)) : currencyFormat(0)}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Taxes
        </Typography>
        <Typography component="p" variant="inherit"></Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          GST
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcGST(purchasers, mortgage, strata))}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          PST
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcPST())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Provincial Property Tax
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcPPT(price))}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Lawyer Fees
        </Typography>
        <Typography component="p" variant="inherit"></Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Base Fee
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(lawyerBaseFee)}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          {`Complexity Fee (${calcComplexityUnit(
            purchasers,
            mortgage,
            strata
          )} CU x $1)`}
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcComplexityUnit(purchasers, mortgage, strata))}
        </Typography>
      </div>
      <div className="output-total-container">
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
          {rangeFormat(
            calcTotal(price, purchasers, municipality, mortgage, strata)
          )}
        </Typography>
      </div>
      <div className="button-container">
        <Button
          onClick={props.handleSubmit}
          variant="contained"
          color="primary"
        >
          New Calculation
        </Button>
      </div>
      {/* <div className="Flex-Row-Output">
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
          {`${currencyFormat(calcAdministrativeFees("low"))} - ${currencyFormat(
            calcAdministrativeFees("high")
          )}`}
        </Typography>
      </div> */}
    </div>
  );
};

export default Output;
