import { Rosie } from "./Rosie";
import GithubIcon from "./assets/github.svg?react";
import RotateIcon from "./assets/rotate-ccw.svg?react";
import VolumeOnIcon from "./assets/volume-2.svg?react";
import VolumeOffIcon from "./assets/volume-x.svg?react";
import { useStateContext } from "./hooks/useStateContext";

import styled from "styled-components";

const Button = styled.button`
  transition: 0.1s;
  &:hover {
    filter: drop-shadow(0 0 3px #d0f4ff);
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1); // gives a nice bouncing effect
  }
  svg * {
    /* Don't know how to pass through svgr yet - needs to be on children not svg tag */
    vector-effect: non-scaling-stroke;
  }
`;

const Footer = styled.footer`
  line-height: 1;
  position: absolute;
  left: 20px;
  bottom: 18px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Nav = styled.nav`
  position: absolute;
  left: 20px;
  top: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const strokeWidth = 2.75;

export function App() {
  const { setReplay, sound, setSound } = useStateContext();
  return (
    <div className="pos-full pos-up-left">
      <Rosie />
      <Footer>
        <Button
          as={"a"}
          href="https://github.com/shalanah/rosie-rive"
          title="Github - Rosie Rive"
          target="_blank"
          aria-label="Github"
        >
          <GithubIcon width={30} height={30} strokeWidth={strokeWidth} />
          <span aria-hidden="true">Github - Rosie Rive</span>
        </Button>
        Study of Rosie, not affiliated with The Jetsons
      </Footer>
      <Nav>
        <Button
          aria-label="Replay animation"
          onClick={() => setReplay((v) => ++v)}
        >
          <span aria-hidden="true">Replay animation</span>
          <RotateIcon width={24} height={24} strokeWidth={strokeWidth} />
        </Button>
        <Button aria-label="Toggle sound">
          <span aria-hidden="true">Sound is {sound ? "on" : "off"}</span>
          {sound ? (
            <VolumeOnIcon
              width={32}
              height={32}
              strokeWidth={strokeWidth}
              onClick={() => setSound(false)}
            />
          ) : (
            <VolumeOffIcon
              width={32}
              height={32}
              strokeWidth={strokeWidth}
              onClick={() => setSound(true)}
            />
          )}
        </Button>
      </Nav>
    </div>
  );
}
