import { useEffect, useState } from "react";
import FastForward from "../components/Icons/FastForward";
import FastRewind from "../components/Icons/FastRewind";
import Pause from "../components/Icons/Pause";
import PlayArrow from "../components/Icons/PlayArrow";

import {
  fetchScore,
  sendFramesMode,
  sendGameMode,
  sendSlowDown,
  sendSpeedUp,
} from "../utils/fetchServerUtils";

const POLLING_INTERVAL = 500;

const PlaybackPage = ({
  play,
  updatePlay,
}: {
  play: boolean;
  updatePlay: () => void;
}) => {
  const [framesMode, setFramesMode] = useState(true);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [infinityMode, setInfinityMode] = useState(true);
  const [topScore, setTopScore] = useState(0);
  const [time, setTime] = useState(30);
  const [speed, setSpeed] = useState(800);

  useEffect(() => {
    !play && updatePlay();
    console.log(play);
    framesMode ? sendFramesMode() : sendGameMode();
  }, [framesMode]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!play && !framesMode) {
        if (!infinityMode) setTime((prev) => (prev -= 0.5));
        fetchScore().then(setScore);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [play, framesMode]);

  useEffect(() => {
    if (time < 0 && !infinityMode) {
      setLastScore(score);
      score > topScore && setTopScore(score);
      updatePlay();
      setTime(30);
    }
  }, [time]);

  const toggleMode = () => {
    setFramesMode((prevFramesMode) => !prevFramesMode);
  };
  return (
    <div>
      <div className="playback-body">
        <div className="playback-controls-body">
          <button
            onClick={() => sendSlowDown().then(setSpeed)}
            className="control-button floating-button play-pause"
          >
            <FastRewind className="medium-large" />
          </button>
          <button
            onClick={updatePlay}
            className="control-button floating-button play-pause"
          >
            {play ? (
              <PlayArrow className="medium-large" />
            ) : (
              <Pause className="medium-large" />
            )}
          </button>
          <button
            onClick={() => sendSpeedUp().then(setSpeed)}
            className="control-button floating-button play-pause"
          >
            <FastForward className="medium-large" />
          </button>
        </div>
        <div className="playback-controls-body">
          <button
            onClick={toggleMode}
            className="playback-control-button control-button text-normal"
          >
            {framesMode ? "Frames Mode" : "Game Mode"}
          </button>
          <div className="score  text-normal">{score}</div>
          <button
            disabled
            className="playback-control-button control-button text-normal"
          >
            Speed: {speed} ms
          </button>
          {!framesMode && (
            <>
              <div className="game-widget-right">
                <button
                  onClick={() => {
                    !play && updatePlay();
                    setInfinityMode((prev) => !prev);
                  }}
                  className="playback-control-button control-button text-normal"
                >
                  {infinityMode ? "Infinity" : "Timed"}
                </button>
                <button
                  disabled
                  className="playback-control-button control-button text-normal"
                >
                  time: {infinityMode ? "∞" : Math.round(time)}
                </button>
              </div>
              <div className="game-widget-left">
                <button
                  disabled
                  className="playback-control-button control-button text-normal"
                >
                  Last Score: {lastScore}
                </button>
                <button
                  disabled
                  className="playback-control-button control-button text-normal"
                >
                  Top Score: {topScore}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaybackPage;
