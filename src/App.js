import './App.css';
import Login from './components/Login/Login';
import NotMatch from './components/NotMatch/NotMatch';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/login" >
            <Login />
          </Route>
          {/* <Route path="/" >
            <Home />
          </Route> */}
          <PrivateRoute path="/" >
            <Home />
          </PrivateRoute>
          <Route path="*" >
            <NotMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
