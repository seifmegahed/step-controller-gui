import { useEffect, useState } from "react";
import {
  DeviceType,
  DeviceDataType,
  fetchDeviceData,
  fetchDevices,
} from "../utils/fetchServerUtils";
import Loader from "../components/Loader";

const devicesInit = [
  { id: "1DE3AD", position: 1, blink: false, calibrate: false },
  { id: "1D22E2", position: 2, blink: false, calibrate: false },
  { id: "2DE364", position: 3, blink: false, calibrate: false },
  { id: "2EA33A", position: 4, blink: false, calibrate: false },
  { id: "2DF1E2", position: 5, blink: false, calibrate: false },
];

const KeyValuePair = ({
  keyValue,
  value,
}: {
  keyValue: string | number;
  value: string | number;
}) => (
  <div className="text-normal">
    <div className="key-value-pair-container">
      <div className="text-name">
        <span>{keyValue} </span>
      </div>
      <div className="text-value">
        <span>{value}</span>
      </div>
    </div>
  </div>
);

const SetupPage = () => {
  const [DeviceData, setDeviceData] = useState<DeviceDataType>({
    status: "Loading",
  });
  const [devices, setDevices] = useState<DeviceType[]>(devicesInit);

  useEffect(() => {
    fetchDeviceData().then((v) => setDeviceData(v));
  }, []);

  useEffect(() => {
    console.log(devices);
  }, [devices]);

  const startBlink = (device: DeviceType) => {
    setDevices((prev) =>
      prev.map((prevDevice) =>
        prevDevice.id === device.id ? { ...device, blink: true } : prevDevice
      )
    );
  };

  const stopBlink = (device: DeviceType) => {
    setDevices((prev) =>
      prev.map((prevDevice) =>
        prevDevice.id === device.id ? { ...device, blink: false } : prevDevice
      )
    );
  };

  const calibrate = (device: DeviceType) => {
    setDevices((prev) =>
      prev.map((prevDevice) =>
        prevDevice.id === device.id
          ? { ...device, calibrate: !device.calibrate }
          : prevDevice
      )
    );
  };

  const handleShiftUp = (device: DeviceType) => {
    setDevices((prev) =>
      prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position - 2, 0, device)
        .map((temp, index) => ({ ...temp, position: index + 1 }))
    );
  };

  const handleShiftDown = (device: DeviceType) => {
    setDevices((prev) =>
      prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position, 0, device)
        .map((temp, index) => ({ ...temp, position: index + 1 }))
    );
  };

  return (
    <>
      {DeviceData.status === "Loading" ? (
        <Loader />
      ) : (
        <div className="main-body">
          <div className="controls-container">
            <div>
              <KeyValuePair keyValue="Status:" value={DeviceData.status} />
              <KeyValuePair keyValue="SSID:" value={DeviceData.ssid ?? ""} />
              <KeyValuePair
                keyValue="IP Address:"
                value={DeviceData.ip ?? ""}
              />
            </div>
            <div>
              <button className="control-button text-normal scan-button">
                SAVE
              </button>
              <button
                onClick={fetchDevices}
                className="control-button text-normal scan-button"
              >
                SCAN
              </button>
            </div>
          </div>
          <div className="devices-table">
            {devices.map((device) => (
              <div
                key={device.id}
                className={
                  device.blink || device.calibrate
                    ? "device-row device-selected"
                    : "device-row"
                }
              >
                <div className="flex-column">
                  <button
                    onClick={() => handleShiftUp(device)}
                    className="text-normal no-border position-button control-button"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleShiftDown(device)}
                    className="text-normal no-border position-button control-button"
                  >
                    -
                  </button>
                </div>
                <div className="flex-column">
                  <KeyValuePair keyValue={device.position} value={device.id} />
                </div>
                <div className="device-column">
                  <button
                    onClick={() => calibrate(device)}
                    className="device-control-button text-normal control-button no-border"
                  >
                    Calibrate
                  </button>
                  <button className="device-control-button text-normal control-button no-border">
                    Reset
                  </button>
                  <button
                    onClick={() => startBlink(device)}
                    className="device-control-button text-normal control-button no-border"
                  >
                    Start Blink
                  </button>
                  <button
                    onClick={() => stopBlink(device)}
                    className="device-control-button text-normal control-button no-border"
                  >
                    Stop Blink
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SetupPage;
