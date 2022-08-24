import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { 
  Error,
  GridForm,
  ColOne, 
  ColTwoText,
  ColTwoField,
  Button,
  RadioLabel,
  Radio
} from './Styled'

import { addUser } from '../api'
import { updateLoggedInUser } from '../actions/loggedInUser'

const icons = [
  '🍇', '🍈', '🍉', '🍊', '🍋',
  '🍌', '🍍', '🥭', '🍎', '🍏',
  '🍐', '🍑', '🍒', '🍓', '🫐',
  '🥝', '🍅', '🥥'
]

function Register() {
  const user = useSelector((state) => state.loggedInUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    username: '',
    icon: ''
  })
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if(user.username) navigate('/')
  }, [user])

  const handleChange = (evt) => {
    setForm({ 
      ...form,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const userInfo = {
      auth0Id: user.auth0Id,
      ...form
    }
    addUser(userInfo, user.token)
      .then(() => dispatch(updateLoggedInUser(userInfo)))
      .catch((err) => setErrorMsg(err.message))
  }

  const hideError = () => {
    setErrorMsg('')
  }

  // TODO: already logged in
  return (
    <>
      <h2>Complete profile set up</h2>
      {errorMsg && <Error onClick={hideError}>Error: {errorMsg}</Error>}
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor="username">Username:</ColOne>
        <ColTwoText
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <ColOne htmlFor="icon">Which fruit best represents your personality?</ColOne>
        <ColTwoField id="icon">
          {icons.map(fruit => 
            <RadioLabel key={fruit} selected={form.icon === fruit}>
              <Radio id={fruit} type="radio" value={fruit} name="icon" onChange={handleChange}/>
              {fruit}
            </RadioLabel>
          )}
        </ColTwoField>

        <Button disabled={!(form.username && form.icon)}>
          Save Profile
        </Button>
      </GridForm>
    </>
  )
}

export default Register
