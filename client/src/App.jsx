import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
//pages
import Main from "./Main";
import Profile from "./Profile";
import Auth from "./Auth";
import Categories from "./Categories";
import People from "./People";
import Blog from "./Blog";
import { createContext, useEffect, useState } from "react";

import http from "./services.js";

export const Authorization = createContext();
function MainPages() {
  const [user, setUser] = useState(null);
  async function getUser() {
    try {
      const response = await http.get('http://localhost:5000/api');
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getUser();
  });
  return (
    <Authorization.Provider value={user}>
      <Header />
      <div className="pages">
        <div className="main">
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/user" component={Profile} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/people" component={People} />
              <Route exact path="/blog/:id" component={Blog} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Authorization.Provider>
  );
}
function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={MainPages} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
