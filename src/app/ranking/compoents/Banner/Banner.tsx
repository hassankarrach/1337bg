import React, { useEffect, useRef, useState } from "react";
import { StyledBanner } from "./styled.banner";
import {
  FaVolumeMute as MuteIcon,
  FaVolumeDown as NonMuteIcon,
} from "react-icons/fa";

const Banner = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(() => {
    const savedMuteState = localStorage.getItem("isMuted");
    return savedMuteState === "true";
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Audio playback failed:", error));
      audioRef.current.muted = isMuted;
    }
    localStorage.setItem("isMuted", isMuted.toString());
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <StyledBanner>
      <audio ref={audioRef} src="/banner.mp3" />
      <h1 className="message">Scrolling Text Here</h1>

      {isMuted ? (
        <MuteIcon className="MuteIcon" onClick={toggleMute} />
      ) : (
        <NonMuteIcon className="MuteIcon" onClick={toggleMute} />
      )}
    </StyledBanner>
  );
};

export default Banner;
