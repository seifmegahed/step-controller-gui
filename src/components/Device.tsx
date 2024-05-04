import { DeviceType } from "../utils/fetchServerUtils";
import KeyValuePair from "./KeyValuePair";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

type DeviceComponentType = {
  master: boolean;
  device: DeviceType;
  devicesLength: number;
  onShiftUp: (device: DeviceType) => void;
  onShiftDown: (device: DeviceType) => void;
  onStartBlink: (device: DeviceType) => void;
  onStopBlink: (device: DeviceType) => void;
  onCalibrate: (device: DeviceType) => void;
};

const Device = ({
  master,
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

  return (
    <div
      key={device.id}
      className={
        device.blink || device.calibrate
          ? "device-row device-selected"
          : "device-row"
      }
    >
      <div className="flex-row align-center gap-20">
        <div className="flex-column">
          <button
            onClick={() => handleShiftUp(device)}
            className="text-normal no-border position-button control-button"
            disabled={device.position === 0}
          >
            <ArrowDropUp sx={{fontSize: "20pt"}} />
          </button>
          <button
            onClick={() => handleShiftDown(device)}
            className="text-normal no-border position-button control-button"
            disabled={device.position === devicesLength - 1}
          >
            <ArrowDropDown sx={{fontSize: "20pt"}} />
          </button>
        </div>
        <div className="flex-column">
          <KeyValuePair
            keyValue={device.position}
            value={device.id.toString(16).toLocaleUpperCase()}
          />
        </div>
      </div>

      <div className="device-column">
        <button
          disabled={master}
          onClick={() =>
            device.blink ? handleStopBlink(device) : handleStartBlink(device)
          }
          className="device-control-button text-normal control-button no-border"
        >
          Blink
        </button>
        <button className="device-control-button text-normal control-button no-border">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Device;
