"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type PerfilType = "cliente" | "voluntario" | null;

type PerfilContextType = {
  perfil: PerfilType;
  setPerfil: (p: PerfilType) => void;
};

const defaultContext: PerfilContextType = {
  perfil: null,
  setPerfil: () => {},
};

const PerfilContext = createContext<PerfilContextType>(defaultContext);

export const PerfilProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [perfil, setPerfilState] = useState<PerfilType>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("perfil") || localStorage.getItem("perfilAtivo");
      if (stored === "cliente" || stored === "voluntario") {
        setPerfilState(stored as PerfilType);
      }
    } catch (e) {
      
    }
  }, []);

  const setPerfil = React.useCallback((p: PerfilType) => {
    try {
      if (p) {
        localStorage.setItem("perfil", p);
        
        localStorage.setItem("perfilAtivo", p);
      } else {
        localStorage.removeItem("perfil");
        localStorage.removeItem("perfilAtivo");
      }
    } catch (e) {
      
    }
    setPerfilState(p);
  }, []);

  return <PerfilContext.Provider value={{ perfil, setPerfil }}>{children}</PerfilContext.Provider>;
};

export function usePerfil() {
  return useContext(PerfilContext);
}

export default PerfilContext;
