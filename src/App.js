import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import AuthContextProvider from './context/AuthContext';
import IndexRoute from './routers/IndexRoute';
import LoadingPageProvider from './context/LoaderContext';

function App() {
  return (
    <AuthContextProvider>
      <LoadingPageProvider>
        <Router>
          <IndexRoute />
        </Router>
      </LoadingPageProvider>
    </AuthContextProvider>
  );
}

export default App;
