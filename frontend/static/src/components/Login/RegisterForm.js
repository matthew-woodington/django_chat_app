import { useState } from "react";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function RegisterForm(props) {
  const [passwordTwo, setPasswordTwo] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const checkEqualPass = () => {
    if (state.password !== passwordTwo) {
      alert("Your passwords do not match.");
      return;
    } else {
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (err) => {
    console.warn(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      Cookies.set("Authorization", `Token ${data.key}`);
      props.setAuth(true);
    }
  };

  return (
    <>
      <Form onSubmit={checkEqualPass}>
        <Form.Group className="mb-3" controlId="usernameReg">
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
        <Form.Group className="mb-3" controlId="emailReg">
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
        <Form.Group className="mb-3" controlId="passwordReg">
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
        <Form.Group className="mb-3" controlId="passwordTwo">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again"
            value={passwordTwo}
            onChange={(e) => setPasswordTwo(e.target.value)}
            required
            name="passwordTwo"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}

export default RegisterForm;
