import { useEffect, useState } from "react";

import "./App.css";

import { sendPause, sendPlay, DeviceType } from "./utils/fetchServerUtils";

import NavComp from "./components/NavComp";
import SetupPage from "./pages/SetupPage";
import ArrangementPage from "./pages/ArrangementPage";
import FramesPage from "./pages/FramesPage";
import PlaybackPage from "./pages/PlayBackPage";

const App = () => {
  const [page, setPage] = useState("setup");
  const [rows, setRows] = useState<number>(4);
  const [play, setPlay] = useState<boolean>(true);

  useEffect(() => {
    play ? sendPause() : sendPlay();
  }, [play]);

  const [devices, setDevices] = useState<DeviceType[]>([
    { id: 0, position: 0, blink: false, calibrate: false },
    { id: 1, position: 1, blink: false, calibrate: false },
    { id: 2, position: 2, blink: false, calibrate: false },
    { id: 3, position: 3, blink: false, calibrate: false },
  ]);

  return (
    <>
      <NavComp page={page} changePage={setPage} />
      {page === "playback" && (
        <PlaybackPage play={play} updatePlay={() => setPlay((prev) => !prev)} />
      )}
      {page === "frames" && <FramesPage devices={devices} _rows={rows} />}
      {page === "arrangement" && (
        <ArrangementPage devices={devices} _rows={rows} updateRows={setRows} />
      )}
      {page === "setup" && (
        <SetupPage initDevices={devices} updateDevices={setDevices} />
      )}
    </>
  );
};

export default App;
