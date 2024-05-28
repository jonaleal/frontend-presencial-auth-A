import React from 'react';

import { FormData } from './IFormData';
import { InputWLabel } from 'components/components-Auth-a/InputWLabel';
import { SelectInput } from 'components/components-Auth-a/SelectInput';

interface BasicInfoProps {
    formData: FormData,
    setFormData: Function
}

const idTypeOptions = [
    { label: 'Cédula de Ciudadanía', value: 'CC' },
    { label: 'Cédula de Extranjería', value: 'CE' },
    { label: 'Tarjeta de Identidad', value: 'TI' },
    { label: 'Pasaporte', value: 'PAS' },
]

const ONLY_LETTERS_REGEX = /^[a-zA-Z\sáéíóúÁÉÍÓÚüñÑ]+$/u;
const BasicInfo = ({ formData, setFormData }: BasicInfoProps) => {
    return (
        <div className='form-fields-container gap-4 w-full'>
            <InputWLabel
                label='Nombres'
                id='first-name-input'
                placeholder='John'
                type='txt'
                value={formData.firstname}
                onChange={(e) => {
                    if (ONLY_LETTERS_REGEX.test(e.target.value) || e.target.value === '') {
                        setFormData({ ...formData, firstname: e.target.value })
                    }
                }}
            />
            <InputWLabel
                label='Apellidos'
                id='last-name-input'
                placeholder='Doe'
                type='text'
                value={formData.lastname}
                onChange={(e) => {
                    if (ONLY_LETTERS_REGEX.test(e.target.value) || e.target.value === '') {
                        setFormData({ ...formData, lastname: e.target.value })
                    }
                }}
            />
            <SelectInput
                label='Tipo de documento'
                onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                selectedValue={formData.idType}
                options={idTypeOptions}
            />
            <InputWLabel
                label='Número de identification'
                id='identification-input'
                placeholder='000000000'
                type='number'
                value={formData.cc}
                onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
            />
        </div>
    );
}

export { BasicInfo };