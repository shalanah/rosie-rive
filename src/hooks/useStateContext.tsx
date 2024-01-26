import React, { useContext, createContext, useState, ReactNode } from "react";

interface StateContextInterface {
  playing: boolean;
  sound: boolean;
  replay: number;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
  setReplay: React.Dispatch<React.SetStateAction<number>>;
}

// Game state... could probably be broken out into smaller files / hooks
export const StateContext = createContext<StateContextInterface | null>(null);
export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Maybe as a reducer instead?
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(true);
  const [replay, setReplay] = useState(0);

  return (
    <StateContext.Provider
      value={{
        playing,
        setPlaying,
        sound,
        setSound,
        replay,
        setReplay,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    // Let's yell at ourselves to make sure we use our Provider wrapper
    throw new Error(
      "Oooops, I'm guessing your forgot to use the Provider for this context"
    );
  }
  return context;
};
