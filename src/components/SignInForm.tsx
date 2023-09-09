import React, { useState } from 'react'
import TextInput from './elements/TextInput'
import Link from 'next/link'
import { signIn } from "next-auth/react";
import PasswordField from './elements/PasswordField'
import { useFormik } from 'formik'
import { signinSchema } from '~/utils/validations/authClient';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';


const SignInForm = () => {
    const [errorMsg, setErrorMsg] = useState("")
    const router = useRouter()
    const { values, handleBlur, handleChange, errors, handleSubmit, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (value) => {
            const log = await signIn('credentials', {
                username: value.email,
                password: value.password,
                redirect: false,
            })

            if (log?.error === "CredentialsSignin") {
                setErrorMsg("email or password is wrong")
                console.log(log)
                router.push('/')
            } else {
                toast.success('sign successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(()=> {
                    router.push('/store')
                }, 5000)
                clearTimeout("id")
            }
        },
        validationSchema: signinSchema,
        validateOnBlur: true
    })
    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md flex-1 mx-auto flex flex-col gap-8">
                <h1 className="text-xl lg:text-3xl font-bold text-center">Welcome Back</h1>
                <div className="bg-white flex flex-col gap-5 px-8 py-8 rounded-md shadow-xl">
                    {errorMsg && <span className="italic text-red-500 text-sm lg:text-base py-2 lg:py-3">{errorMsg}</span>}
                    <TextInput errorMsg={errors.email} touched={touched.email} id="email" value={values.email} onChange={handleChange} onBlur={handleBlur} name="email" placeholder="johndoe@gmail.com" label="Email" typeInput="email" />
                    <PasswordField errorMsg={errors.password} touched={touched.password} value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" name="password" placeholder="Passowrd" label="Password" />
                    <button className="bg-gray-950 rounded-md py-2 text-gray-200 text-sm lg:text-base font-medium">Sign in</button>
                </div>
                <Link href={"/signup"} className="text-gray-500 text-center text-sm">Don't havean account?</Link>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default SignInForm
