import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { AppRouter } from './routes';
import { store } from './store/store'; // Adjust the path to where your store is defined
function App() {
    return (_jsx(Provider, { store: store, children: _jsx(AppRouter, {}) }));
}
export default App;
