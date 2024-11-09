// ================== All Importrs
import                          './Authentication.css'
import Login               from '../Login/Login'
import Register            from '../Register/Register'
import React, { useState } from 'react'
import { ToastContainer }  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Authentication = () => {

  // ================= All Hooks
  // Trinary Operator
  const [change, setChange] = useState(false)

  const handleLogin = () => {
    setChange(!change)
  }

  return (
    <>
    <ToastContainer/>
      <section className='authSection'>
        <div className="container">
          <h1>Mubin Authorization</h1>
          <div className="authRow">
            <img src="images/auth_banner_image.svg" alt="banner_image" className='image1' />
            <div className="authCol">
              <img src="images/it_guy.svg" alt="it_guy_image" />
              <ul className="authCard">
                <span className={change ? "translate-x-[-700px] rotate-[-70deg]" : "translate-x-[300px] rotate-[70deg]"}></span>
                <Register showing={change} toggleMode={handleLogin} />
                <Login showing={!change} toggleMode={handleLogin} />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Authentication