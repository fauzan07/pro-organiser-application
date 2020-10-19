import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import CreateBoard from './pages/CreateBoard/CreateBoard';
import AllBoards from './pages/AllBoards/AllBoards';
import Board from './pages/Board/Board';
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import { AuthProvider } from './context/Auth';
import PrivateRoute from './common/guards/PrivateRoute';
import Header  from './components/Header/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header />
        <Switch>
        <PrivateRoute path="/" exact  component = {AllBoards} />
        <PrivateRoute path="/createboard" component = {CreateBoard} />
        <PrivateRoute path="/board/:boardName" component = {Board} />
          <Route path="/LoginRegister" component={LoginRegister} />
          <Route path="*" render = {() => <h3>Page not Found!</h3>} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;