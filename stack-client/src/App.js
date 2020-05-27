import React from 'react';
import './App.css';
import Nav from './components/nav';
import Login from './components/login';
import Register from './components/register';
import Order from './components/order';
import Product from './components/product';
import Users from './components/usersList';
import Category from './components/category';
import ProductList from './components/productList';
import oneProduct from './components/oneProduct';
import wishList from './components/wishList';
import myCart from './components/myCart';
import myList from './components/listItem';
import Payment from './components/payment';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

class App extends React.Component {

  render (){
    if(localStorage.getItem('userEmail')){
      if(localStorage.getItem('userType')==="admin"){
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/usersList" component={ Users }></Route>
                <Route path="/category" component={ Category }></Route>
                <Route path="/product" component={ Product }></Route>
                <Route path="/productList" component={ ProductList }></Route>
                <Route path="/viewProduct" component={ oneProduct }></Route>
                <Route path="/" component={ ProductList }></Route>
              </Switch>
              <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
            </div>
          </Router>
        );
      }else if(localStorage.getItem('userType')==="sm"){
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/product" component={ Product }></Route>
                <Route path="/productList" component={ ProductList }></Route>
                <Route path="/viewProduct" component={ oneProduct }></Route>
                <Route path="/" component={ ProductList }></Route>
              </Switch>
              <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
            </div>
          </Router>
        );
      }else{
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/order" component={ Order }></Route>
                <Route path="/productList" component={ ProductList }></Route>
                <Route path="/viewProduct" component={ oneProduct }></Route>
                <Route path="/wishList" component={ wishList }></Route>
                <Route path="/cart" component={ myCart }></Route>
                <Route path="/list" component={ myList }></Route>
                <Route path="/payment" component={ Payment }></Route>
                <Route path="/" component={ ProductList }></Route>
              </Switch>
              <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
            </div>
          </Router>
        );
      }
    }else{
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/login" component={ Login }></Route>
              <Route path="/register" component={ Register }></Route>
              <Route path="/productList" component={ ProductList }></Route>
              <Route path="/viewProduct" component={ oneProduct }></Route>
              <Route path="/" component={ ProductList }></Route>
            </Switch>
            <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
          </div>
        </Router>
      );
    }
  }
}

export default App;
