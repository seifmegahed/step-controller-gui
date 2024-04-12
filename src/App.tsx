import { useState } from "react";
import "./App.css";

import NavComp from "./components/NavComp";
import SetupPage from "./pages/SetupPage";
import ProgramPage from "./pages/ProgramPage";

const App = () => {
  const [page, setPage] = useState("program");
  return (
    <>
      <NavComp page={page} changePage={setPage} />
      {page === "setup" && <SetupPage />}
      {page === "program" && <ProgramPage />}
    </>
  );
};

export default App;
