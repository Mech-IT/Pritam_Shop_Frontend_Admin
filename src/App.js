import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import List from './pages/List';
import New from './pages/New';
import Single from './pages/Single';
// import  "./style/dark.css"
import { useSelector } from "react-redux"
import Singleproduct from './pages/Singleproduct';
import Updateproduct from './pages/Updateproduct';
import UpdateOrder from './pages/UpdateOrder';



function App() {
 
  const { currentUser } = useSelector(state => state.user)
  const RequireAuth = ({ children }) => {
    return currentUser && sessionStorage.getItem("token") ? children : <Navigate to="/login"></Navigate>
  }

  

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login key={"/login"} />} />
          <Route exact path="/">
            <Route index element={<RequireAuth><Home key={"/"} /></RequireAuth>} />
            <Route exact path='users'>
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route exact path=':userEmail' element={<RequireAuth><Single /></RequireAuth>} />
              <Route exact path='new' element={<RequireAuth><New /></RequireAuth>} />
            </Route>
            <Route exact path='products'>
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route exact path=':productId' element={<RequireAuth><Singleproduct /></RequireAuth>} />
              <Route exact path='new' element={<RequireAuth><New /></RequireAuth>} />
              <Route exact path='update/:productId' element={<RequireAuth><Updateproduct /></RequireAuth>} />
            </Route>
            <Route exact path='orders'>
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route exact path=':orderId' element={<RequireAuth><Single /></RequireAuth>} />
              <Route exact path='new' element={<RequireAuth><New /></RequireAuth>} />
              <Route exact path='update/:orderId' element={<RequireAuth><UpdateOrder/></RequireAuth>} />
            </Route>
            <Route exact path='carts'>
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route exact path=':cartId' element={<RequireAuth><Single /></RequireAuth>} />
              <Route exact path='new' element={<RequireAuth><New /></RequireAuth>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
