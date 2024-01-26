import { Rosie } from "./Rosie";
import GithubIcon from "./assets/github.svg?react";
import RestartIcon from "./assets/rotate-ccw.svg?react";
import VolumeOnIcon from "./assets/volume-2.svg?react";
import VolumeOffIcon from "./assets/volume-x.svg?react";
import { useStateContext } from "./hooks/useStateContext";
import styled from "styled-components";

const Button = styled.button`
  transition: 0.1s transform;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  &:hover,
  &:focus-visible {
    /* filter: drop-shadow(0 0 3px #d0f4ff); */
    transform: scale(1.1);
    outline: 2px dashed #000;
    outline-offset: 2px;
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
  gap: 5px;
`;

const strokeWidth = 2.75;

export function App() {
  const { setReplay, sound, setSound } = useStateContext();
  return (
    <div className="pos-full pos-up-left">
      <Rosie />
      <Nav>
        <Button onClick={() => setReplay((v) => ++v)}>
          <span className="sr-only">Replay animation</span>
          <RestartIcon
            focusable="false"
            aria-hidden="true"
            width={24}
            height={24}
            strokeWidth={strokeWidth}
          />
        </Button>
        <Button onClick={() => setSound(!sound)}>
          <span className="sr-only">Toggle sound {sound ? "off" : "on"}</span>
          {sound ? (
            <VolumeOnIcon
              focusable="false"
              aria-hidden="true"
              width={32}
              height={32}
              strokeWidth={strokeWidth}
            />
          ) : (
            <VolumeOffIcon
              focusable="false"
              aria-hidden="true"
              width={32}
              height={32}
              strokeWidth={strokeWidth}
            />
          )}
        </Button>
      </Nav>
      <Footer>
        <Button
          as={"a"}
          href="https://github.com/shalanah/rosie-rive"
          title="Github - Rosie Rive"
          target="_blank"
        >
          <span className="sr-only">Github - Rosie Rive</span>
          <GithubIcon
            focusable="false"
            aria-hidden="true"
            width={30}
            height={30}
            strokeWidth={strokeWidth}
          />
        </Button>
        Study of Rosie, not affiliated with The Jetsons
      </Footer>
    </div>
  );
}
