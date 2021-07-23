import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Navigation from './navigation/navigation';
import Home from './home/home';
import Calender from './calender/calender';
import Todo from './todoList/todo';
import Settings from './settings/settings';

function App() {

  return (
    <div className="App">
      <Navigation />
      <div className="main-area">
        <div className="background_circle_left">

        </div>
        <div className="background_circle_right">

        </div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/calender" component={Calender} />
          <Route path="/todo" component={Todo} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
