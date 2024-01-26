import { Rosie } from "./Rosie";
import GithubIcon from "./assets/github.svg?react";
import RestartIcon from "./assets/rotate-ccw.svg?react";
import VolumeOnIcon from "./assets/volume-2.svg?react";
import VolumeOffIcon from "./assets/volume-x.svg?react";
import PlayIcon from "./assets/play.svg?react";
import PlayFillIcon from "./assets/play-fill.svg?react";
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

const StartButton = styled.button`
  width: 30vmin;
  height: 30vmin;
  z-index: 1;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  svg * {
    /* Don't know how to pass through svgr yet - needs to be on children not svg tag */
    vector-effect: non-scaling-stroke;
  }
  &:hover,
  &:focus-visible {
    &:after {
      transform: scale(1.05);
    }
    svg {
      transform: translate(-50%, -50%) scale(1.05);
    }
    &:before {
      opacity: 0.2;
      transform: scale(1.3);
    }
  }
  &:active {
    &:after {
      transform: scale(1);
    }
    &:before {
      transform: scale(1.2);
    }
    svg {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  &:before,
  &:after,
  svg {
    transform-origin: center;
    transition: 0.2s;
  }
  &:before,
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    left: 0;
    top: 0;
  }
  &:before {
    transform: scale(0.75);
    background: #92eefc;
    opacity: 0;
  }
  &:after {
    background: #fff;
    border: 5px solid #000;
  }
`;

const Footer = styled.footer`
  line-height: 1;
  position: absolute;
  left: 15px;
  bottom: 15px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Nav = styled.nav`
  position: absolute;
  left: 15px;
  top: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const strokeWidth = 2.75;

export function App() {
  const { setReplay, sound, setSound, replay } = useStateContext();
  const onReplay = () => setReplay((v) => ++v);
  const onToggleSound = () => setSound(!sound);

  let playIcon = (
    <PlayIcon
      focusable="false"
      aria-hidden="true"
      width={24}
      height={24}
      strokeWidth={strokeWidth}
    />
  );
  let playText = "Play animation";
  if (replay > 0) {
    playIcon = (
      <RestartIcon
        focusable="false"
        aria-hidden="true"
        width={24}
        height={24}
        strokeWidth={strokeWidth}
      />
    );
    playText = "Replay animation";
  }
  return (
    <div className="pos-full pos-up-left">
      <Rosie />
      {replay === 0 && (
        <StartButton onClick={onReplay} className="pos-center">
          <span className="sr-only">Play animation</span>
          <PlayFillIcon
            width={"60%"}
            height={"60%"}
            className="pos-center"
            style={{ marginLeft: "3%" }}
            strokeWidth={10}
          />
        </StartButton>
      )}
      <Nav>
        <Button onClick={onReplay}>
          <span className="sr-only">{playText}</span>
          {playIcon}
        </Button>
        <Button onClick={onToggleSound}>
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
