import { Rosie } from "./Rosie";
import GithubIcon from "./assets/github.svg?react";
import RestartIcon from "./assets/rotate-ccw.svg?react";
import VolumeOnIcon from "./assets/volume-2.svg?react";
import VolumeOffIcon from "./assets/volume-x.svg?react";
import PlayIcon from "./assets/play.svg?react";
import PlayFillIcon from "./assets/play-fill.svg?react";
import { useStateContext } from "./hooks/useStateContext";
import styled from "styled-components";
import { useEffect } from "react";

const Button = styled.button`
  transition: 0.1s transform;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
      outline: 2px dashed #000;
      outline-offset: 2px;
    }
    &:focus-visible {
      transform: scale(1.1);
      outline: 2px dashed #000;
      outline-offset: 2px;
    }
    &:active {
      transform: scale(1); // gives a nice bouncing effect
    }
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
  @media (hover: none) {
    /* Add highlight ring to mobile since hover doesn't show up */
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
  @media (hover: hover) {
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
  line-height: 1.5;
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
  const { setReplay, sound, setSound, replay, loaded } = useStateContext();
  const onReplay = () => setReplay((v) => ++v);
  const onToggleSound = () => setSound(!sound);
  // active styles safari
  useEffect(() => {
    document.addEventListener("touchstart", function () {}, true);
  }, []);
  return (
    <div className="pos-full pos-up-left">
      <Rosie />
      <StartButton
        style={{
          opacity: loaded && replay === 0 ? 1 : 0,
          pointerEvents: loaded && replay === 0 ? "auto" : "none",
        }}
        onClick={onReplay}
        className="pos-center"
      >
        <span className="sr-only">Play animation</span>
        <PlayFillIcon
          focusable="false"
          aria-hidden="true"
          width={"60%"}
          height={"60%"}
          className="pos-center ve"
          style={{ marginLeft: "3%" }}
          strokeWidth={10}
        />
      </StartButton>
      <Nav>
        <Button onClick={onReplay}>
          {replay > 0 ? (
            <RestartIcon
              focusable="false"
              aria-hidden="true"
              width={24}
              height={24}
              strokeWidth={strokeWidth}
            />
          ) : (
            <PlayIcon
              focusable="false"
              aria-hidden="true"
              width={24}
              height={24}
              strokeWidth={strokeWidth}
            />
          )}
          <span className="sr-only">
            {replay > 0 ? "Replay animation" : "Play animation"}
          </span>
        </Button>
        <Button onClick={onToggleSound}>
          <span className="sr-only">Toggle sound {sound ? "off" : "on"}</span>
          {sound ? (
            <VolumeOnIcon
              className="ve"
              focusable="false"
              aria-hidden="true"
              width={32}
              height={32}
              strokeWidth={strokeWidth}
            />
          ) : (
            <VolumeOffIcon
              className="ve"
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
            className="ve"
            focusable="false"
            aria-hidden="true"
            width={30}
            height={30}
            strokeWidth={strokeWidth}
          />
        </Button>
        <div>
          Study of Rosie, not affiliated with The Jetsons.
          <br />
          <span style={{ marginLeft: "-.6ch" }}>"</span>
          <a
            href={"https://soundimage.org/jazz-big-band/"}
            target="_blank"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Mellow Mind
          </a>
          " music by Eric Matyas, www.soundimage.org
        </div>
      </Footer>
    </div>
  );
}
