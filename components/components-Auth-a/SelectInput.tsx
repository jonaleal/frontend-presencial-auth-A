import React from 'react'

type SelectInputProps = {
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined,
    selectedValue: string,
    options: { value: string, label: string }[],
    label: string
}

const SelectInput = ({ onChange, selectedValue, options, label }: SelectInputProps) => {
    return (
        <div>
            <label className="text-base font-semibold">
                {label}
            </label>
            <select
                className='w-full text-xl border-l-2 border-t-2 border-r-2 border-white  outline-none'
                name="id-type-dropdown" id="id-type-dropdown" onChange={onChange}>
                <option selected={selectedValue === ""} defaultValue="">Seleccionar</option>
                {options.map((element) => {
                    return (
                        <option key={element.value} selected={element.value == selectedValue}
                            value={element.value}>{element.label}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export { SelectInput }
