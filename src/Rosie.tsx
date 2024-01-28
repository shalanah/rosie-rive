import { useEffect } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  EventType,
  EventCallback,
} from "@rive-app/react-canvas-lite";
import { useState } from "react";
import { useStateContext } from "./hooks/useStateContext";
import { usePrevious } from "./hooks/usePrevious";
import { useVisibilityChange } from "@uidotdev/usehooks";

const src = "assets/rosie (63).riv";
const stateMachines = "State Machine 1";
const artboard = "rosie animation blue";
const layout = new Layout({ fit: Fit.Contain, alignment: Alignment.Center });

// TODO: move use effects into hooks?
export const Rosie = () => {
  const { replay, sound, setLoaded, audioBeep, audioBg, audioWalking } =
    useStateContext();
  const prevReplay = usePrevious(replay);
  const [hover, setHover] = useState(false);
  const [animation, setAnimation] = useState(["start"]);
  const [clicked, setClicked] = useState(false);
  const documentVisible = useVisibilityChange();

  const { rive, RiveComponent } = useRive({
    src,
    stateMachines,
    artboard,
    layout,
    autoplay: false,
    onLoad: () => {
      setLoaded(true);
    },
  });

  // Event listeners
  useEffect(() => {
    const onRiveEvent: EventCallback = (event) => {
      switch (((event?.data as { name: string })?.name as string) || "") {
        case "Event Exit":
          return setHover(false);
        case "Event Enter":
          return setHover(true);
        case "Event Click":
          return setClicked(true);
        // case "Event Click Anim End": // - not reliable yet
        //   return setClicked((v) => --v);
        default:
          return;
      }
    };
    const onRiveStateChange: EventCallback = (event) => {
      return setAnimation(event.data as [string]);
    };
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEvent);
      rive.on(EventType.StateChange, onRiveStateChange);
    }
    return () => {
      if (rive) rive.removeAllRiveEventListeners();
    };
  }, [rive]);

  // 🖱️ Cursor
  useEffect(() => {
    const isHovering = hover && animation.includes("interactive");
    document.body.classList[isHovering ? "add" : "remove"]("cursor-pointer");
  }, [hover, animation]);

  // 🔊 Beep beep click
  useEffect(() => {
    if (clicked && animation.includes("interactive") && audioBeep) {
      audioBeep.currentTime = 0;
      audioBeep.volume = 1;
      audioBeep.play();
    }
    if (clicked) setClicked(false); // no matter what, reset clicked
  }, [animation, audioBeep, clicked]);

  // 🔊 Volume + volume toggle - cannot set volume on iOS have to mute
  useEffect(() => {
    if (audioWalking && audioBg && audioBeep) {
      audioWalking.muted = !sound;
      audioBg.muted = !sound;
      audioBeep.muted = !sound;
    }
  }, [sound, audioWalking, audioBg, audioBeep]);

  // 🔊 Background
  const clickedStart = replay !== 0;
  useEffect(() => {
    // Start background music
    if (clickedStart && audioBg) {
      audioBg.currentTime = 0;
      audioBg.volume = 0.25;
      audioBg.play();
      audioBg.loop = true;
    }
  }, [audioBg, clickedStart]);
  useEffect(() => {
    // Pause audio when tab is not visible
    if (clickedStart) audioBg?.[documentVisible ? "play" : "pause"]();
  }, [documentVisible, audioBg, clickedStart]);

  // 🏁 Start animation
  useEffect(() => {
    if (replay !== 0 && prevReplay !== replay && rive && audioWalking) {
      // 🤖 enter
      rive.reset({
        artboard,
        stateMachines,
        autoplay: true,
      });
      rive.play();
      // 🔊 entrance sound
      audioWalking.currentTime = 0;
      audioWalking.volume = 1;
      audioWalking.play();
    }
  }, [rive, replay, audioWalking, sound, prevReplay]);
  return <RiveComponent />;
};
