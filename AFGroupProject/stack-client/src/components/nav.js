import React from 'react';
import '../App.css';
import { Navbar , Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/*******for navigation bar********/
class nav extends React.Component {
  
  Logout = () => {
    localStorage.clear();
    window.location.href = '/login'
  }

  /******According to the user type display the their features*********/
  render() {
      //admin's system features
    if(localStorage.getItem('userEmail')){
      if(localStorage.getItem('userType')==="admin"){
        return (
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Online Fashion Store</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/usersList" >Users</Nav.Link>
                <Nav.Link href="/" >View Products</Nav.Link>
                <Nav.Link href="/category" >Category</Nav.Link>
                <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }else if(localStorage.getItem('userType')==="sm"){
          //Store manager's system features
        return (
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Online Fashion Store</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/product" >Product</Nav.Link>
                <Nav.Link href="/" >View Product</Nav.Link>
                <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }else{
          //normal user's features
        return (
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Online Fashion Store</Navbar.Brand>
      
            <Navbar.Collapse class="collapse navbar-collapse">
              <Nav class="navbar-nav ml-auto">
                <Nav.Link href="/" >View Products</Nav.Link>
                <Nav.Link href="/Wishlist" >Wishlist</Nav.Link>
                <Nav.Link href="/cart" >Shopping Cart</Nav.Link>
                <Nav.Link onClick={ this.Logout } >Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    }else{
      return (
        <Navbar bg="light" variant="light">
          <Navbar.Brand >Online Fashion Store</Navbar.Brand>
    
          <Navbar.Collapse class="collapse navbar-collapse">
            <Nav class="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default nav;