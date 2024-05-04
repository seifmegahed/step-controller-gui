import { FastForward, FastRewind, Pause, PlayArrow } from "@mui/icons-material";
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
        <FastRewind sx={{fontSize: "32pt"}} />
      </button>
      <button
        onClick={updatePlay}
        className="control-button floating-button play-pause"
      >
        {play ? <PlayArrow sx={{fontSize: "32pt"}} /> : <Pause sx={{fontSize: "32pt"}} />}
      </button>
      <button
        onClick={sendSpeedUp}
        className="control-button floating-button play-pause"
      >
      <FastForward sx={{fontSize: "32pt"}} />
      </button>
    </div>
  );
};

export default PlaybackPage;
