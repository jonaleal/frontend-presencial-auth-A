'use client'

import React, { useEffect, useState } from 'react';

import 'styles/UserRegistration/UserRegistration.css';

import { PiSealWarningLight } from "react-icons/pi";
import { BsChevronLeft } from 'react-icons/bs';

const Form = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
    
      setWindowWidth(document.documentElement.clientWidth);
    
      const handleResize = () => {
        setWindowWidth(document.documentElement.clientWidth);
      };
    
      window.addEventListener("resize", handleResize);
    

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const [formData, setFormData] = useState({
        email:"",

    });

    const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    return (
        <div className='main-container h-screen bg-cover text-black flex justify-center items-center'>
            <div id='register' className='form-container bg-white flex flex-col h-[55%] w-[30%] justify-around items-center rounded-2xl py-5 '>
                
                <div id='logo' className='flex justify-center align-middle rounded-l-2xl'>
                    <PiSealWarningLight className='text-otro-azul text-8xl' />
                </div>
    
                <div className='flex-col mr-5 ml-5'>
                    <h2 className='text-xl font-bold text-center'>¿Olvidó su contraseña?</h2>
                    <h3 className='text-sm text-center mt-3'>Ingrese su correo electrónico y recibirá un link para reestablecer su contraseña</h3>
                </div>
    
                <div className='mb-2 mx-auto'>
                    <input
                        placeholder='john@gmail.com'
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{border: '2px solid gray'}}
                        className="border-b border-gray-600 p-1 mb-1 w-72"
                    />            
                </div>
    
                <div>
                    <button className='nav-btn2 flex items-center justify-center text-center ml-[auto] mb-3'>Enviar</button>
                    
                </div>

                <div className='flex-row'>
                    <button className='flex justify-center items-center gap-2'>
                        <BsChevronLeft className=''/>Iniciar sesión
                    </button>
                </div>
    
            </div>
        </div>
    );
    
}

export default Form;