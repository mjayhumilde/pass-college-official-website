import React, { useState, useRef } from "react";
import musicFile from "../assets/videos/Rob Deniel - Nandito Ako (Cover with Lyrics).mp3";

const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(musicFile));

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={toggleMusic}>
      {isPlaying ? "Pause Music" : "Play Music"}
    </button>
  );
};

export default MusicButton;
