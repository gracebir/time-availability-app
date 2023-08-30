import React from 'react'

type InputProps = {
    id: string
    label: string
    placeholder: string
    name: string
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    value?: string | number
    typeInput: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    touched?: boolean
    errorMsg?: string | undefined;
}

const TextInput = ({ id, label, placeholder, onBlur, value, typeInput, name, touched, errorMsg, onChange }: InputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label className='font-bold text-gray-700 text-sm lg:text-base' htmlFor={name}>{label}</label>
            <input
                onBlur={onBlur}
                className={`outline-none w-full py-2 px-3 bg-very-dark text-white-color text-sm lg:text-base rounded-md border ${touched === true && errorMsg ? 'border-red-800' : 'border-gray-400'} hover:border-gray-600 placeholder:text-gray-400`}
                type={typeInput}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                id={id} />
            {errorMsg && touched && <span className='italic text-sm font-thin text-red-800'>{errorMsg}</span>}
        </div>
    )
}

export default TextInput