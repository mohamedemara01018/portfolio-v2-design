import React, { ChangeEvent } from 'react'

interface InputFormProbs {
    id: string,
    label: string,
    placeholder: string,
    name: string,
    value: string,
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    type?: string,
    min?: string,
    max?: string
}
function InputForm({ id, label, placeholder, name, value, handleChange, onKeyDown, type = "text", min, max }: InputFormProbs) {
    return (
        <div className='flex flex-col items-start gap-1 w-full'>
            <label htmlFor={id} >{label}</label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                required={true}
                min={min}
                max={max}
                className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) ' />
        </div>
    )
}

export default InputForm