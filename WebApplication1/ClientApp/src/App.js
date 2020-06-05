import React  from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Authorization from './pages/authorization';
import Register from './pages/register';
import MyFolder from './pages/myFolder';
import SharedFolder from './pages/shareFolder';

const App = () => {
  return (
    <div className="App">
      <Redirect from="/" to="/folder/my" />
      <Route exact path="/authorize" component={Authorization} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/folder/my" component={MyFolder} />
      <Route exact path="/folder/my/:id" component={MyFolder} />
      <Route exact path="/folder/shared" component={SharedFolder} />
      <Route exact path="/folder/shared/:id" component={SharedFolder} />
    </div>
  );
}

export default App;
