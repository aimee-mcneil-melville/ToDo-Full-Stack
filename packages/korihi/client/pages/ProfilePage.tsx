import { useParams } from 'react-router-dom'
import Profile from '../components/Profile.tsx'
import PostsBy from '../components/PostsBy.tsx'
import useCredentials from '../hooks/use-auth.ts'
import { useUserData } from '../hooks/use-userdata.ts'

export default function ProfilePage() {
  const { username } = useParams()
  if (!username) {
    throw new Error()
  }
  const { username: currentUser } = useCredentials()
  const user = useUserData(username)

  return (
    <>
      <Profile username={username} />
      {user.data && user.data.user_name === currentUser && (
        <>
          <h3>Edit your profile data</h3>
          {/* TODO: Implement a form to edit profile data */}
        </>
      )}
      <PostsBy username={username} />
    </>
  )
}
