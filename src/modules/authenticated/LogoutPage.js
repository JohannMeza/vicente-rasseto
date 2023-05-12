import { useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
export default function LogoutPage () {
  const { logout } = useAuthContext();
  useEffect(() => logout(), [logout])
  return null
}