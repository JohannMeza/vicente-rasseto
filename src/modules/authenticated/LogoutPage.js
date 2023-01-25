import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuthContext';
export default function LogoutPage () {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // navigate("/login")
    logout() 
  }, [logout])
  return null
}