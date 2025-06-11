import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SidebarContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
