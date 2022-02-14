import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Proba from "./sajatosztalyok/Proba";
import Komment from "./sajatosztalyok/Komment";
import Forum from "./sajatosztalyok/Forum";
import Torol from "./sajatosztalyok/Torol";
import Felvitel from "./sajatosztalyok/Felvitel";
import Termekek from "./sajatosztalyok/Termekek";
import Termekfelvitel from "./sajatosztalyok/Termekfelvitel";
import Termekdel from "./sajatosztalyok/Termekdel";




class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (






      <div>

<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
       
        CsekElektronik
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link href="forum">Forum</Nav.Link>
          <Nav.Link href="termekek">Termekek</Nav.Link>
          
          {currentUser && (
          <Nav.Link href="komment">Komment</Nav.Link>,
          
          


          <Nav.Link href="felvitel">Felvitel</Nav.Link>
         

          )}

         




{showModeratorBoard && (
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
           
          
            <NavDropdown.Item href="torol">Törlések</NavDropdown.Item>
            <NavDropdown.Item href="termekfelvitel">Termékfelvitel</NavDropdown.Item>
            <NavDropdown.Item href="termekdel">Terméktörlés</NavDropdown.Item>

          
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>

            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          )}
        </Nav>

        
        <Nav>
        {currentUser ? (
          <Nav className="mr-auto">
          <Nav.Link href="/profile">
            {currentUser.username}
            </Nav.Link>
            <Nav.Link href="/login" onClick={this.logOut}>
            LogOut
            </Nav.Link>
            </Nav>
          ) : (
            
            <Nav className="mr-auto">
            <Nav.Link href="/login">
            Login
              </Nav.Link>
              <Nav.Link href="/register">
              Sign up
              </Nav.Link>
              </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>




















        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/proba" component={Proba} />
            <Route path="/komment" component={Komment} />
            <Route path="/forum" component={Forum} />
            <Route path="/torol" component={Torol} />
            <Route path="/felvitel" component={Felvitel} />
            <Route path="/termekek" component={Termekek} />
            <Route path="/termekfelvitel" component={Termekfelvitel} />
            <Route path="/termekdel" component={Termekdel} />
         



          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
