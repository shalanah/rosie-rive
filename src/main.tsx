import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { StateContextProvider } from "./hooks/useStateContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateContextProvider>
    <App />
  </StateContextProvider>
);
