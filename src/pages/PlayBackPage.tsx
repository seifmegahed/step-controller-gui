import FastForward from "../components/Icons/FastForward";
import FastRewind from "../components/Icons/FastRewind";
import Pause from "../components/Icons/Pause";
import PlayArrow from "../components/Icons/PlayArrow";

import { sendSlowDown, sendSpeedUp } from "../utils/fetchServerUtils";

const PlaybackPage = ({
  play,
  updatePlay,
}: {
  play: boolean;
  updatePlay: () => void;
}) => {
  return (
    <div className="playback-body">
      <button
        onClick={sendSlowDown}
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
        onClick={sendSpeedUp}
        className="control-button floating-button play-pause"
      >
        <FastForward className="medium-large" />
      </button>
    </div>
  );
};

export default PlaybackPage;
