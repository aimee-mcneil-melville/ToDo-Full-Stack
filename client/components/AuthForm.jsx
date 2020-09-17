import React, { useState } from 'react';
import {
    register,
    isAuthenticated,
} from 'authenticare/client';

export default function App() {
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
        });
    };

    return (
        <div>
            <h2>Register</h2>
            <form>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <select name='garden' id='name'>
                    <option value='Kelmarna Gardens'>Kelmarna Gardens</option>
                    <option value='Kingsland Community Orchard'>Kingsland Community Orchard</option>
                    <option value='Devonport Community Garden'>Devonport Community Garden</option>
                </select>
            </form>
            <button type="button" onclick={handleClick}>
                Submit
			</button>
        </div>
    );
}