import { useState } from 'react';

export const useFormValidation = (initialState = {}, validate) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputFormChange = (e) => {
    const {name, value, type, checked} = e.target;
    setData({...data, [name]: (type === 'checkbox') ? checked : value});

    if (validate) {
      validate({[name]: value})
    }
  }
  
  const resetForm = () => {
    setData(initialState);
    setErrors({})
  }

  return {
    data, 
    setData,
    errors,
    setErrors,
    handleInputFormChange,
    resetForm
  }
}