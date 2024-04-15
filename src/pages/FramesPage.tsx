import { useEffect, useState } from "react";

import { DeviceType } from "../utils/fetchServerUtils";
import { colorsRGB } from "../utils/colors";

import StepDevice from "../components/StepDevice";

const FramesPage = ({
  devices,
  _rows,
}: {
  devices: DeviceType[];
  _rows: number;
}) => {
  const [frame, setFrame] = useState<number>(0);
  const [changed, setChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [frames, setFrames] = useState<number[][]>([devices.map(() => 2)]);

  const addFrame = () => {
    setChanged(true);
    setFrames((prev) => [...prev, devices.map(() => 2)]);
  };

  const decrementFrame = () => setFrame((prev) => prev - 1);

  const incrementFrame = () => {
    frame === frames.length - 1 && addFrame();
    setFrame((prev) => prev + 1);
  };

  const incrementColor = (_deviceIndex: number) => {
    setChanged(true);
    setFrames((_frame) =>
      _frame.map((_prev, index) =>
        index === frame
          ? _prev.map((_device, _index) =>
              _deviceIndex === _index
                ? _device < colorsRGB.length - 1
                  ? _device + 1
                  : 0
                : _device
            )
          : _prev
      )
    );
  };

  const decrementColor = (_deviceIndex: number) => {
    setChanged(true);
    setFrames((_frame) =>
      _frame.map((_prev, index) =>
        index === frame
          ? _prev.map((_device, _index) =>
              _deviceIndex === _index
                ? _device > 0
                  ? _device - 1
                  : colorsRGB.length - 1
                : _device
            )
          : _prev
      )
    );
  };

  const saveFrames = () => {
    setChanged(false);
    console.log(frames);
  };

  const deleteFrame = (_frameIndex: number) => {
    setChanged(true);
    setFrame((prev) => (prev > frames.length - 2 ? frames.length - 2 : prev));
    setFrames((prev) => prev.filter((_frame, index) => _frameIndex !== index));
  };
  return (
    <div className="program-body">
      <div className="program-controls">
        <span className="text-normal medium">Frame {frame + 1}</span>
      </div>
      <button
        disabled={frame === 0}
        onClick={decrementFrame}
        className="control-button no-border frame-button"
      >
        <i className="material-icons text-normal large">chevron_left</i>
      </button>
      <div
        className="step-grid"
        style={{ gridTemplateColumns: `repeat(${_rows}, 1fr)` }}
      >
        {frames[frame].map((color, index) => (
          <div key={"device" + index}>
            <StepDevice
              color={color}
              colorUp={() => incrementColor(index)}
              colorDown={() => decrementColor(index)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={incrementFrame}
        className="control-button no-border frame-button"
        disabled={frames.length === 32}
      >
        <i className="material-icons text-normal large">
          {frame === frames.length - 1 ? "add" : "chevron_right"}
        </i>
      </button>
      {changed && (
        <div className="frame-save">
          <button
            onClick={saveFrames}
            className="control-button no-border floating-button"
          >
            <i className="material-icons inherit">save</i>
          </button>
        </div>
      )}
      {frames.length !== 1 && (
        <div className="frame-delete">
          <button
            onClick={() => deleteFrame(frame)}
            className="control-button no-border floating-button"
          >
            <i className="material-icons inherit">delete</i>
          </button>
        </div>
      )}
    </div>
  );
};

export default FramesPage;
