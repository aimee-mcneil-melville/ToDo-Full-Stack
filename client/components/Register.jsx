import React, { useState } from 'react';
import {
    register,
    isAuthenticated,
} from 'authenticare/client';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        register({
            username: username,
            password: password,
        }).then(() => {
            if (isAuthenticated()) {
                props.history.push('/');
            }
        }).catch(error => {
            console.log('error: ', error.message)
        });
    }

    return (
        <div>
            <h2>Register</h2>
            <form>
                <input
                    type="username"
                    value={username}
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type="password"
                    value={password}
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <select name='garden' id='name'>
                    <option value='Kelmarna Gardens'>Kelmarna Gardens</option>
                    <option value='Kingsland Community Orchard'>Kingsland Community Orchard</option>
                    <option value='Devonport Community Garden'>Devonport Community Garden</option>
                </select>
            </form>
            <button type="button" onClick={handleClick}
                data-testid='submitButton'  >
                Submit
			</button>
        </div>
    );
}