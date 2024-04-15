import { useState } from "react";

const PlaybackPage = () => {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <div className="playback-body">
      <button className="control-button floating-button play-pause">
        <i className="material-icons text-normal inherit">fast_rewind</i>
      </button>
      <button
        onClick={() => setPlay((prev) => !prev)}
        className="control-button floating-button play-pause"
      >
        <i className="material-icons text-normal inherit">
          {play ? "play_arrow" : "pause"}
        </i>
      </button>
      <button className="control-button floating-button play-pause">
        <i className="material-icons text-normal inherit">fast_forward</i>
      </button>
    </div>
  );
};

export default PlaybackPage;
