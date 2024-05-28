import { InputField } from "./InputField"

type InputWLabelProps = {
    type: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    placeholder?: string,
    id: string,
    label: string,
    disabled?: boolean
}

const InputWLabel = ({ type, value, onChange, placeholder, id, label, disabled}: InputWLabelProps) => {
    return (
        <div>
            <label className="text-base font-semibold">
                {label}
            </label>
            <InputField
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? ''}
                id={id}
                disabled={disabled}
            />
        </div>
    )
}

export { InputWLabel }
