import React from 'react';

import { FormData } from './IFormData';
import { InputWLabel } from 'components/components-Auth-a/InputWLabel';

interface AddressInfoProps {
    formData: FormData,
    setFormData: Function
}

const ADDRESS_REGEX = /^[a-zA-Z0-9\s.,#-]+$/;

const AddressInfo = ({ formData, setFormData }: AddressInfoProps) => {
    return (
        <div className='form-fields-container gap-4 w-full'>
            <InputWLabel
                id="country-input"
                label='País'
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder='Colombia'
                value={formData.country}
                type="text"
            />
            <InputWLabel
                id="region-input"
                label='Departamento'
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder='Antioquia'
                type="text"
                value={formData.province}
            />
            <InputWLabel
                id="city-input"
                label='Ciudad'
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder='Medellín'
                type="text"
                value={formData.city}
            />
            <InputWLabel
                id="address-input"
                label='Dirección'
                onChange={(e) => {
                    if (ADDRESS_REGEX.test(e.target.value) || e.target.value === '') {
                        setFormData({ ...formData, residence: e.target.value })
                    }
                }}
                placeholder='Calle 00 #00-00'
                type="text"
                value={formData.residence}
            />
        </div>
    );
}

export { AddressInfo };
