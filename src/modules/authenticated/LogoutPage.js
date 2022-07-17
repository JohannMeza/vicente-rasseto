import { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
export default function LogoutPage () {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout() 
    window.location.reload()
  }, [logout])
  return null
}