import { useUserData } from '../hooks/use-userdata.ts'
import ErrorMessage from './ErrorMessage.tsx'
import LoadingIndicator from './LoadingIndicator.tsx'
import { API_HOST } from '../env.ts'

interface Props {
  username: string
}

export default function Profile({ username }: Props) {
  const user = useUserData(username)

  if (user.isLoading) {
    return <LoadingIndicator />
  }

  if (user.isError || user.data == undefined) {
    return <ErrorMessage error={user.error} />
  }

  return (
    <>
      <img
        className="profile-data__pfp"
        src={`${API_HOST}/users/${username}/avatar`}
        alt={`portrait of ${username}`}
      />
      <h4>
        {user.data.display_name || user.data.user_name}{' '}
        {user.data.personal_pronouns && <>({user.data.personal_pronouns})</>}
      </h4>
      <h2>u/{user.data.user_name}</h2>
      {user.data.bio?.split('\n\n').map((_) => <p key={_}>{_}</p>)}
    </>
  )
}
