'use client'

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react'

import 'styles/UserRegistration/UserRegistration.css';

import { BsChevronLeft, BsFacebook } from 'react-icons/bs';
import { FaPlaneDeparture } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { BasicInfo } from '../../../components/UserRegistration/BasicInfo';
import { AdditionalInfo } from '../../../components/UserRegistration/AdditionalInfo';
import { AddressInfo } from '../../../components/UserRegistration/AddressInfo';
import { SignupInfo } from '../../../components/UserRegistration/SignupInfo';
import { FormData } from 'components/UserRegistration/IFormData';
import { useRouter } from 'next/navigation';


const registerEndpointUrl = "https://codefact.udea.edu.co/modulo-01/public/api/auth/register"
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Form = () => {

    const router =useRouter()
    const { data: session } = useSession()

    const [isPasswordValid, setValidSignup] = useState(true)

    const [page, setPage] = useState(0);
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

    const [formData, setFormData] = useState<FormData>({
        cc: "",
        idType: "",
        firstname: "",
        lastname: "",
        password: "",
        mail: session?.user ? session.user.email as string : "",
        country: "",
        province: "",
        city: "",
        residence: "",
        phone: "",
        birthdate: "",
        role: "user"
    });




    const sendRegisterRequest = async () => {
        const infoRegistro = {
            cc: formData.cc,
            idType: formData.idType,
            firstname: formData.firstname,
            lastname: formData.lastname,
            password: formData.password,
            mail: formData.mail,
            country: formData.country,
            province: formData.province,
            city: formData.city,
            residence: formData.residence,
            phone: formData.phone,
            birthdate: formData.birthdate,
            role: "user"
        }
        console.log("info registro", infoRegistro)
        try {
            const respuesta = await fetch(registerEndpointUrl, {
                headers: {
                "Content-Type":"application/json"
                },
                method: 'POST',
                body: JSON.stringify(infoRegistro)             
              })
              console.log(respuesta.status)
              if(respuesta.status === 201){
                alert('Registro exitoso');
                router.push('/auth-a/Login')
              }
        }
        catch (e) {

        }
    }


    // Update email field in formData when session data changes
    useEffect(() => {
        if (session?.user) {
            setFormData(prevState => ({
                ...prevState,
                mail: session.user ? session.user.email as string : ""
            }));
        }
    }, [session]);

    function validateWindowSize(invalidPassword: React.JSX.Element, validPassword: React.JSX.Element) {
        if (windowWidth > 1100) {
            if (page > 1) {
                if (!isPasswordValid) {
                    return (invalidPassword)
                } else {
                    return (validPassword)
                }
            }
        } else {
            if (page == 3) {
                if (!isPasswordValid) {
                    return (invalidPassword)
                } else {
                    return (validPassword)
                }
            }
        }
    }

    const passwordAlertDisplay = () => {

        if (!session?.user) {

            const invalidPassword = (<div>
                <p className='font-semibold'>Contraseña no válida, verifica que:</p>
                <ul className='text-neutral-500'>
                    <li>Presente al menos 8 caracteres</li>
                    <li>Presente al menos 1 caracter especial</li>
                    <li>Presente al menos 1 letra mayúscula</li>
                    <li>Presente al menos 1 letra minúscula</li>
                </ul>
            </div>)

            const validPassword = (<div className='font-semibold'>Contraseña válida</div>)
            return validateWindowSize(invalidPassword, validPassword);


        }

    }

    const PageDisplay = () => {



        if (windowWidth > 1100) {
            if (page <= 1) {
                return (
                    <>
                        <BasicInfo formData={formData} setFormData={setFormData} />
                        <AdditionalInfo formData={formData} setFormData={setFormData} />
                    </>
                )
            } else {
                return (
                    <>
                        <AddressInfo formData={formData} setFormData={setFormData} />
                        <SignupInfo formData={formData} setFormData={setFormData} thridPartySession={session} setValidSignup={setValidSignup} />
                    </>
                )
            }
        }

        if (page === 0) {
            return <BasicInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <AdditionalInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 2) {
            return <AddressInfo formData={formData} setFormData={setFormData} />;
        } else {
            return <SignupInfo formData={formData} setFormData={setFormData} thridPartySession={session} setValidSignup={setValidSignup} />;
        }
    };

    function nextPage() {

        if (windowWidth > 1100) {
            if (page >= 2) {
                if (validateSignup()) {
                    console.log(JSON.stringify(formData));
                    sendRegisterRequest();
                }

            } else {
                setPage(page + 2)
            }


        } else {
            if (page === 3) {
                if (validateSignup()) {
                    console.log(JSON.stringify(formData));
                    sendRegisterRequest();
                }
            } else {
                setPage(page + 1)
            }
        }

    }

    function validatePage() {
        if (page <= 1) {
            alert("hallo, you're at the start")
        } else {
            setPage(page - 2)
        }
    }

    function validateEmptyPage() {
        if (page === 0) {
            alert("hallo, you're at the start")
        } else {
            setPage(page - 1)
        }
    }

    function prevPage() {
        if (windowWidth > 1100) {
            validatePage();
        } else {

            validateEmptyPage();

        }
    }


    function verifyObjectFilled(objeto: Record<string, string>, isGoogleAuthenticated: any = false): boolean {
        console.log(objeto);


        for (const clave in objeto) {
            // Skip checking password and confirmPassword fields if user is Google authenticated
            if ((clave === 'password' || clave === 'confirmPassword') && isGoogleAuthenticated) {
                continue;
            }
            if (!objeto[clave]) {
                return false;
            }
        }
        return true;
    }

    const validateSignup = () => {


        if (!verifyObjectFilled(formData, session?.user)) {
            alert("Por favor llenar todos los campos")
            return false
        }

        if (!EMAIL_REGEX.test(formData.mail)) {
            alert("El campo email no cumple con el formato adecuado")
            return false
        }

        if (!session?.user) {
            if (formData.password !== formData.confirmPassword) {
                alert("La contraseña no coincide")
                return false
            }

            if (!isPasswordValid) {
                alert("La contraseña no es válida")
                return false
            }

        }

        return true

    }

    function chooseButtonText() {
        return page >= 2 ? "Registrarse" : "Continuar";
    }

    function chooseButtonText2() {
        return page === 3 ? "Registrarse" : "Continuar";
    }
    return (
        <div className='main-container h-screen w-full bg-cover text-black flex justify-center items-center'>
            <div className='form-container bg-white flex flex-col min-h-[65%] max-h-[90%] w-[70%] xl:w-full justify-between items-center rounded-2xl py-5 gap-4'>
                <div id='header' className='h-[12%] flex justify-center align-middle'>
                    <button id='header-back-btn' onClick={prevPage} className='flex justify-between items-center w-44'>
                        <BsChevronLeft />
                        <h2>Registrarse</h2>
                        <FaPlaneDeparture />
                    </button>
                </div>
                <div className='flex flex-col gap-4 w-[80%]'>
                    <div id='body' className='bg-white flex justify-center h-[60%]  gap-7 text-sm '>
                        {PageDisplay()}
                    </div>
                    {passwordAlertDisplay()}
                </div>
                <div id='footer' className='flex justify-evenly h-[12%] w-[70%] items-center'>
                    <div className='w-full' hidden={windowWidth > 1100 ? (page > 1) : (page !== 0)} id="registration-methods-container">
                        <div className='w-full flex justify-center gap-3'>
                            <button onClick={() => (signIn())} className='registration-method-btn mx-1 outline rounded-full outline-1 outline-offset-2 outline-gray-700'>
                                <FcGoogle className='text-[28px] hover:scale-105 ' />
                            </button>

                            <button className='registration-method-btn mx-1 outline rounded-full outline-1 outline-offset-2 outline-gray-700'>
                                <BsFacebook onClick={() => (signIn())} className='text-[28px] hover:scale-105' />
                            </button>
                        </div>
                    </div>
                    <div className='w-full flex justify-center'>

                        <button className='nav-btn' onClick={nextPage}>{windowWidth > 1100 ? chooseButtonText() : chooseButtonText2()}</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Form;

function key(key?: IArguments): boolean {
    throw new Error('Function not implemented.');
}
