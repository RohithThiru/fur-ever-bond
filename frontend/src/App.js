import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Home from "./components/Home";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import SellPetsForm from "./components/SellPetsForm";
import Pets from "./components/Pets";
import HomeO from "./components/HomeO";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/home" component={HomeO} />
        <Route path="/add-blog" component={AddBlog} />
        <Route path="/blogs" component={Home} /> {/* Reuse Home for Blogs */}
        <Route path="/pets" component={Pets} />
        <Route path="/about" render={() => <h2>About Page</h2>} />
        <Route path="/" exact component={BlogList} />
        <Route path="/sell-pets" component={SellPetsForm} />
      </Switch>
    </Router>
  );
};

export default App;
