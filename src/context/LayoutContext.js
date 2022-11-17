import { createContext, useState } from "react";

export const LayoutContext = createContext()

export default function LayoutProvider ({children}) {  
  const [open, setOpen] = useState(false) 
  return (
    <LayoutContext.Provider value={{open, setOpen}}>{children}</LayoutContext.Provider>
  )
}