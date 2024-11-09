// ================== All Importrs
import                                  './Register.css'
import React, { useState }         from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { Bounce, toast }           from 'react-toastify';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";


const Register = ({ toggleMode, showing }) => {

    // ================= All Hooks
    // Hooks for Email
    const [email,      setEmail]      = useState('')
    const [emailError, setEmailError] = useState('')

    // Hooks for Password
    const [password,      setPassword]      = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Hooks For Re-Passwoard
    const [rePassword,      setRePassword]      = useState('')
    const [rePasswordError, setRePasswordError] = useState('')

    // Trinary Operator
    const [show,   setShow]   = useState(false)
    const [reShow, setReShow] = useState(false)

    // for auth from firebase
    const auth = getAuth();

    // for handling submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email) {
            setEmailError("Please Write Your Email")
        }

        if (!password) {
            setPasswordError("Please Write Your Password")
        }

        if (!rePassword) {
            setRePasswordError("Please Re Write Your Password")
        }

        if (rePassword !== password) {
            setRePasswordError("Re Enter Password Correctly")
        }

        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    // user
                    const user = userCredential.user;

                    // -------------- Email Verification Send  
                    sendEmailVerification(auth.currentUser)
                        .then(() => {

                            // toastyfy animation for sending verification
                            toast.success('Email Verification Send!', {
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
                        });
                })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // -------------- If Already Have an Account with the given Email 
                    console.log(error.code)
                    if (errorCode == 'auth/email-already-in-use') {
                        toast.error('Email Already in Use', {
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

                    // -------------- If Password is weak or lower than 6 charecter
                    if (errorCode == 'auth/weak-password'){
                        setPasswordError("Weak Password. Use 6+ charecter")
                    }
                });
        }
    }


    return (
        <>
            {/* ========================== Register Form ========================== */}

            <form onSubmit={handleSubmit} className={`registerSection ${showing ? "translate-x-[-400px] duration-200 pointer-events-none" : "translate-x-0 duration-[1.2s]"}`}>

                <ul className='registerCol'>
                    <h1>Register</h1>

                    {/* email input */}
                    <ul className="emailPart">
                        <input onChange={(e) => { setEmail(e.target.value), setEmailError("") }} type="email" placeholder='Email...' />
                        <li>{emailError}</li> {/* email error */}
                    </ul>

                    {/* password input */}
                    <ul className="passwordPart">
                        <input onChange={(e) => { setPassword(e.target.value), setPasswordError("") }} type={show ? "text" : "password"} placeholder='Password...' />
                        <li>{passwordError}</li> {/* password error */}
                        <button type='button' onClick={() => setShow(!show)} className='passShow'>
                            {
                                show ?
                                    <FaRegEye />
                                    :
                                    <FaRegEyeSlash />
                            }
                        </button>
                    </ul>

                    {/* re-password input */}
                    <ul className="repasswordPart">
                        <input onChange={(e) => { setRePassword(e.target.value), setRePasswordError("") }} type={reShow ? "text" : "password"} placeholder='Re-Password...' />
                        <li>{rePasswordError}</li> {/* re-password error */}
                        <button type='button' onClick={() => setReShow(!reShow)} className='rePassShow'>
                            {
                                reShow ?
                                    <FaRegEye />
                                    :
                                    <FaRegEyeSlash />
                            }
                        </button>
                    </ul>

                    {/* reguster button */}
                    <button className='registerButton'>Register</button>

                    {/* to go to Login page */}
                    <ul className='haveAccount'>
                        Already Have Account? Go to <li onClick={toggleMode}>Login</li>
                    </ul>
                </ul>

            </form>

            {/* information */}
            <ul className={`registerInfoCol ${showing ? "translate-x-[400px] duration-200" : "right-0 duration-1000"}`}>
                <h2>Welcome</h2>
                <p>Please Register From Here. <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, quas. Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </ul>
        </>
    )
}

export default Register