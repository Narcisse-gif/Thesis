import { createContext, useContext } from 'react';

export const DarkModeContext = createContext({ dark: false, toggle: () => {} });
export const useDarkMode = () => useContext(DarkModeContext);
