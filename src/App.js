import { BrowserRouter as Router,Route,Switch ,Redirect} from 'react-router-dom';
import './App.css';
import Header from './Components/Header/header';
import Profile from './Components/Profile/profile';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import Feeds from './Components/Feeds/feeds';
import { AuthContext, AuthProvider } from './Context/AuthProvider';
import { useContext, useState } from 'react';
import Modal from './Components/Modal/modal';

function App() {
  
  return (
  
        
        <Router> 
        <div className="App">
         <Switch> 
          {console.log("inside switch")}
          <Route path="/login" component={Login} exact></Route>
          <Route path="/signup" component={Signup} exact></Route>
          <PrivateRoute path="/" comp={Feeds} exact></PrivateRoute>
          <PrivateRoute path="/profile" comp={Profile} exact></PrivateRoute> 
           </Switch>
        </div>  
      </Router>   
    
  );
}

function PrivateRoute(props){
  let{path,comp:Component}=props;
  //  let currentUser=true;
   let {currentUser}=useContext(AuthContext);
   console.log("private route", currentUser);
  return currentUser ?(<Route path={path} component={Component}></Route>):(<Redirect to="/login"></Redirect>);
}

export default App;
