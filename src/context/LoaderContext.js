import React, { createContext, useCallback, useMemo, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const LoaderContext = createContext()

export default function LoadingPageProvider({children}) {
  const [loader, setLoader] = useState(false)

  // const handleLoader = (value) => {
  //   setLoader(false);
  // };

  const handleLoader = useCallback((value) => {
    setLoader(value);
  }, []);

  // const value = useMemo(() => ({
  //   handleLoader
  // }), [handleLoader])

  return (
    <LoaderContext.Provider value={handleLoader}>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoaderContext.Provider>
  );
}