import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-MXMPH96',
  dataLayerName: 'PageDataLayer'
}
TagManager.initialize(tagManagerArgs)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#D1A157'
    },
    secondary: {
      main: '#E33E7F'
    }
  }
});

window.dataLayer.push({
  event: 'indexTest'
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
       <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
