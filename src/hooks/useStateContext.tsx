import React, {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import mp3Walking from "../assets/walking_mixdown8.mp3";
import mp3Beep from "../assets/beep-beep_mixdown2.mp3";
import mp3Bg from "../assets/Mellow-Mind_Looping.mp3";
import Bowser from "bowser";

interface StateContextInterface {
  playing: boolean;
  sound: boolean;
  replay: number;
  loaded: boolean;
  audioWalking: HTMLAudioElement | null;
  audioBg: HTMLAudioElement | null;
  audioBeep: HTMLAudioElement | null;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSound: React.Dispatch<React.SetStateAction<boolean>>;
  setReplay: React.Dispatch<React.SetStateAction<number>>;
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

// Game state... could probably be broken out into smaller files / hooks
export const StateContext = createContext<StateContextInterface | null>(null);
export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const platform = browser.getPlatform();
  const iOSShite = platform.type !== "desktop" && platform.vendor === "Apple"; // iOS webkit is 💩

  // TODO: Maybe as a reducer instead?
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(true);
  const [replay, setReplay] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [soundLoaded, setAudioLoaded] = useState(
    iOSShite ? [true] : [false, false, false] // iOS not reliable with canplaythrough or canplay events
  );

  const [audioWalking, setAudioWalking] = useState<HTMLAudioElement | null>(
    () => new Audio(mp3Walking)
  );
  const [audioBg, setAudioBg] = useState<HTMLAudioElement | null>(
    () => new Audio(mp3Bg)
  );
  const [audioBeep, setAudioBeep] = useState<HTMLAudioElement | null>(
    () => new Audio(mp3Beep)
  );

  useEffect(() => {
    // iOS not reliable with canplaythrough (especially iPhone) - not surprising because iOS webkit is 💩
    // if (!iOSShite) {
    const beepCanPlay = () =>
      setAudioLoaded((prev) => [true, prev[1], prev[2]]);
    const bgCanPlay = () => setAudioLoaded((prev) => [prev[0], true, prev[2]]);
    const walkingCanPlay = () =>
      setAudioLoaded((prev) => [prev[0], prev[1], true]);
    audioBeep?.addEventListener("canplaythrough", beepCanPlay);
    audioBg?.addEventListener("canplaythrough", bgCanPlay);
    audioWalking?.addEventListener("canplaythrough", walkingCanPlay);
    if (iOSShite) {
      audioBeep?.load();
      audioBg?.load();
      audioWalking?.load();
    }
    return () => {
      audioBeep?.removeEventListener("canplaythrough", beepCanPlay);
      audioBg?.removeEventListener("canplaythrough", bgCanPlay);
      audioWalking?.removeEventListener("canplaythrough", walkingCanPlay);
    };
    // }
  }, [audioBeep, audioBg, audioWalking, iOSShite]);

  useEffect(() => {
    // cleanup audio
    return () => {
      setAudioWalking(null);
      setAudioBg(null);
      setAudioBeep(null);
    };
  }, []);

  return (
    <StateContext.Provider
      value={{
        playing,
        sound,
        replay,
        loaded: loaded && soundLoaded.every((v) => v),
        audioWalking,
        audioBg,
        audioBeep,
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
