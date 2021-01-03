import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PMCLogo from "../assets/pmc_logo.png"
import Logo from "../assets/arora_logo.png"

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  subtext: {
    fontSize: 12,
    padding: 5,
    marginBottom: -10
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className="app-header">
        <img src={PMCLogo} alt="logo" width={200} height={25}/>
        <Typography className={classes.subtext} component="p" variant="inherit">
          Powered By
        </Typography>
        <a href="https://arorazbar.com/">
          <img src={Logo} alt="logo" width={240} />
        </a>
    </div>
  );
};

export default Header;
