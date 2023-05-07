import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Continent from "./components/Continent";
import Country from "./components/Country";
import Home from "./components/Home";
import Main from "./components/Main";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/* Home will only be displayed in the root route */}
      <Route index element={<Home />} />
      {/* continent is just like a folder that only contains a subfolder*/}
      <Route path="continent" >
        <Route path=":id" element={<Continent />} >
          <Route path=":code" element={<Country />} />
        </Route>
      </Route>
    </Route>
  )
)
