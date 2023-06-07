import { Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import Nav from "./Nav";
import Meeting from "./Meeting";
import History from "./History";
import Welcome from "./Welcome";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

function App() {
  return (
    <>
      <div className="container has-text-centered">
        <div className="hero is-small is-primary">
          <div className="hero-body has-text-centered">
            <Link to="/" className="">
              <h1 className="title is-1">$how Me The Money</h1>
            </Link>
            <Nav />
          </div>
        </div>
        <div className="">
          <IfNotAuthenticated>
            <Login />
          </IfNotAuthenticated>

          <IfAuthenticated>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </IfAuthenticated>
        </div>
      </div>
    </>
  );
}

export default App;
