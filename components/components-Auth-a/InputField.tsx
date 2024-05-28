type InputFieldProps = {
    type: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    placeholder:string,
    id:string,
    disabled?:boolean
}

const InputField = ({ type, value, onChange,placeholder,id,disabled=false}: InputFieldProps) => {
    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
                id={id}
                name={id}
                disabled={disabled}
                className="border-b border-gray-600 text-xl placeholder:text-sm  w-full placeholder-gray-600 outline-none"
            />
        </div>
    )
}

export { InputField }