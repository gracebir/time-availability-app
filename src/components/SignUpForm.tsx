import React, { useState } from 'react'
import Link from "next/link";
import { api } from "~/utils/api";
import TextInput from './elements/TextInput';
import PasswordField from './elements/PasswordField';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { signupSchemaClient } from '~/utils/validations/authClient';

const SignUpForm = () => {
  const [errorMsg, setErrorMsg] = useState("")
  const { mutate, error, isError, isLoading, isSuccess } = api.user.register.useMutation();
  const { handleBlur, handleChange, handleSubmit, resetForm, values, errors, touched } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validateOnBlur: true,
    validationSchema: signupSchemaClient,
    onSubmit: async (value) => {
      await mutate(value)
      if (isLoading) {
        toast.loading("loading..")
        resetForm()
      }

      if (isSuccess) {
        toast.success('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push('/')
      }

      if (isError) {
        setErrorMsg(error.message)
      }
    }
  })
  const router = useRouter()
  return (
    <div className='max-w-4xl mx-auto flex flex-col gap-8'>
      <h1 className='text-xl lg:text-3xl font-bold text-center'>Welcome</h1>
      <div className='border shadow-xl w-full rounded-md bg-white flex-1 p-4 grid gap-3 lg:grid-cols-2 sm:grid-cols-1'>
        <form onSubmit={handleSubmit} className='col-span-1'>
          {errorMsg && <span className="italic text-red-500 text-sm lg:text-base py-2 lg:py-3">{errorMsg}</span>}
          <div className='flex flex-col gap-3'>
            <TextInput errorMsg={errors.name} touched={touched.name} value={values.name} onChange={handleChange} onBlur={handleBlur} id="name" name="name" placeholder="e.g John" label="Name" typeInput="text" />
            <TextInput errorMsg={errors.email} touched={touched.email} value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" name="email" placeholder="johndoe@gmail.com" label="Email" typeInput="email" />
            <PasswordField errorMsg={errors.password} touched={touched.password} value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" name="password" placeholder="Type your Password" label="Password" />
            <ul className='list-inside'>
              <li className='text-xs lg:text-sm list-item list-disc'>Mix of uppercase & lowercase letters</li>
              <li className='text-xs lg:text-sm list-item list-disc'>Minimum 8 characters long</li>
              <li className='text-xs lg:text-sm list-item list-disc'>Contain at least 1 number</li>
            </ul>
            <button type='submit' className="bg-gray-950 rounded-md py-2 text-gray-200 text-sm lg:text-base font-medium">Sign up for free</button>
          </div>
        </form>
        <div className='hidden lg:flex col-span-1 bg-gray-800 rounded-md items-center'>
          <div className='flex flex-col gap-6 w-72 mx-auto items-center'>
            <Image src={"/logo.svg"} alt='logo' width={150} height={40} />
            <span className='text-gray-200 text-sm text-center'>Discorved a best way to manage your business availability</span>
          </div>
        </div>
      </div>
      <Link href={"/"} className="text-gray-500 text-center text-base">have an account? Sign In</Link>
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
    </div>
  )
}

export default SignUpForm
