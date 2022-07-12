import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Buffer} from "buffer"
import App from './App';
import './App.css'
import reportWebVitals from './reportWebVitals';
import "utils/rem"
import "normalize.css"
import 'antd/dist/antd'
// import 'antd/dist/antd.css'
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter as Router, useLocation} from 'react-router-dom';
import {ThemeProvider} from 'styled-components'
import {lightColors, darkColors} from './theme/colors';
// import { useAppSelector } from './store/hooks';
import {GlobalStyle} from 'utils/globaStyle'
import Web3Provider from "./connectors/Web3Provider";
import Updater from "./updater";

window.Buffer = window.Buffer || Buffer

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const StyledThemeProvider = (props: any) => {
  // const isDark = useAppSelector(updater => updater.app.Theme.isDark)
  // Temporary solution 😅
  const history = useLocation()
  const [isHome, setIsHome] = useState<boolean>(true)
  useEffect(() => {
    if (history.pathname === '/') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
    // eslint-disable-next-line
  }, [history.pathname])
  const isDark = isHome
  return <ThemeProvider theme={isDark ? darkColors : lightColors} {...props} />
}

root.render(
  <Provider store={store}>
    <Router>
      <StyledThemeProvider>
        <Web3Provider>
          <Updater/>
          <GlobalStyle/>
          <App/>
        </Web3Provider>
      </StyledThemeProvider>
    </Router>
  </Provider>
);

reportWebVitals();