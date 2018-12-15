import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { changeSeason } from 'src/store/reducers';
import { initialSeason } from '../model';
import Header from './Header';
import Index from './Index';


// create a redux store
const store = createStore(changeSeason, {
  season: initialSeason
})

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Index />
    </Provider>
  );
}

export default App;