import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
        <img
          src="https://inside.tru.ca/wp-content/uploads/2017/04/IMG_2471-599x599.jpg"
          alt="Zbar Lawyering"
          width="200"
          height="200"
        />
      </div>
      <div className="flex-container">
        <Typography
          className={classes.boldText}
          component="p"
          variant="inherit"
        >
          Contact Eli Zbar
        </Typography>
        <Typography component="p" variant="inherit">
          Eli Zbar is the founder and lawyer at Zbar Law Corporation. Eli is
          laser focused on helping entrepreneurs, investors, and individuals
          protect their legal rights and meet their business goals.
          Fundamentally, Eli is a problem solver, there is no client nor matter
          too big or too small.
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
          Contact Eli
        </Button>
      </div>
    </div>
  );
};

export default Contact;
