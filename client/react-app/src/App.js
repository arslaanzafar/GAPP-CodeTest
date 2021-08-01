
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import Header from "./components/header"
import Users from './containers/user'
import Teams from "./containers/team"
import Departments from "./containers/department"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Switch>
      <Route path="/" exact component={ Users } />
      <Route path="/users" exact component={ Users } />
      <Route path="/teams" exact component={ Teams } />
      <Route path="/departments" exact component={ Departments } />
        
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
