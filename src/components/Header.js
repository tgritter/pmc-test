import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Logo from "../assets/zbar_logo.jpg"

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  subtext: {
    fontSize: 10,
    padding: 5
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className="app-header">
        <Typography component="h1" variant="h5">
          Price My Conveyance
        </Typography>
        <Typography className={classes.subtext} component="p" variant="inherit">
          Powered By
        </Typography>
        <img src={Logo} alt="logo" width={80} height={20}/>
    </div>
  );
};

export default Header;
