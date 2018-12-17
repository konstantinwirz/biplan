import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from 'redux';
import { initialSeason } from '../model';
import { changeSeason } from '../store/reducers';
import Events from './Events';
import Header from './Header';
import Seasons from './Seasons';
import Competitions from './Competitions';
import Races from './Races';


// create a redux store
const store = createStore(changeSeason, {
  season: initialSeason
})

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Seasons} />
          <Route path="/events/:id" component={Events} />
          <Route path="/competitions/:id" component={Competitions} />
          <Route path="/races/:id" component={Races} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;