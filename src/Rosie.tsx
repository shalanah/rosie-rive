import { useEffect } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  EventType,
  EventCallback,
} from "@rive-app/react-canvas-lite";

export const Rosie = ({ replay }: { replay: number }) => {
  const { rive, RiveComponent } = useRive({
    src: "assets/rosie-10.riv",
    stateMachines: "State Machine 1",
    artboard: "rosie animation blue",
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoplay: true,
  });

  useEffect(() => {
    const riveEventHandler: EventCallback = (event) => {
      console.log(event);
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

  useEffect(() => {
    if (replay !== 0 && rive) {
      rive.reset({
        artboard: "rosie animation blue",
        stateMachines: "State Machine 1",
        autoplay: true,
      });
      rive.play();
    }
  }, [rive, replay]);
  return <RiveComponent />;
};
