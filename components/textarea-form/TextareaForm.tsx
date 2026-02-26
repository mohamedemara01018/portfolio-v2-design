import React, { ChangeEvent } from 'react'


interface TextareaFormProbs {
    id: string,
    label: string,
    placeholder: string,
    name: string,
    value: string,
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function TextareaForm({ id, label, placeholder, name, value, handleChange }: TextareaFormProbs) {
    return (
        <div className='flex flex-col items-start gap-1 w-full'>
            <label htmlFor={id} >{label}</label>
            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) '>
            </textarea>
        </div>
    )
}

export default TextareaForm