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
            page === "program"
              ? "nav-button nav-button-selected text-normal"
              : "nav-button text-normal"
          }
          onClick={() => changePage("program")}
          id="program"
        >
          Program
        </button>
        <button
          className={
            page === "setup"
              ? "nav-button nav-button-selected text-normal"
              : "nav-button text-normal"
          }
          id="setup"
          onClick={() => changePage("setup")}
        >
          Setup
        </button>
      </div>
    </div>
  );
};

export default NavComp;
