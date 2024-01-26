import { useEffect, useMemo } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  EventType,
  EventCallback,
  // useStateMachineInput, // TODO: Learn how to use this better... maybe don't need to listen to events?
} from "@rive-app/react-canvas-lite";
import { useState } from "react";
import audioWalking from "./assets/loop_mixdown8.mp3";
import { useStateContext } from "./hooks/useStateContext";

export const Rosie = () => {
  const { replay } = useStateContext();

  const [, setLoaded] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: "assets/rosie.riv",
    stateMachines: "State Machine 1",
    artboard: "rosie animation blue",
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoplay: false,
    onLoad: () => {
      setLoaded(true);
    },
  });

  const audioWalkingLoaded = useMemo(() => {
    return new Audio(audioWalking);
  }, []);

  const [hover, setHover] = useState(false);
  const [animation, setAnimation] = useState(["start"]);

  // Event listeners
  useEffect(() => {
    const riveEventHandler: EventCallback = (event) => {
      console.log(event, "here");
      switch (event.type) {
        case EventType.StateChange: {
          const data = event.data as [string];
          setAnimation(data);
          return;
        }
        case EventType.RiveEvent: {
          const { name } = event.data as { name: string };
          if (name === "Event Exit") setHover(false);
          if (name === "Event Enter") setHover(true);
          return;
        }
        default:
          return;
      }
    };

    if (rive) {
      rive.on(EventType.RiveEvent, riveEventHandler);
      rive.on(EventType.StateChange, riveEventHandler);
      rive.on(EventType.Play, riveEventHandler);
      rive.on(EventType.Load, riveEventHandler);
      // rive.on(EventType.Advance, riveEventHandler);
    }
    return () => {
      if (rive) {
        console.log("unmount");
        rive.removeAllRiveEventListeners();
      }
    };
  }, [rive]);

  // Mouse cursor
  useEffect(() => {
    const isHovering = hover && animation.includes("interactive");
    document.body.classList[isHovering ? "add" : "remove"]("cursor-pointer");
  }, [hover, animation]);

  // Replay
  useEffect(() => {
    if (replay !== 0 && rive) {
      rive.reset({
        artboard: "rosie animation blue",
        stateMachines: "State Machine 1",
        autoplay: true,
      });
      rive.play();
      audioWalkingLoaded.volume = 0.7;
      audioWalkingLoaded.play();
    }
  }, [rive, replay, audioWalkingLoaded]);
  return <RiveComponent />;
};
