import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas-lite";

function App() {
  const { RiveComponent } = useRive({
    src: "rosie.riv",
    stateMachines: "State Machine 1",
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  return (
    <>
      <RiveComponent />
    </>
  );
}

export default App;
