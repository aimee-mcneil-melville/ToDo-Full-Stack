import { NavLink, useParams } from "react-router-dom";

import continents from "../../data/continents";

const list = Object.keys(continents).map((key) => ({
  ...continents[key],
  name: key,
}));

function Nav() {
  // STRETCH: Bold the selected continent in the `<Nav>` when viewing a continent or country
  // NB: this is better achieved with a NavLink
  const { name } = useParams();
  return (
    <div>
      <h2>Nav</h2>
      <ul>
        {list.map((continent) => (
          <li key={continent.name}>
            <NavLink to={`/continent/${continent.name}`}>
              {continent.name === name ? (
                <strong>{continent.name}</strong>
              ) : (
                continent.name
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nav;
