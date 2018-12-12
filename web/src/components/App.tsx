import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { changeSeason } from 'src/store/reducers';
import { availableSeasons } from '../model/Season';
import './App.css';
import Header from './Header';


// create a redux store
const store = createStore(changeSeason, {
  season: availableSeasons[0]
})


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Header />
      </Provider>
    );
  }
}

export default App;
