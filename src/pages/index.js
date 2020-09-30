import React from "react";
import { CssBaseline } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import TextField from "@material-ui/core/TextField";

import AccountTreeTwoToneIcon from "@material-ui/icons/AccountTreeTwoTone";

const command_mapper = {
  prem: "SOFULL,NET#,SC#,prempremprempremprem",
  compplus: "SOFULL,NET#,SC#,comppluscomppluscomppluscomppluscompplus",
  comp: "SOFULL,NET#,SC#,compcompcompcompcompcomp",
  remall: "SOFULL,NET#,SC#,remallremallremallremallremallremall",
  chnat: "SONATI,NET#,SC#,chnatchnatchnatchnatchnat",
  cust: "",
};

const _prefix = {
  is20: "MCAFRK",
  e36b: "MCAFRW",
};

const Root = (props) => {
  // const theme = useTheme();

  const [iuc, setIuc] = React.useState("");

  const handleIUC = (event) => {
    console.log(event.target.value);
    setIuc(event.target.value);
  };

  const [networkType, setNetworkType] = React.useState("is20");

  const handleChangeNetwork = (event, newNetwork) => {
    console.log(newNetwork);
    setNetworkType(newNetwork);
    if (command && newNetwork === "is20") {
      setCommand(command.replace(_prefix["e36b"], _prefix["is20"]));
    } else if (command && newNetwork === "e36b") {
      setCommand(command.replace(_prefix["is20"], _prefix["e36b"]));
    }
  };

  const [command, setCommand] = React.useState("");
  const [subscription, setSubscription] = React.useState("");

  const handleOption = (event, subscription) => {
    if (subscription === null) return;
    console.log(subscription, iuc);
    setSubscription(subscription);
    let cmd =
      subscription && iuc && networkType
        ? command_mapper[subscription].replace("SC#", iuc)
        : "#Error";
    cmd = cmd.replace("NET#", _prefix[networkType]);
    setCommand(cmd);
  };

  const useStyles = makeStyles((theme) => ({
    appBar: {
      marginBottom: theme.spacing(2),
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    input: { paddingRight: theme.spacing(1) },
    button: {
      margin: theme.spacing(0),
    },
    pkgButton: {
      margin: theme.spacing(0),
      backgroundColor: "#992233",
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "50%",
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

  const hanldeCountryOpt = (item, popupState) => {
    console.log(item.target);
    popupState.close();
  };

  const classes = useStyles();

  return (
    <CssBaseline>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar>
          <AccountTreeTwoToneIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Decoder Activator
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={iuc}
          className={classes.input}
          onChange={handleIUC}
        />

        <ToggleButtonGroup
          value={networkType}
          exclusive
          onChange={handleChangeNetwork}
          aria-label="text networkType"
        >
          <ToggleButton
            value="is20"
            aria-label="is20"
            className={classes.button}
          >
            IS20
          </ToggleButton>
          <ToggleButton
            value="e36b"
            aria-label="e36b"
            className={classes.button}
          >
            E36B
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <ToggleButtonGroup
            orientation="vertical"
            value={subscription}
            exclusive
            onChange={handleOption}
          >
            <ToggleButton
              value="prem"
              aria-label="prem"
              className={classes.button}
            >
              Premium
            </ToggleButton>
            <ToggleButton
              value="compplus"
              aria-label="compplus"
              className={classes.button}
            >
              Compact-Plus
            </ToggleButton>
            <ToggleButton
              value="comp"
              aria-label="comp"
              className={classes.button}
            >
              Compact
            </ToggleButton>
            <ToggleButton
              value="remall"
              aria-label="remall"
              className={classes.button}
            >
              Removal All
            </ToggleButton>

            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <ToggleButton
                    value="chnat"
                    aria-label="chnat"
                    className={classes.button}
                    {...bindTrigger(popupState)}
                  >
                    Change Nationality
                  </ToggleButton>
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={(e) => hanldeCountryOpt(e, popupState)}
                      value="ZAF"
                    >
                      ZAF
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        popupState.close();
                      }}
                      value="NGA"
                    >
                      NGA
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        popupState.close();
                      }}
                      value="ZIM"
                    >
                      ZIM
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <ToggleButton
              value="cust"
              aria-label="cust"
              className={classes.button}
            >
              Custom
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <TextField
          id="standard-helperText"
          defaultValue={command}
          helperText="* Edit if incorrect"
          fullWidth
          multiline
          placeholder="Enter your command here..."
        />

        <Button variant="contained" color="secondary">
          Send
        </Button>
      </div>
    </CssBaseline>
  );
};

export default Root;
