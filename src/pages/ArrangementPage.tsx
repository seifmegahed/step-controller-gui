import { useEffect, useState } from "react";

import Add from "../components/Icons/Add";
import Remove from "../components/Icons/Remove";

import { DeviceType, setColors } from "../utils/fetchServerUtils";
import { colorsRGB } from "../utils/colors";

import StepDevice from "../components/StepDevice";

const ArrangementPage = ({
  devices,
  _rows,
  updateRows,
}: {
  devices: DeviceType[];
  _rows: number;
  updateRows: (value: number) => void;
}) => {
  const [rows, setRows] = useState<number>(_rows);
  const [devicesColors, setDevicesColors] = useState<number[]>(
    devices.map((device) => 2)
  );
  useEffect(() => {
    updateRows(rows);
  }, [rows]);
  const handleRowIncrement = () => {
    if (rows < 50 && rows < devicesColors.length) setRows((prev) => prev + 1);
  };
  const handleRowDecrement = () => {
    if (rows > 1) setRows((prev) => prev - 1);
  };

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
      <div className="program-controls">
        <button
          disabled={rows === 1}
          onClick={handleRowDecrement}
          className="control-button rows-button"
        >
          <Remove className="medium" />
        </button>
        <button
          disabled={true}
          className="control-button text-normal rows-button no-border medium"
        >
          {rows}
        </button>
        <button
          disabled={rows > 49 || rows > devicesColors.length - 1}
          onClick={handleRowIncrement}
          className="control-button rows-button"
        >
          <Add className="medium" />
        </button>
      </div>
      <div className="grid-container">
        <div
          className="step-grid"
          style={{ gridTemplateColumns: `repeat(${rows}, 1fr)` }}
        >
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
      </div>
    </div>
  );
};

export default ArrangementPage;
