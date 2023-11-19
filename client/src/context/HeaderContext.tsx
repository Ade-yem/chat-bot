import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

type ScrollContextType = number | null;
const ScrollContext = createContext<ScrollContextType>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const [scrollPos, setScrollPos] = useState<ScrollContextType>(null);

  const handleScroll = () => {
    setScrollPos(window.pageYOffset);
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollPos}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
    return useContext(ScrollContext);
  };
  