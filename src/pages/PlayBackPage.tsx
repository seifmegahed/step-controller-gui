import { sendSlowDown, sendSpeedUp } from "../utils/fetchServerUtils";

const PlaybackPage = ({play, updatePlay}:{play: boolean; updatePlay: () => void}) => {
  return (
    <div className="playback-body">
      <button onClick={sendSlowDown} className="control-button floating-button play-pause">
        <i className="material-icons text-normal inherit">fast_rewind</i>
      </button>
      <button
        onClick={updatePlay}
        className="control-button floating-button play-pause"
      >
        <i className="material-icons text-normal inherit">
          {play ? "play_arrow" : "pause"}
        </i>
      </button>
      <button onClick={sendSpeedUp} className="control-button floating-button play-pause">
        <i className="material-icons text-normal inherit">fast_forward</i>
      </button>
    </div>
  );
};

export default PlaybackPage;
