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

export const Authorization = createContext();

function MainPages() {
  const [isAuthorized, setAuthorized] = useState({_id:null});

  useEffect(() => {
    http
      .get(`/api/private`)
      .then(({ data }) => {
        setAuthorized(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Authorization.Provider value={isAuthorized}>
      <Header />
      <div className="pages">
        <div className="main">
          <div className="wrapper">
            <Switch>
              <Route exact path="/" render={() => <Main />} />
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
