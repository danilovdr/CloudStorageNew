import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Authorization from './pages/authorization';
import Register from './pages/register';
import MyFolder from './pages/folder/my';
import SharedFolder from './pages/folder/shared';
import Folder from './pages/folder';

const App = () => {
  return (
    <div className="App">
      <Redirect from="/" to="/folder/my" />
      <Route exact path="/authorize" component={Authorization} />
      <Route exact path="/register" component={Register} />
      <Route path="/folder" component={Folder} />
    </div>
  );
}

export default App;
