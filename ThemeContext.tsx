"use client";

import React, { createContext, useContext, useState } from "react";

type ThemeType = "zombie" | "tree" | "starship" | "ringgates" | "eva";
type ToneType = "mild" | "medium" | "roasted";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  tone: ToneType;
  setTone: (tone: ToneType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "zombie",
  setTheme: () => {},
  tone: "medium",
  setTone: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("zombie");
  const [tone, setTone] = useState<ToneType>("medium");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, tone, setTone }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
