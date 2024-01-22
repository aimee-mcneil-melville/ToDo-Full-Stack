import { useUserData } from '../hooks/use-userdata.ts'
import ErrorMessage from './ErrorMessage.tsx'
import LoadingIndicator from './LoadingIndicator.tsx'

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
      <h4>
        {user.data.display_name || user.data.user_name}{' '}
        {user.data.personal_pronouns && <>({user.data.personal_pronouns})</>}
      </h4>
      <h2>u/{user.data.user_name}</h2>
      {user.data.bio?.split('\n\n').map((_) => <p key={_}>{_}</p>)}
    </>
  )
}
