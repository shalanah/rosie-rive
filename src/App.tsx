import { Rosie } from "./Rosie";
import { useState } from "react";

export function App() {
  const [replay, setReplay] = useState(0);
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Rosie replay={replay} />
      <footer
        style={{
          lineHeight: 1,
          position: "absolute",
          left: 10,
          bottom: 10,
          fontSize: ".75rem",
        }}
      >
        An animation study of Rosie, not affiliated with The Jetsons.
      </footer>
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 10,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <button aria-label="Replay" onClick={() => setReplay((v) => ++v)}>
            <span aria-hidden="true">Replay</span>
          </button>
          <a
            href="https://github.com/shalanah/rosie-rive"
            title="Github"
            target="_blank"
            aria-label="Github"
          >
            <span aria-hidden="true">Github</span>
          </a>
          <button aria-label="Toggle Sound">
            <span aria-hidden="true">Sound</span>
          </button>
        </div>
      </div>
    </div>
  );
}
