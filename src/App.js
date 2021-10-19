import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Profile from './pages/Profile/Profile';
import UploadProduct from './pages/UploadProduct/UploadProduct';
import NotificationContainer from './components/Notification/NotificationContainer';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/detail/:product_id" component={ProductDetail} />
          <ProtectedRoute exact path="/profile" >
            <Profile/>
          </ProtectedRoute>
          <ProtectedRoute path="/upload_product">
            <UploadProduct/>
          </ProtectedRoute>
        </Switch>
        <NotificationContainer/>
      </div>
    </Router>
  );
};

export default App;
