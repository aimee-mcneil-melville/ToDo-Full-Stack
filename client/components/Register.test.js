import React from 'react';
import renderer from 'react-test-renderer';
import Register from './Register';
import { render, fireEvent } from '@testing-library/react'

describe('Register Renders', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Register />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Input Field Updates', () => {
    it('gets the text', () => {
        const { queryByPlaceholderText } = render(<Register />)
        const usernameInput = queryByPlaceholderText('username')
        fireEvent.change(usernameInput, { target: { value: 'username' } })
        expect(usernameInput.value).toBe('username')
    })
})

describe('Submit Button Finds Handleclick', () => {
    it('sends the submit button', () => {
        const { queryByTestId } = render(<Register />)
        fireEvent.click(queryByTestId('submitButton'))
    })
})

