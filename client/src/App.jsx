import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
//pages
import Main from "./Main";
import Profile from "./Profile";
import Auth from "./Auth";
import People from "./People";
import Blog from "./Blog";
import Editor from "./Editor";
import ProfileSettings from "./ProfileSettings";
import { createContext, useEffect, useState } from "react";

import http from "./services.js";
import env from "./env.js";

export const Authorization = createContext();

function MainPages() {
  const [isAuthorized, setAuthorized] = useState(null);
  const [blogs, setBlogs] = useState([]);

  async function getBlogs() {
    try {
      const { data } = await http.get(`${env.URL}/api/blog/all`);
      setBlogs(data.blogs);
    } catch (error) {
      console.error(error);
    }
  }
  async function getUser() {
    try {
      const { data } = await http.get(`${env.URL}/api/private`);
      if (data.success) setAuthorized(data.user);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getBlogs();
    getUser();
  }, []);

  return (
    <Authorization.Provider value={isAuthorized}>
      <Header />
      <div className="pages">
        <div className="main">
          <div className="wrapper">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <Main props={props} blogs={blogs} />}
              />
              <Route
                exact
                path="/blog/editor/:id"
                component={(props) => <Editor editMode={true} props={props} />}
              />
              <Route exact path="/user/editor" component={Editor} />
              <Route
                exact
                path="/user/:id"
                render={(props) => <Profile props={props} />}
              />
              <Route
                exact
                path="/user/:id/settings"
                render={(props) => <ProfileSettings props={props} />}
              />
              <Route exact path="/people" component={People} />
              <Route
                exact
                path="/blog/:id"
                render={(props) => <Blog props={props} />}
              />
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
