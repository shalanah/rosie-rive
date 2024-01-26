import { Rosie } from "./Rosie";
import { useState } from "react";
import GithubIcon from "./assets/github.svg?react";
import RotateIcon from "./assets/rotate-ccw.svg?react";
import VolumeOnIcon from "./assets/volume-2.svg?react";
import VolumeOffIcon from "./assets/volume-x.svg?react";

import styled from "styled-components";

const Footer = styled.footer`
  line-height: 1;
  position: absolute;
  left: 20px;
  bottom: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 10px;
  svg * {
    /* Couldn't pass through svgr unfortunately */
    vector-effect: non-scaling-stroke;
  }
`;
const Nav = styled.nav`
  position: absolute;
  left: 20px;
  top: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  svg * {
    /* Couldn't pass through svgr unfortunately */
    vector-effect: non-scaling-stroke;
  }
`;

export function App() {
  const [replay, setReplay] = useState(0);
  return (
    <div className="pos-full pos-up-left">
      <Rosie replay={replay} />
      <Footer>
        <a
          href="https://github.com/shalanah/rosie-rive"
          title="Github"
          target="_blank"
          aria-label="Github"
        >
          <GithubIcon width={30} height={30} strokeWidth={2.75} />
          <span aria-hidden="true">Github</span>
        </a>
        Study of Rosie, not affiliated with The Jetsons
      </Footer>
      <Nav>
        <button aria-label="Replay" onClick={() => setReplay((v) => ++v)}>
          <span aria-hidden="true">Replay</span>
          <RotateIcon width={24} height={24} strokeWidth={2.75} />
        </button>
        <button aria-label="Toggle Sound">
          <span aria-hidden="true">Sound</span>
          <VolumeOnIcon width={32} height={32} strokeWidth={2.75} />
        </button>
      </Nav>
    </div>
  );
}
