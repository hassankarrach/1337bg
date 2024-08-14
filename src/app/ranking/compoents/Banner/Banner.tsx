import React, { useEffect, useRef, useState } from "react";
import { StyledBanner } from "./styled.banner";
import {
  FaVolumeMute as MuteIcon,
  FaVolumeDown as NonMuteIcon,
} from "react-icons/fa";

const Banner = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedMuteState = localStorage.getItem("isMuted");
    setIsMuted(savedMuteState === "true");
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("isMuted", isMuted.toString());
    }
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
      }
    }
  }, [isMuted, isClient]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <StyledBanner>
      <audio ref={audioRef} src="/banner.mp3" loop />
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