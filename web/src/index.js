import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';

// this does not work, had to use resetCSS={false}
/*
const theme = extendTheme({
  styles: {
    global: {
      img: {
        height: null
      }
    }
  }
});
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* had to resetCSS=false, without it audio player cursor wont show */}
    <ChakraProvider resetCSS={false}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

