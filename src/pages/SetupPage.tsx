import { useEffect, useState } from "react";
import {
  DeviceType,
  DeviceDataType,
  fetchDeviceData,
  fetchDevices,
  sendBlink,
  sendData,
  sendChangeArray,
  sendSave,
} from "../utils/fetchServerUtils";
import Loader from "../components/Loader";
import KeyValuePair from "../components/KeyValuePair";
import Device from "../components/Device";

const SetupPage = ({
  initDevices,
  updateDevices,
}: {
  initDevices: DeviceType[];
  updateDevices: (devices: DeviceType[]) => void;
}) => {
  const [deviceData, setDeviceData] = useState<DeviceDataType>({
    id: 0,
  });
  const [devices, setDevices] = useState<DeviceType[]>(initDevices);
  const [loading, setLoading] = useState<boolean>(false);
  const [arrangementChanged, setArrangementChanged] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchDeviceData().then((res) => {
      setDeviceData(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log("here");
    if (arrangementChanged) {
      console.log(2);
      sendChangeArray(devices);
      setArrangementChanged(false);
    }
  }, [devices]);

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
    setArrangementChanged(true);
    setDevices((prev) =>
      prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position - 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index }))
    );
    setLoading(false);
  };

  const handleShiftDown = (device: DeviceType) => {
    setLoading(true);
    setArrangementChanged(true);
    setDevices((prev) =>
      prev
        .filter((prevDevice) => prevDevice.position !== device.position)
        .toSpliced(device.position + 1, 0, device)
        .map((temp, index) => ({ ...temp, position: index }))
    );
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
                value={deviceData.id.toString(16).toLocaleUpperCase()}
              />
              <KeyValuePair keyValue="SSID:" value={deviceData.ssid ?? ""} />
              <KeyValuePair
                keyValue="IP Address:"
                value={deviceData.ip ?? ""}
              />
            </div>
            <div className="flex-row">
              <button
                onClick={sendSave}
                className="control-button text-normal scan-button"
              >
                SAVE
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  fetchDevices().then((res) => {
                    setDevices(res);
                    updateDevices(res);
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
                key={device.id}
                master={device.id === deviceData.id}
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
