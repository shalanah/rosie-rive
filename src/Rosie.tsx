import { useEffect } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas-lite";

export const Rosie = ({ replay }: { replay: number }) => {
  const { rive, RiveComponent } = useRive({
    src: "assets/rosie-9.riv",
    stateMachines: "State Machine 1",
    artboard: "rosie animation blue",
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoplay: true,
  });

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
