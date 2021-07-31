
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Header from "./components/header"
import Users from './containers/user';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
      <Route path="/" exact component={ Users } />
      <Route path="/users" exact component={ Users } />
        
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
