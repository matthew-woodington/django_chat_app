import "./App.css";
import { useState } from "react";
import Cookies from 'js-cookie';
import UserLogin from "./components/Login/UserLogin";
import ChatApp from "./components/MainApp/ChatApp";

function App() {
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"))
  return (
    <div className="App">
        {auth ? <ChatApp /> : <UserLogin setAuth={setAuth} />}
    </div>
  );
}

export default App;
