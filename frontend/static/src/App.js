import "./App.css";
import { useState } from "react";
import Cookies from 'js-cookie';
import UserLogin from "./components/Login/UserLogin";
import ChatApp from "./components/MainApp/ChatApp";

function App() {
  const [auth, setAuth] = useState(!!Cookies.get("Authorization"));
  // const [user, setUser] = useState('')

  return (
    <div className="main">
        {auth ? <ChatApp
        //  user={user}
         /> : <UserLogin setAuth={setAuth} 
        //  setUser={setUser}
         />}
    </div>
  );
}

export default App;
