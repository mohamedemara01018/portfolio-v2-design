

interface InputFileProbs {
    id: string,
    label: string,
    onClick: () => void
}

function InputFile({ id, label ,onClick }: InputFileProbs) {
    return (
        <div className='flex flex-col items-start gap-1 w-full mt-4'>
            <label htmlFor={id} >{label}</label>
            <input id={id} type="file" className='border border-border py-2 px-4 rounded-md bg-accent w-full focus:outline-(--portfolio-accent) ' />
        </div>
    )
}

export default InputFile