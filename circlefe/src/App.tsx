import { Provider } from 'react-redux';
import { AppRouter } from './routes';
import { store } from './store/store'; // Adjust the path to where your store is defined

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
