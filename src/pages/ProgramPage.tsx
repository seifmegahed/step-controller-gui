import { useEffect, useState } from "react";
import StepDevice from "../components/StepDevice";
import { DeviceType, setColors } from "../utils/fetchServerUtils";
import { colorsRGB } from "../utils/colors";

const ProgramPage = ({ devices }: { devices: DeviceType[] }) => {
  const [devicesColors, setDevicesColors] = useState<number[]>(
    devices.map((device) => 2)
  );

  useEffect(() => {
    if (devicesColors.length > 0) setColors(devicesColors);
  }, [devicesColors]);

  const incrementColor = (_deviceIndex: number) =>
    setDevicesColors((_prev) =>
      _prev.map((_device, _index) =>
        _deviceIndex === _index
          ? _device < colorsRGB.length - 1
            ? _device + 1
            : 0
          : _device
      )
    );
  const decrementColor = (_deviceIndex: number) =>
    setDevicesColors((_prev) =>
      _prev.map((_device, _index) =>
        _deviceIndex === _index
          ? _device > 0
            ? _device - 1
            : colorsRGB.length - 1
          : _device
      )
    );
  return (
    <div className="program-body">
      {devicesColors.map((color, index) => (
        <div key={"device" + index}>
          <StepDevice
            color={color}
            colorUp={() => incrementColor(index)}
            colorDown={() => decrementColor(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProgramPage;
