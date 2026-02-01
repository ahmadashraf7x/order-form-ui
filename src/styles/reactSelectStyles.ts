import { StylesConfig } from "react-select";

export const customStyles: StylesConfig<any, false> = {
    control: (base: any, state: any) => ({
        ...base,
        borderRadius: '0.375rem',
        borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
        boxShadow: 'none',
        '&:hover': {
            borderColor: state.isFocused ? '#3b82f6' : '#9ca3af',
        },
        minHeight: '38px',
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#111827',
        fontWeight: '500',
        fontSize: '0.875rem',
    }),
    placeholder: (base: any) => ({
        ...base,
        color: '#9ca3af',
        fontSize: '0.875rem',
    }),
    option: (base: any, state: any) => ({
        ...base,
        fontSize: '0.875rem',
        backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
        color: state.isSelected ? 'white' : '#111827',
        cursor: 'pointer',
    }),
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
};