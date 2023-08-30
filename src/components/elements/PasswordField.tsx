import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

type PasswordProps = {
    id: string
    label: string
    placeholder: string
    name: string
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    touched?: boolean
    errorMsg?: string | undefined;
}

const PasswordField = ({ id, label, placeholder, onBlur, value, name, touched, errorMsg, onChange }: PasswordProps) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div className="flex flex-col gap-2">
            <label className='font-bold text-gray-700 text-sm lg:text-base' htmlFor={name}>{label}</label>
            <div className={`border flex rounded-md ${touched === true && errorMsg ? 'border-red-800' : 'border-gray-400'} hover:border-gray-600`}>
                <input
                    onBlur={onBlur}
                    className="outline-none rounded-md border w-full py-2 px-3 text-white-color text-sm lg:text-base  placeholder:text-gray-400"
                    type={show ? "text": "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    id={id} />
                <button className="bg-white outline-none px-6 border-l rounded-r-md border-gray-400" type='button' onClick={()=> setShow(!show)}>
                    {show ? <AiOutlineEyeInvisible size={20}/>: <AiOutlineEye size={20}/>}
                </button>
            </div>
            {errorMsg && touched && <span className='italic text-sm font-thin text-red-800'>{errorMsg}</span>}
        </div>
    )
}

export default PasswordField
