import { ChangeEvent } from "react"


interface InputFileProbs {
    id: string,
    label: string,
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function InputFile({ id, label, name, onChange }: InputFileProbs) {
    return (
        <div className='flex flex-col items-start gap-1 w-full mt-4'>
            <label htmlFor={id} >{label}</label>
            <input id={id} type="file" name={name} onChange={onChange} className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) ' />
        </div>
    )
}

export default InputFile