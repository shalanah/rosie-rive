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

const src = "assets/rosie(29).riv";
const stateMachines = "State Machine 1";
const artboard = "rosie animation blue";
const layout = new Layout({ fit: Fit.Contain, alignment: Alignment.Center });

export const Rosie = () => {
  const { replay, sound, setLoaded, beepBeepLoaded, bgLoaded, walkingLoaded } =
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
    // TODO: Split into 2 event listeners
    const riveEventHandler: EventCallback = (event) => {
      switch (event.type) {
        case EventType.StateChange: {
          const data = event.data as [string];
          setAnimation(data);
          return;
        }
        case EventType.RiveEvent: {
          const { name } = event.data as { name: string };
          switch (name) {
            case "Event Exit":
              return setHover(false);
            case "Event Enter":
              return setHover(true);
            case "Event Click":
              return setClicked(true);
            default:
              return;
          }
        }
        default:
          return;
      }
    };
    if (rive) {
      rive.on(EventType.RiveEvent, riveEventHandler);
      rive.on(EventType.StateChange, riveEventHandler);
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
      if (beepBeepLoaded) {
        beepBeepLoaded.currentTime = 0;
        beepBeepLoaded.play();
      }
    }
    if (clicked) setClicked(false); // no matter what reset clicked
  }, [animation, beepBeepLoaded, clicked]);

  // 🔊 Volume + volume toggle
  useEffect(() => {
    if (walkingLoaded && bgLoaded && beepBeepLoaded) {
      walkingLoaded.volume = sound ? 1 : 0;
      bgLoaded.volume = sound ? 0.15 : 0;
      beepBeepLoaded.volume = sound ? 1 : 0;
    }
  }, [sound, walkingLoaded, bgLoaded, beepBeepLoaded]);

  // 🔊 Background
  useEffect(() => {
    // TODO: Repeat background music
    if (replay === 1 && prevReplay !== replay) {
      if (bgLoaded) {
        bgLoaded.currentTime = 0;
        bgLoaded.play();
        bgLoaded.loop = true;
      }
    }
  }, [bgLoaded, replay, prevReplay]);

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
      if (walkingLoaded) {
        walkingLoaded.currentTime = 0;
        walkingLoaded.play();
      }
    }
  }, [rive, replay, walkingLoaded, sound, prevReplay]);
  return <RiveComponent />;
};
