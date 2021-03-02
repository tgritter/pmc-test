import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
} from "../helpers/Calculations.js";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
  },
}));

const Output = (props) => {
  const classes = useStyles();
  const { price, purchasers, municipality, mortgage, strata, firstTimeBuyer } = props;
  return (
    <div className="container">
      {/* Insurance */}
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Purchase Price
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(price)}
        </Typography>
      </div>
      {calcPTT(price, firstTimeBuyer) > 0 && 
        <div className="output-header-container">
          <Typography
            className={classes.boldText}
            component="p"
            variant="inherit"
          >
            Property Transfer Tax
          </Typography>
          <Typography component="p" variant="inherit">
            {currencyFormat(calcPTT(price, firstTimeBuyer))}
          </Typography>
        </div>
      }
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Legal Fees
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcLegalFees(purchasers, mortgage, strata))}
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
      {strata &&
        <div className="output-body-container">
          <Typography component="p" variant="inherit">
            Strata Forms Fee
          </Typography>
          <Typography component="p" variant="inherit">
            {rangeFormat(calcStrataFormsFee(strata))}
          </Typography>
        </div>
      }
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Speciality Software Fee
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcSpecialitySoftwareFee())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Postage/Courier
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat(calcPostage())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Wire Transfer/Bank Draft
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat(calcWireTransfer())}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Government Fees
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Land Title Form A Transfer Registration
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcLandTitleFormA())}
        </Typography>
      </div>
      { calcLandTitleFormB(mortgage) > 0 &&
        <div className="output-body-container">
          <Typography component="p" variant="inherit">
            Land Title Form B Mortgage Registration
          </Typography>
          <Typography component="p" variant="inherit">
            {currencyFormat(calcLandTitleFormB(mortgage))}
          </Typography>
        </div>
      }
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Land Title Search Fees
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcLandTitleSearchFees())}
        </Typography>
      </div>
      {calcTaxCertificate(municipality) > 0 &&
        <div className="output-body-container">
          <Typography component="p" variant="inherit">
            Tax Certificate
          </Typography>
          <Typography component="p" variant="inherit">
            {currencyFormat(calcTaxCertificate(municipality))}
          </Typography>
        </div>
      }
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          Trust Administration Fee
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcTrustAdministrationFee())}
        </Typography>
      </div>
      <div className="output-body-container">
        <Typography component="p" variant="inherit">
          State of Title Certificate
        </Typography>
        <Typography component="p" variant="inherit">
          {currencyFormat(calcStateOfTitleCertificate())}
        </Typography>
      </div>
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Total Closing Costs
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat(
            calcTotalClosingCosts(purchasers, municipality, mortgage, strata)
          )}
        </Typography>
      </div>
      {calcPTT(price, firstTimeBuyer) > 0 && 
        <div className="output-header-container">
          <Typography
            className={classes.boldText}
            component="p"
            variant="inherit"
          >
            Property Transfer Tax
          </Typography>
          <Typography component="p" variant="inherit">
            {currencyFormat(calcPTT(price, firstTimeBuyer))}
          </Typography>
        </div>
      }
      <div className="output-header-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Total Price of Conveyance
        </Typography>
        <Typography component="p" variant="inherit">
          {rangeFormat(
            calcPriceOfConveyance(
              price,
              purchasers,
              municipality,
              mortgage,
              strata,
              firstTimeBuyer,
            )
          )}
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

export default Output;
