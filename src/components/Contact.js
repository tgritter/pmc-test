import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Headshots from "../assets/eli_and_ravneet.jpg"
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  },
  button: {
    width: "275px"
  },
}));

const Contact = (props) => {
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
      <img src={Headshots} alt="headshots" width={400} />
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
      <div className="flex-container">
        <TextField
          id="outlined-search"
          label="Name"
          type="search"
          variant="outlined"
          value={props.name}
          onChange={(event) => props.handleSetName(event)}
          
        />
      </div>
      <div className="flex-container">
        <TextField
          id="outlined-search"
          label="Email"
          type="search"
          variant="outlined"
          value={props.email}
          onChange={(event) => props.handleSetEmail(event)}
          onFocus={() => props.clearEmailError()}
          error={props.emailError !== ""}
          helperText={props.emailError}
        />
      </div>
      <div className="flex-container">
        <Button
          className={classes.button}
          onClick={() => props.handleSendEmail()}
          variant="contained"
          color="secondary"

        >
          {!props.emailLoading ? "Receive your price via email" : <CircularProgress size={30} color="black" />}
        </Button>
      </div>
      <div className="flex-container">
        <Typography className={classes.centerText} component="p" variant="inherit">
          <b>Arora and Zbar LLP</b><br/>
          Office: (604) 260 – 6890<br/>
          <u>Vancouver Address</u><br/>
          Suite 400 - 601 West Broadway<br/>
          Vancouver, BC V5Z 4C2<br/>
          <u>Surrey Address</u><br/>
          109A - 12888 80 Avenue<br/>
          Surrey, BC V3W 3A8<br/>
          <a href="https://arorazbar.com/">https://arorazbar.com/</a><br/>
        </Typography>
      </div>
    </div>
  );
};

export default Contact;
