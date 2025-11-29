import { createContext, useContext, useState, useEffect } from 'react';

type SoundContextType = {
  isSoundEnabled: boolean;
  toggleSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Optional: Persist sound preference
  useEffect(() => {
    const stored = localStorage.getItem('sound-enabled');
    if (stored !== null) {
      setIsSoundEnabled(stored === 'true');
    }
  }, []);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem('sound-enabled', String(newValue));
      return newValue;
    });
  };

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundSettings() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSoundSettings must be used within a SoundProvider');
  }
  return context;
}
