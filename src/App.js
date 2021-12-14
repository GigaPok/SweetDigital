import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom"
import './App.css';
import MainPage from './pages/MainPage';
import SinglePage from './pages/SinglePage';
import { HOME, Single_User } from './router';

function App() {

  return (
    <Router>
      <Container maxWidth="lg">
        <div className="App">
          <Route path={HOME} exact component={MainPage} />
          <Route path={Single_User} exact component={SinglePage} />
        </div>
      </Container >
    </Router>
  );
}

export default App;
