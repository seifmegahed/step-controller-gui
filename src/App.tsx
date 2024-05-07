import { useEffect, useState } from "react";

import "./App.css";

import {
  sendPause,
  sendPlay,
  DeviceType,
  fetchDeviceData,
  DeviceInfoType,
  initDevice,
  fetchDevices,
  sendBlink,
} from "./utils/fetchServerUtils";

import NavComp from "./components/NavComp";
import SetupPage from "./pages/SetupPage";
import ArrangementPage from "./pages/ArrangementPage";
import FramesPage from "./pages/FramesPage";
import PlaybackPage from "./pages/PlayBackPage";
import Loader from "./components/Loader";

const App = () => {
  const [page, setPage] = useState("setup");
  const [play, setPlay] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(initDevice);

  const handleStartBlink = (device: DeviceType) => {
    sendBlink(device.id, true);
    setDeviceInfo((prev) => ({
      ...prev,
      devices: prev.devices.map((prevDevice) =>
        prevDevice.id === device.id ? { ...device, blink: true } : prevDevice
      ),
    }));
  };

  const handleStopBlink = (device: DeviceType) => {
    sendBlink(device.id, false);
    setDeviceInfo((prev) => ({
      ...prev,
      devices: prev.devices.map((prevDevice) =>
        prevDevice.id === device.id ? { ...device, blink: false } : prevDevice
      ),
    }));
  };

  const handleShiftUp = (device: DeviceType) => {
    setLoading(true);
    setDeviceInfo((prev) => ({
      ...prev,
      devices: prev.devices
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position - 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index })),
    }));
    setLoading(false);
  };

  const handleShiftDown = (device: DeviceType) => {
    setLoading(true);
    setDeviceInfo((prev) => ({
      ...prev,
      devices: prev.devices
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position + 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index })),
    }));
    setLoading(false);
  };

  const handleScan = () => {
    setLoading(true);
    sendPause();
    fetchDevices().then((res) => {
      setDeviceInfo((prev) => ({ ...prev, devices: res }));
      setLoading(false);
    });
  };

  useEffect(() => {
    play ? sendPause() : sendPlay();
  }, [play]);

  useEffect(() => {
    setLoading(true);
    fetchDeviceData().then((res) => {
      setDeviceInfo(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <NavComp page={page} changePage={setPage} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {page === "playback" && (
            <PlaybackPage
              play={play}
              updatePlay={() => setPlay((prev) => !prev)}
            />
          )}
          {page === "frames" && (
            <FramesPage
              devices={deviceInfo.devices}
              _rows={deviceInfo.frameWidth}
            />
          )}
          {page === "arrangement" && (
            <ArrangementPage
              devices={deviceInfo.devices}
              _rows={deviceInfo.frameWidth}
              updateRows={(rows) =>
                setDeviceInfo((prev) => ({ ...prev, frameWidth: rows }))
              }
            />
          )}
          {page === "setup" && (
            <SetupPage
              deviceInfo={deviceInfo}
              onScan={handleScan}
              onShiftDown={handleShiftDown}
              onShiftUp={handleShiftUp}
              onStartBlink={handleStartBlink}
              onStopBlink={handleStopBlink}
            />
          )}
        </>
      )}
    </>
  );
};

export default App;
