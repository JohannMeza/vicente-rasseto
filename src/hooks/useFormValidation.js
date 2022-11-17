import { useEffect, useState } from 'react';
import ValidateData from './useValidateData';
/**
 * 
 * @param {*} initialState 
 * @param {*} validate 
 * @returns data setData errors setErrors handleInputFormChange resetForm
 */
export const useFormValidation = (initialState = {}, isValidate, validate) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputFormChange = (e) => {
    const {name, value, type, checked} = e.target;
    setData({...data, [name]: (type === 'checkbox') ? checked : value});
    if (isValidate) {
      validate({[name]: value })
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

export const useFormValidationMulti = (initialState = {}, isValidate) => {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputFormChange = (e) => {
    const {name, value, type, checked} = e.target;
    setData({...data, [name]: (type === 'checkbox') ? checked : value});
    if (isValidate) {
      // setErrors({ ...errors, ...validate({[name]: value}) })
      ValidateData({[name]: value}, errors, setErrors)
    }
  }
    
  useEffect(() => {
    setErrors(ValidateData(data, errors, setErrors))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const resetForm = () => {
    setData(initialState);
    setErrors({})
  }

  return [
    data, 
    setData,
    errors,
    setErrors,
    handleInputFormChange,
    resetForm
  ]
}