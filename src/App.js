import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './home/home';
import Calender from './calender_old_practice_code/calender';



function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/calender" component={Calender} /> */}
      </Switch>
    </div>
  );
}

export default App;
