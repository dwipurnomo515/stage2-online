import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { store } from './store/store'; // Adjust the path to where your store is defined
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();
const colors = {
  brand: {
    main: '#04A51E',
    background: '#1D1D1D'
  }
}

const theme = extendTheme({ colors });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
)
