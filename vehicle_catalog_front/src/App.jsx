import Routes from './routes';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import './styles/global.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
