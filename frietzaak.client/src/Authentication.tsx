import { useState, useContext } from "react";
import Login from "./Login";
import Register from "./Register";
import { userContext } from "./App"
import { useNavigate } from "react-router-dom";

function Authentication() {    
    const { loggedInUser, setLogin } = useContext(userContext);
    const navigate = useNavigate();
    const [view, setView] = useState('main');


    const clickLogin = () => {
        setView('login');
    }

    const clickRegister = () => {
        setView('register');
    }

    const backToMain = () => {
        setView('main');
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch('https://localhost:7167/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: formData.get('email'), password: formData.get('password') })
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status == 404) {
                        alert("User with this email does not exist.");
                    } else if (response.status == 401) {
                        alert("Password does not match.");
                    }
                    return;
                }
                return response.json();
            })
            .then(data => {                
                setLogin(data);                              
                navigate("/order")
            })
            .catch(error => {
                console.log("Error", error);
            });
    };

    const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (formData.get('password') !== formData.get('password-confirm')) {
            alert("Passwords do not match");
            return;
        }

        console.log("Registering", formData.get('name'), formData.get('password'));

        fetch('https://localhost:7167/user/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), password: formData.get('password') })
        })
            .catch(error => {
                console.log("Error", error);
            });
    };

    return (
        <>

            <div className="flex flex-col h-screen justify-center">
                <div className="border-2 border-slate-500 flex flex-row justify-center bg-gray-300 border-rounded rounded-lg shadow-xl self-center w-1/3 h-3/4">

                    <div className="self-center flex items-center justify-evenly bg-slate-200 w-11/12 h-full shadow-lg">
                        {view == "main" &&
                            <div className="flex flex-col self-center border border-white border-2 rounded rounded-lg p-10">
                                <button onClick={clickLogin} className="text-xl border rounded-full w-full my-3 px-5 py-1 bg-slate-600">Login</button>
                                <button onClick={clickRegister} className="text-xl border rounded-full w-full my-3 px-5 py-1 bg-slate-600">Register</button>
                            </div>
                        }

                        {view === 'login' && <Login backToMain={backToMain} handleLogin={handleLogin} />}
                        {view === 'register' && <Register backToMain={backToMain} handleRegistration={handleRegistration} />}
                    </div>

                </div>
            </div>

        </>
    );
}

export default Authentication;