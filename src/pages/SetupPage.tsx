import { useEffect, useState } from "react";
import {
  DeviceType,
  sendChangeArray,
  sendSave,
  DeviceInfoType,
} from "../utils/fetchServerUtils";
import KeyValuePair from "../components/KeyValuePair";
import Device from "../components/Device";

type SetupPageType = {
  deviceInfo: DeviceInfoType;
  onScan: () => void;
  onStartBlink: (device: DeviceType) => void;
  onStopBlink: (device: DeviceType) => void;
  onShiftUp: (device: DeviceType) => void;
  onShiftDown: (device: DeviceType) => void;
};

const SetupPage = ({
  deviceInfo,
  onScan,
  onStartBlink,
  onStopBlink,
  onShiftUp,
  onShiftDown,
}: SetupPageType) => {
  const [arrangementChanged, setArrangementChanged] = useState<boolean>(false);
  const handleScan = onScan;
  useEffect(() => {
    if (arrangementChanged) {
      sendChangeArray(deviceInfo.devices);
      setArrangementChanged(false);
    }
  }, [deviceInfo.devices]);

  return (
    <div className="main-body">
      <div className="controls-container">
        <div>
          <KeyValuePair
            keyValue="Device ID:"
            value={deviceInfo.id.toString(16).toLocaleUpperCase()}
          />
          <KeyValuePair keyValue="SSID:" value={deviceInfo.ssid} />
          <KeyValuePair keyValue="IP Address:" value={deviceInfo.ip} />
        </div>
        <div className="flex-row">
          <button
            onClick={sendSave}
            className="control-button text-normal scan-button"
          >
            SAVE
          </button>
          <button
            onClick={handleScan}
            className="control-button text-normal scan-button"
          >
            SCAN
          </button>
        </div>
      </div>
      <div className="devices-table">
        {deviceInfo.devices.map((device) => (
          <Device
            key={device.id}
            master={device.id === deviceInfo.id}
            device={device}
            devicesLength={deviceInfo.devices.length}
            onCalibrate={() => null}
            onStartBlink={onStartBlink}
            onStopBlink={onStopBlink}
            onShiftUp={onShiftUp}
            onShiftDown={onShiftDown}
          />
        ))}
      </div>
    </div>
  );
};

export default SetupPage;
