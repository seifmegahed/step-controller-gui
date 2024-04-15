type NavCompProps = {
  page: string;
  changePage: (value: string) => void;
};

const NavComp = ({ page, changePage }: NavCompProps) => {
  return (
    <div className="navbar">
      <h1>Bend Controller</h1>
      <div className={"nav-button-container"}>
        <button
          className={
            page === "playback"
              ? "nav-button nav-button-selected text-normal"
              : "nav-button text-normal"
          }
          onClick={() => changePage("playback")}
        >
          Playback
        </button>
        <button
          className={
            page === "frames"
              ? "nav-button nav-button-selected text-normal"
              : "nav-button text-normal"
          }
          onClick={() => changePage("frames")}
        >
          Frames
        </button>
        <button
          className={
            page === "program"
              ? "nav-button nav-button-selected text-normal"
              : "nav-button text-normal"
          }
          onClick={() => changePage("arrangement")}
        >
          Arrangement
        </button>
        <button
          className={
            page === "setup"
              ? "nav-button nav-button-selected text-normal"
              : "nav-button text-normal"
          }
          onClick={() => changePage("setup")}
        >
          Setup
        </button>
      </div>
    </div>
  );
};

export default NavComp;
