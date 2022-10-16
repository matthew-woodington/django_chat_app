import "./App.css";
import { useState } from "react";
import Cookies from 'js-cookie';
import UserLogin from "./components/Login/UserLogin";
import ChatApp from "./components/MainApp/ChatApp";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function App() {
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));
  // const [user, setUser] = useState('')

  return (
  <>
    <Navbar bg="light">
        <Container>
            <Navbar.Brand href="#home">LFG</Navbar.Brand>
            <Button variant="secondary">Logout</Button>
        </Container>
    </Navbar>
    <section className="app">
      <div className="main">
        {auth ? <ChatApp/> : <UserLogin setAuth={setAuth} />}
      </div>
    </section>
  </>
  );
}

export default App;
