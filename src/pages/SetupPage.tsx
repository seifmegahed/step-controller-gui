import { useEffect, useState } from "react";
import {
  DeviceType,
  DeviceDataType,
  fetchDeviceData,
  fetchDevices,
} from "../utils/fetchServerUtils";
import Loader from "../components/Loader";
import KeyValuePair from "../components/KeyValuePair";
import Device from "../components/Device";

const SetupPage = () => {
  const [DeviceData, setDeviceData] = useState<DeviceDataType>({
    status: "Loading",
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
        .toSpliced(device.position - 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index }))
    );
  };

  const handleShiftDown = (device: DeviceType) => {
    setDevices((prev) =>
      prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position + 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index }))
    );
  };

  return (
    <>
      {loading ? (
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
                onCalibrate={calibrate}
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
