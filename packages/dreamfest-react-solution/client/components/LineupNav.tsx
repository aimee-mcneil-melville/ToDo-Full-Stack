import { NavLink } from 'react-router-dom'

export default function LineupNav() {
  return (
    <nav>
      <NavLink to="/schedule/friday">friday</NavLink>
      <NavLink to="/schedule/saturday">saturday</NavLink>
      <NavLink to="/schedule/sunday">sunday</NavLink>
      <NavLink className="nav" to="/locations">
        view locations
      </NavLink>
    </nav>
  )
}
