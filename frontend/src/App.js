import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
// import Home from "./components/Home";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import SellPetsForm from "./components/SellPetsForm";
import Pets from "./components/Pets";
import HomeO from "./components/HomeO";
import CatsPage from "./components/CatsPage";
import DogsPage from "./components/DogsPage";
import PetsPage from "./components/PetsPag";
import About from "./components/About";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/home" component={HomeO} />
        <Route path="/add-blog" component={AddBlog} />
        <Route path="/pets" component={Pets} />
        <Route path="/about" component={About} />
        <Route path="/" exact component={BlogList} />
        <Route path="/sell-pets" component={SellPetsForm} />
        <Route path="/dogs" component={DogsPage} />
        <Route path="/cats" component={CatsPage} />
        <Route path="/pet/:breedName" component={PetsPage} />
      </Switch>
    </Router>
  );
};

export default App;
