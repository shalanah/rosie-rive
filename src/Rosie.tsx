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

const src = "assets/rosie(37).riv";
const stateMachines = "State Machine 1";
const artboard = "rosie animation blue";
const layout = new Layout({ fit: Fit.Contain, alignment: Alignment.Center });

export const Rosie = () => {
  const { replay, sound, setLoaded, audioBeep, audioBg, audioWalking } =
    useStateContext();
  const prevReplay = usePrevious(replay);
  const [hover, setHover] = useState(false);
  const [animation, setAnimation] = useState(["start"]);
  const [clicked, setClicked] = useState(false);

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
    if (clicked && animation.includes("interactive")) {
      if (audioBeep) {
        audioBeep.currentTime = 0;
        audioBeep.play();
      }
    }
    if (clicked) setClicked(false); // no matter what reset clicked
  }, [animation, audioBeep, clicked]);

  // 🔊 Volume + volume toggle
  useEffect(() => {
    if (audioWalking && audioBg && audioBeep) {
      audioWalking.volume = sound ? 1 : 0;
      audioBg.volume = sound ? 0.15 : 0;
      audioBeep.volume = sound ? 1 : 0;
    }
  }, [sound, audioWalking, audioBg, audioBeep]);

  // 🔊 Background
  useEffect(() => {
    // TODO: Repeat background music
    if (replay === 1 && prevReplay !== replay) {
      if (audioBg) {
        audioBg.currentTime = 0;
        audioBg.play();
        audioBg.loop = true;
      }
    }
  }, [audioBg, replay, prevReplay]);

  // 🏁 Start animation
  useEffect(() => {
    if (replay !== 0 && prevReplay !== replay && rive) {
      // 🤖 enter
      rive.reset({
        artboard,
        stateMachines,
        autoplay: true,
      });
      rive.play();
      // 🔊 entrance sound
      if (audioWalking) {
        audioWalking.currentTime = 0;
        audioWalking.play();
      }
    }
  }, [rive, replay, audioWalking, sound, prevReplay]);
  return <RiveComponent />;
};
