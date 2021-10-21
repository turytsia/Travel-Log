import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
//pages
import Main from "./Main";
import Profile from "./Profile";
import Auth from "./Auth";
import Categories from "./Categories";
import People from "./People";
function MainPages() {
  return (
    <>
      <Header />
      <div className="pages">
        <div className="main">
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/user" component={Profile} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/people" component={People} />
            </Switch>
          </div>
        </div>
      </div>
    </>
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
