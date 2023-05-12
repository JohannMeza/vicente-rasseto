import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext';
import IndexRoute from './routers/IndexRoute';
import LoadingPageProvider from './context/LoaderContext';
import LayoutProvider from './context/LayoutContext';

function App() {
  return (
    <LayoutProvider>
      <AuthContextProvider>
        <LoadingPageProvider>
          <Router>
            <IndexRoute />
          </Router>
        </LoadingPageProvider>
      </AuthContextProvider>
    </LayoutProvider>
  );
}

export default App;
