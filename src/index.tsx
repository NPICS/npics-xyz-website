import React from 'react';
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
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { lightColors, darkColors } from './theme/colors';
import { useAppSelector } from './store/hooks';
import { ethers } from "ethers"
import { Web3ReactProvider } from "@web3-react/core"
import { GlobalStyle } from 'utils/globaStyle'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const StyledThemeProvider = (props: any) => {
  const isDark = useAppSelector(state => state.app.Theme.isDark)
  return <ThemeProvider theme={isDark ? darkColors : lightColors} {...props} />
}

const web3GetLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000
  return library
}

root.render(
    <Provider store={store}>
      <StyledThemeProvider>
        <Web3ReactProvider getLibrary={web3GetLibrary}>
          <Router>
            <GlobalStyle />
              <App />
          </Router>
        </Web3ReactProvider>
      </StyledThemeProvider>
    </Provider>
);

reportWebVitals();