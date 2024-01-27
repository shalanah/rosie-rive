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
import { usePrevious } from "./hooks/usePrevious";
import audioBg from "./assets/Mellow-Mind_Looping.mp3";

export const Rosie = () => {
  const { replay, sound, setLoaded } = useStateContext();
  const prevReplay = usePrevious(replay);

  const { rive, RiveComponent } = useRive({
    src: "assets/rosie-18.riv",
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
  const audioBgLoaded = useMemo(() => {
    return new Audio(audioBg);
  }, []);

  const [hover, setHover] = useState(false);
  const [animation, setAnimation] = useState(["start"]);

  // Event listeners
  useEffect(() => {
    const riveEventHandler: EventCallback = (event) => {
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
    }
    return () => {
      if (rive) rive.removeAllRiveEventListeners();
    };
  }, [rive]);

  // Mouse cursor
  useEffect(() => {
    const isHovering = hover && animation.includes("interactive");
    document.body.classList[isHovering ? "add" : "remove"]("cursor-pointer");
  }, [hover, animation]);

  // Toggling sound
  useEffect(() => {
    audioWalkingLoaded.volume = sound ? 1 : 0;
    audioBgLoaded.volume = sound ? 0.15 : 0;
  }, [sound, audioWalkingLoaded, audioBgLoaded]);

  // Background music
  useEffect(() => {
    // TODO: Repeat background music
    if (replay === 1 && prevReplay !== replay) {
      audioBgLoaded.currentTime = 0;
      audioBgLoaded.play();
      audioBgLoaded.loop = true;
    }
  }, [audioBgLoaded, replay, prevReplay]);

  // Replay
  useEffect(() => {
    if (replay !== 0 && prevReplay !== replay && rive) {
      rive.reset({
        artboard: "rosie animation blue",
        stateMachines: "State Machine 1",
        autoplay: true,
      });
      rive.play();
      audioWalkingLoaded.currentTime = 0;
      audioWalkingLoaded.play();
    }
  }, [rive, replay, audioWalkingLoaded, sound, prevReplay]);
  return <RiveComponent />;
};
