import { useState } from "react";
import Cookies from  'js-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm(props) {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleError = (err) => {
        console.warn(err)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        };

        const response = await fetch('/dj-rest-auth/login/', options).catch(handleError);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        } else {
            const data = await response.json()
            Cookies.set('Authorization', `Token ${data.key}`);
            props.setAuth(true)
        }
    }

    return(
        <div className="login-form">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username"
                        value={state.username}
                        onChange={handleInput}
                        required
                        name="username"  
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={state.email}
                        onChange={handleInput}
                        required
                        name="email" 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password"
                        value={state.password}
                        onChange={handleInput}
                        required
                        name="password" 
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm