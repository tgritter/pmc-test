import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Headshot from "../assets/zbar_headshot.jpg"
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
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

const Contact = () => {
  const classes = useStyles();
  return (
    <div>
      <div className="line" />
      <div className="flex-container">
        <Typography
          className={classes.headerText}
          component="p"
          variant="inherit"
        >
          You have a price. Now you need a lawyer.
        </Typography>
      </div>
      <div className="flex-container">
      <img src={Headshot} alt="headshot" width={200} height={300}/>
      </div>
      <div className="flex-container">
        <Typography className={classes.centerText} component="p" variant="inherit">
          Price My Conveyance is powered by the Zbar Law Corporation. We built Price My Conveyance to help you better understand the cost of your home, especially the legal fees and disbursements involved. 
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
      <div className="flex-container">
        <TextField
          id="outlined-search"
          label="Name"
          type="search"
          variant="outlined"
        />
      </div>
      <div className="flex-container">
        <TextField
          id="outlined-search"
          label="Email"
          type="search"
          variant="outlined"
        />
      </div>
      <div className="flex-container">
        <Button
          onClick={() => console.log("HandlePressButton")}
          variant="contained"
          color="primary"
        >
          Receive your price via email
        </Button>
      </div>
      <div className="flex-container">
        <Typography className={classes.centerText} component="p" variant="inherit">
          Zbar Law Corporation<br/>
          Suite 400 - 601 West Broadway<br/>
          Vancouver, BC V5Z 4C2<br/>
          Office: (604) 871 – 4170<br/>
          www.zbarlaw.com<br/>
        </Typography>
      </div>
    </div>
  );
};

export default Contact;
