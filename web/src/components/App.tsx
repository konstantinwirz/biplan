import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter as Router, Route } from "react-router-dom";
import { changeSeason } from '../store/reducers';
import { initialSeason } from '../model';
import Header from './Header';
import Index from './Index';
import Events from './Events';


// create a redux store
const store = createStore(changeSeason, {
  season: initialSeason
})

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Route exact={true} path="/" component={Index} />
        <Route path="/events/:id" component={Events} />
      </Provider>
    </Router>
  );
}

export default App;