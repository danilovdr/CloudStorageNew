import React, { useEffect } from 'react';
import './App.css';
import { Route, useHistory, Redirect } from 'react-router-dom';
import { url } from './configuration';
import Authorization from './pages/authorization';
import Register from './pages/register';
import MyFolder from './pages/myFolder';
import ShareFolder from './pages/shareFolder';

const App = () => {
  // const history = useHistory();
  // useEffect(() => {
  //   const isAuthorize = () => {
  //     fetch(url + "account/isAuthorize")
  //       .then(resp => resp.json())
  //       .then(data => data ? history.push("/folder/my") : history.push("/authorize"));
  //   }
  //   isAuthorize();
  // }, [history])

  return (
    <div className="App">
      <Redirect from="/" to="/folder/my" />
      <Route exact path="/authorize" component={Authorization} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/folder/my" component={MyFolder} />
      <Route exact path="/folder/my/:id" component={MyFolder} />
      <Route exact path="/folder/share" component={ShareFolder} />
      <Route exact path="/folder/share:id" component={ShareFolder} />
    </div>
  );
}

export default App;
