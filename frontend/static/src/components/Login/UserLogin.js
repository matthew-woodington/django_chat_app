import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


function UserLogin(props) {
    return(
        <div>
            <LoginForm setAuth={props.setAuth}/>
            <RegisterForm setAuth={props.setAuth}/>
        </div>
    )
}

export default UserLogin