import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  centerText: {
    textAlign: "center",
  },
}));

const Confirm = (props) => {
  const classes = useStyles();
  return (
    <div className="confirm-container">
      <div className="flex-container">
        <Typography className={classes.centerText} component="p" variant="inherit">
          Thank-you, please check your email.
        </Typography>
      </div>
      <div className="flex-container">
        <Button
          onClick={props.handleCalculateAgain}
          variant="contained"
          color="primary"
        >
          Price another conveyance
        </Button>
      </div>
    </div>
  );
};

export default Confirm;