'use client'

import React, { useEffect, useState } from 'react';

import 'styles/UserRegistration/UserRegistration.css';

import { BsChevronLeft } from 'react-icons/bs';
import { FaPlaneDeparture } from "react-icons/fa";


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

    interface FormData{
        token: string;
    }

    const [formData, setFormData] = useState({
        token: " ",
        checkTerms: false,
        mData: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFormData(e);
    };;

    function handleFormData(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, checked} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: checked
        }));
    }

    const handleChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFormData(e);
    };;

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className='main-container h-screen bg-cover text-black flex justify-center items-center'>
            <div id='register' className='form-container bg-white flex flex-col h-[55%] w-[30%] justify-around items-center rounded-2xl py-5 bg-'>
                <div id='header' className='h-[10%] flex justify-center align-middle'>
                    <button id='header-back-btn' className='flex justify-start gap-2'>
                        <BsChevronLeft className='ml-4'/>
                        <h2 className='-mt-1'>Registrarse</h2>
                        <FaPlaneDeparture/>
                    </button>
                </div>
                    <div className='h-[10%] inset-y-0 left-0 w-[96%]  bg-white flex place-items-start '>
                        <h2 className='text-sm text-center mx-auto  mt-0.1'>Muy pronto te llegará un código a tu correo</h2>
                    </div>
                        <div>
                        <input
                            placeholder='Ingresa el código'
                            type='number'
                            id='token'
                            name='token'
                            value={formData.token}
                            required
                            className='border-b border-gray-600 text-center w-72'
                            onChange={handleChange2}
                        />
                        </div>
                        <div id="terms" className="ml-5 h-[5%] flex items-baseline justify-left text-center flex-row w-[75%]">
                            <input 
                            type='checkbox' 
                            id='termsC' 
                            name='checkTerms' 
                            checked={formData.checkTerms}  
                            onChange={handleChange}
                            />
                            <label htmlFor="termsC" className="text-sm ml-2 mb-3">Aceptar<button className='text-otro-azul text-sm ml-1 -mt-6 mb-1'>terminos y condiciones de uso</button></label>

                        </div> 
                        <div id="mdata" className="ml-5 flex items-baseline justify-left text-center flex-row w-[75%]">
                            <input 
                            type='checkbox' 
                            id='mData' 
                            name='mData' 
                            checked={formData.mData}  
                            onChange={handleChange3}
                            />
                            <label htmlFor="mData" className="text-sm ml-2 mb-3">Aceptar<button className='text-otro-azul text-sm ml-1 -mt-6 mb-1'>tratamiento de datos</button></label>

                        </div>
                        <div className=" flex items-baseline justify-left text-center flex-row gap-20">
                             <button className='nav-btn3 flex items-center justify-center text-center ml-[auto] mb-3 ' >Regresar</button>
                             <button className='nav-btn3 flex items-center justify-center text-center ml-[auto] mb-3 ' >Continuar</button>
                        </div>
                        
            </div>
        </div>
    );
}

export default Form;