import { User } from '../db/db'

interface Props {
  users: User[]
}

function Index({ users }: Props) {
  return (
    <ul>
      {users.map(({ name, email }) => (
        <li>
          {name} ({email})
        </li>
      ))}
    </ul>
  )
}

export default Index
