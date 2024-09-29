import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from './store/store'; // Adjust the path to where your store is defined
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
var client = new QueryClient();
var colors = {
    brand: {
        main: '#04A51E',
        background: '#1D1D1D'
    }
};
var theme = extendTheme({ colors: colors });
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(ChakraProvider, { theme: theme, children: _jsxs(QueryClientProvider, { client: client, children: [_jsx(App, {}), _jsx(ReactQueryDevtools, {})] }) }) }) }));
