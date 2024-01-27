import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import audioWalking from "../assets/walking_mixdown8.mp3";
import audioBeepBeep from "../assets/beep-beep_mixdown.mp3";
import audioBg from "../assets/Mellow-Mind_Looping.mp3";

interface StateContextInterface {
  playing: boolean;
  sound: boolean;
  replay: number;
  loaded: boolean;
  walkingLoaded: HTMLAudioElement | null;
  bgLoaded: HTMLAudioElement | null;
  beepBeepLoaded: HTMLAudioElement | null;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
  setReplay: React.Dispatch<React.SetStateAction<number>>;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

// Game state... could probably be broken out into smaller files / hooks
export const StateContext = createContext<StateContextInterface | null>(null);
export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Maybe as a reducer instead?
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(true);
  const [replay, setReplay] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [soundLoaded, setSoundLoaded] = useState([false, false, false]);

  // TODO: Rename
  const [walkingLoaded, setWalkingLoaded] = useState<HTMLAudioElement | null>(
    () => new Audio(audioWalking)
  );
  const [bgLoaded, setBgLoaded] = useState<HTMLAudioElement | null>(
    () => new Audio(audioBg)
  );
  const [beepBeepLoaded, setBeepBeepLoaded] = useState<HTMLAudioElement | null>(
    () => new Audio(audioBeepBeep)
  );

  useEffect(() => {
    const beepBeepCanPlay = () => {
      setSoundLoaded((prev) => [true, prev[1], prev[2]]);
    };
    const bgCanPlay = () => {
      setSoundLoaded((prev) => [prev[0], true, prev[2]]);
    };
    const walkingCanPlay = () => {
      setSoundLoaded((prev) => [prev[0], prev[1], true]);
    };
    if (beepBeepLoaded && bgLoaded && walkingLoaded) {
      beepBeepLoaded.addEventListener("canplaythrough", beepBeepCanPlay);
      bgLoaded.addEventListener("canplaythrough", bgCanPlay);
      walkingLoaded.addEventListener("canplaythrough", walkingCanPlay);
    }
    return () => {
      if (beepBeepLoaded && bgLoaded && walkingLoaded) {
        beepBeepLoaded.removeEventListener("canplaythrough", beepBeepCanPlay);
        bgLoaded.removeEventListener("canplaythrough", bgCanPlay);
        walkingLoaded.removeEventListener("canplaythrough", walkingCanPlay);
      }
      setSoundLoaded([false, false, false]);
      setWalkingLoaded(null);
      setBgLoaded(null);
      setBeepBeepLoaded(null);
    };
  }, [beepBeepLoaded, bgLoaded, walkingLoaded]);

  return (
    <StateContext.Provider
      value={{
        playing,
        sound,
        replay,
        loaded: loaded && soundLoaded.every((v) => v),
        walkingLoaded,
        bgLoaded,
        beepBeepLoaded,
        setPlaying,
        setSound,
        setReplay,
        setLoaded,
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
