// ================== All Importrs
import './Login.css'
import React, { useState }         from 'react'
import { Bounce, toast }           from 'react-toastify'
import { useNavigate }             from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = ({ toggleMode, showing }) => {

    // ================= All Hooks
    // Hooks for Email
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    // Hooks for Password
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Trinary Operator
    const [show, setShow] = useState(false)

    // for auth from firebase
    const auth = getAuth()

    // for navigation
    const navigate = useNavigate()

    // for handling submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setEmailError("Please Enter Login Email")
        }

        if (!password) {
            setPasswordError("Please Enter Login Passowrd")
        }

        else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    if(user.emailVerified == false){
                        // toastyfy animation for not varified
                        toast.error('Email is not Verified ☹️', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }

                    else{
                        navigate("/Home")
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    if (errorCode == "auth/invalid-credential") {

                        // toastyfy animation for wrong input
                        toast.error('Soemthing Went Wrong! 🤷🤷', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }
                });

        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className={`loginSection ${showing ? "translate-x-[400px] duration-200 pointer-events-none" : "translate-x-0 duration-[1.2s]"}`}>
                <ul className='loginCol'>
                    <h1>Login</h1>

                    <ul className="loginInput">
                        <input onChange={(e) => { setEmail(e.target.value), setEmailError("") }} type="email" placeholder='Email...' />
                        <li>{emailError}</li>
                    </ul>

                    <ul className="loginPasswordInput">
                        <input onChange={(e) => { setPassword(e.target.value), setPasswordError("") }} type={show ? "text" : "password"} placeholder='Password...' />
                        <li>{passwordError}</li>
                        <button type='button' onClick={() => setShow(!show)} className='loginPassShow'>
                            {
                                show ? <FaRegEye /> : <FaRegEyeSlash />
                            }
                        </button>
                    </ul>

                    <button className='loginButton'>Login</button>
                    <ul className='noAccount'>
                        Don't Have Account? Go to <li onClick={toggleMode}>Register</li>
                    </ul>
                </ul>

            </form>

            {/* information */}
            <ul className={`loginInfoCol ${showing ? "left-[-400px] duration-200" : "left-5 duration-1000"}`}>
                <h2>Welcome</h2>
                <p>Please Login From Here. <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quas. Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </ul>
        </>
    )
}

export default Login