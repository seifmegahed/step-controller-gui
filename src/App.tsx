import { useState } from "react";
import "./App.css";

import NavComp from "./components/NavComp";
import SetupPage from "./pages/SetupPage";
import ProgramPage from "./pages/ProgramPage";
import { DeviceType } from "./utils/fetchServerUtils";

const App = () => {
  const [page, setPage] = useState("program");
  const [devices, setDevices] = useState<DeviceType[]>([
    // { id: 0, position: 0, blink: false, calibrate: false },
    // { id: 1, position: 1, blink: false, calibrate: false },
    // { id: 2, position: 2, blink: false, calibrate: false },
    // { id: 3, position: 3, blink: false, calibrate: false },
  ]);

  return (
    <>
      <NavComp page={page} changePage={setPage} />
      {page === "setup" && (
        <SetupPage initDevices={devices} updateDevices={setDevices} />
      )}
      {page === "program" && <ProgramPage devices={devices} />}
    </>
  );
};

export default App;
