import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

// Define the type for the context value
interface ServiceContextType {
  chosenService: string;
  setChosenService: Dispatch<SetStateAction<string>>;
}

// Initialize the context with a type, but an empty default value
const serviceContext = createContext<ServiceContextType | undefined>(undefined);

// Define props type for ServiceContextProvider
interface ServiceContextProviderProps {
  children: ReactNode;
}

export const ServiceContextProvider: React.FC<ServiceContextProviderProps> = ({ children }) => {
  const [chosenService, setChosenService] = useState<string>('');

  return (
    <serviceContext.Provider value={{ chosenService, setChosenService }}>
      {children}
    </serviceContext.Provider>
  );
};

export { serviceContext };
