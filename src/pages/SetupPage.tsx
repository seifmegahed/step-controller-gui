import { useEffect, useState } from "react";
import {
  DeviceType,
  DeviceDataType,
  fetchDeviceData,
  fetchDevices,
  sendBlink,
  sendData,
  sendChangeArray,
} from "../utils/fetchServerUtils";
import Loader from "../components/Loader";
import KeyValuePair from "../components/KeyValuePair";
import Device from "../components/Device";

const SetupPage = () => {
  const [DeviceData, setDeviceData] = useState<DeviceDataType>({
    id: 0,
  });
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchDeviceData().then((res) => {
      setDeviceData(res);
      setLoading(false);
    });
  }, []);

  const startBlink = (device: DeviceType) => {
    sendBlink(device.id, true);
    setDevices((prev) =>
      prev.map((prevDevice) =>
        prevDevice.id === device.id ? { ...device, blink: true } : prevDevice
      )
    );
  };

  const stopBlink = (device: DeviceType) => {
    sendBlink(device.id, false);
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
    setLoading(true);
    setDevices((prev) => {
      const newArray = prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position - 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index }));
      sendChangeArray(newArray);
      return newArray;
    });
    setLoading(false);
  };

  const handleShiftDown = (device: DeviceType) => {
    setLoading(true);
    setDevices((prev) => {
      const newArray = prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position + 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index }));
      sendChangeArray(newArray);
      return newArray;
    });
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main-body">
          <div className="controls-container">
            <div>
              <KeyValuePair
                keyValue="Device ID:"
                value={DeviceData.id.toString(16).toLocaleUpperCase()}
              />
              <KeyValuePair keyValue="SSID:" value={DeviceData.ssid ?? ""} />
              <KeyValuePair
                keyValue="IP Address:"
                value={DeviceData.ip ?? ""}
              />
            </div>
            <div className="flex-row">
              <button className="control-button text-normal scan-button">
                SAVE
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  fetchDevices().then((res) => {
                    setDevices(res);
                    setLoading(false);
                  });
                }}
                className="control-button text-normal scan-button"
              >
                SCAN
              </button>
            </div>
          </div>
          <div className="devices-table">
            {devices.map((device) => (
              <Device
                device={device}
                devicesLength={devices.length}
                onCalibrate={sendData}
                onStartBlink={startBlink}
                onStopBlink={stopBlink}
                onShiftUp={handleShiftUp}
                onShiftDown={handleShiftDown}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SetupPage;
