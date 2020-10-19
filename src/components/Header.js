import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className="app-header">
      <Avatar className={classes.avatar}>
        <AccountBalanceIcon />
      </Avatar>
      <div>
        <Typography component="h1" variant="h5">
          Price My Conveyance
        </Typography>
      </div>
    </div>
  );
};

export default Header;
