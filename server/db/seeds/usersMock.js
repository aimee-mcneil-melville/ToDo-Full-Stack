export default function () {
  let testUsers = [
    {
      id: 1,
      username: 'Jeff',
      password: 'test name 1',
      garden: '1'
    }, {
      id: 2,
      username: 'Steve',
      password: 'test name 1',
      garden: '3'
    }, {
      id: 3,
      username: 'Pete',
      password: 'test name 1',
      garden: '2'
    }
  ]

  return handleClick = () => {
        registerUser(username, password, garden).then(() => {
          if (isAuthenticated()) {
            return props.history.push("/garden")
          }
        }   
        }
    
}
