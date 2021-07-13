import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './navigation/navigation';
import Home from './home/home';
import Calender from './calender/calender';
import Todo from './todoList/todo';
import SleepTracker from './sleepTracker/sleepTracker';
import Settings from './settings/settings';

function App() {

  return (
    <div className="App">
      <Navigation />
      <div className="main-area">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/calender" component={Calender} />
          <Route path="/todo" component={Todo} />
          <Route path="/sleep-tracker" component={SleepTracker} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
