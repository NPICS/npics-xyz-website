import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'
import reportWebVitals from './reportWebVitals';
import "utils/rem"
import "normalize.css"
import 'antd/dist/antd'
// import 'antd/dist/antd.css'
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { lightColors, darkColors } from './theme/colors';
// import { useAppSelector } from './store/hooks';
import { ethers } from "ethers"
import { Web3ReactProvider } from "@web3-react/core"
import { GlobalStyle } from 'utils/globaStyle'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



const StyledThemeProvider = (props: any) => {
  // const isDark = useAppSelector(state => state.app.Theme.isDark)
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

const web3GetLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000
  return library
}

root.render(
  <Provider store={store}>
    <Router>
      <StyledThemeProvider>
        <Web3ReactProvider getLibrary={web3GetLibrary}>
          <GlobalStyle />
          <App />
        </Web3ReactProvider>
      </StyledThemeProvider>
    </Router>
  </Provider>
);

reportWebVitals();