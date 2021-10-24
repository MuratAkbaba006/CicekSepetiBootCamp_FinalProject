import React,{Suspense,lazy} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Loading from './components/Loading/Loading';
const Home = lazy(() => import('./pages/Home/Home'))
const Login =lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const UploadProduct = lazy(() => import('./pages/UploadProduct/UploadProduct'))
const NotificationContainer = lazy(() => import('./components/Notification/NotificationContainer'))
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
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
      </Suspense>
    </Router>
  );
};

export default App;
