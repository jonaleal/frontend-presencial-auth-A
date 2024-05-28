'use client'

import React, { useEffect, useState } from 'react';

import 'styles/UserRegistration/UserRegistration.css';

import { CiLock } from "react-icons/ci";

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
        newPassword: "", 
        confirmPassword: "" 
    });
    
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

    return (
        <div className='main-container h-screen bg-cover text-black flex justify-center items-center'>
            <div id='register' className='form-container bg-white flex flex-col h-[55%] w-[30%] justify-around items-center rounded-2xl py-5 '>
                
                <div id='logo' className='flex justify-center align-middle rounded-l-2xl'>
                    <CiLock className='text-otro-azul text-8xl' />
                </div>
    
                <div className='flex-col mr-5 ml-5'>
                    <h2 className='text-xl font-bold text-center'>Reestablecer contraseña</h2>
                </div>
    
                <div className='mb-2 mx-auto flex flex-col'>
                    <label>Nueva contraseña</label>
                    <input
                        type="password" 
                        id="newPassword" 
                        name="newPassword" 
                        value={formData.newPassword} 
                        required 
                        style={{border: '2px solid gray'}}
                        className="border-b border-gray-600 p-1 mb-1 w-72"
                        onChange={handleChange} 
                    />            
                </div>

                <div className='mb-2 mx-auto flex flex-col'>
                    <label>Confirmar contraseña</label>
                    <input
                        type="password" 
                        id="NewPassword" 
                        name="NewPassword" 
                        value={formData.confirmPassword} 
                        required 
                        style={{border: '2px solid gray'}}
                        className="border-b border-gray-600 p-1 mb-1 w-72"
                        onChange={handleChange} 
                    />            
                </div>

                <div>
                    <button className='nav-btn2 flex items-center justify-center text-center ml-[auto] mb-3'>Enviar</button>
                    
                </div>
    
            </div>
        </div>
    );
    
}

export default Form;