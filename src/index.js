import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ReactGA from 'react-ga';

ReactGA.initialize('G-10M0830TVZ');
ReactGA.pageview(window.location.pathname + window.location.search);
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
