import { DeviceType } from "../utils/fetchServerUtils";
import KeyValuePair from "./KeyValuePair";

type DeviceComponentType = {
  device: DeviceType;
  devicesLength: number;
  onShiftUp: (device: DeviceType) => void;
  onShiftDown: (device: DeviceType) => void;
  onStartBlink: (device: DeviceType) => void;
  onStopBlink: (device: DeviceType) => void;
  onCalibrate: (device: DeviceType) => void;
};

const Device = ({
  device,
  devicesLength,
  onShiftUp,
  onShiftDown,
  onStartBlink,
  onStopBlink,
  onCalibrate,
}: DeviceComponentType) => {
  const handleShiftUp = onShiftUp;
  const handleShiftDown = onShiftDown;
  const handleStartBlink = onStartBlink;
  const handleStopBlink = onStopBlink;
  const handleCalibrate = onCalibrate;
  return (
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
          disabled={device.position === 0}
        >
          <i className="material-icons">arrow_drop_up</i>
        </button>
        <button
          onClick={() => handleShiftDown(device)}
          className="text-normal no-border position-button control-button"
          disabled={device.position === devicesLength - 1}
        >
          <i className="material-icons">arrow_drop_down</i>
        </button>
      </div>
      <div className="flex-column">
        <KeyValuePair
          keyValue={device.position}
          value={device.id.toString(16).toLocaleUpperCase()}
        />
      </div>
      <div className="device-column">
        <button
          onClick={() => handleCalibrate(device)}
          className="device-control-button text-normal control-button no-border"
        >
          Calibrate
        </button>
        <button className="device-control-button text-normal control-button no-border">
          Reset
        </button>
        <button
          onClick={() => handleStartBlink(device)}
          className="device-control-button text-normal control-button no-border"
        >
          Start Blink
        </button>
        <button
          onClick={() => handleStopBlink(device)}
          className="device-control-button text-normal control-button no-border"
        >
          Stop Blink
        </button>
      </div>
    </div>
  );
};

export default Device;
