import { useEffect, useState } from "react";

import {
  Add,
  ChevronLeft,
  ChevronRight,
  ContentCopy,
  Delete,
  Save,
} from "@mui/icons-material";

import { DeviceType, fetchFrames, sendFrames } from "../utils/fetchServerUtils";
import { colorsRGB } from "../utils/colors";

import StepDevice from "../components/StepDevice";
import Loader from "../components/Loader";

const maxNumberOfFrames = 128;

const FramesPage = ({
  devices,
  _rows,
}: {
  devices: DeviceType[];
  _rows: number;
}) => {
  const [frame, setFrame] = useState<number>(0);
  const [changed, setChanged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [frames, setFrames] = useState<number[][]>([]);

  useEffect(() => {
    setLoading(true);
    fetchFrames().then((result) => {
      result.length ? setFrames(result) : setFrames([devices.map(() => 2)]);
      setLoading(false);
    });
  }, []);

  const addFrame = (frameIndex: number) => {
    setChanged(true);
    var newFrames: number[][] = [];
    setFrames((prev) => {
      prev.forEach((_frame, _index) => {
        newFrames.push(_frame);
        if (_index === frameIndex) newFrames.push(devices.map(() => 2));
      });
      return newFrames;
    });
    incrementFrame();
  };

  const copyFrame = (frameIndex: number) => {
    setChanged(true);
    var newFrames: number[][] = [];
    setFrames((prev) => {
      prev.forEach((_frame, _index) => {
        newFrames.push(_frame);
        if (_index === frameIndex) newFrames.push(_frame);
      });
      return newFrames;
    });
    incrementFrame();
  };

  const decrementFrame = () => setFrame((prev) => prev - 1);
  const incrementFrame = () => setFrame((prev) => prev + 1);

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
    setLoading(true);
    sendFrames(frames);
    setLoading(false);
  };

  const deleteFrame = (_frameIndex: number) => {
    setChanged(true);
    setFrame((prev) => (prev > frames.length - 2 ? frames.length - 2 : prev));
    setFrames((prev) => prev.filter((_frame, index) => _frameIndex !== index));
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="program-body">
          <div className="program-controls">
            <span className="text-normal medium">Frame {frame + 1}</span>
          </div>
          <button
            disabled={frame === 0}
            onClick={decrementFrame}
            className="control-button no-border frame-button"
          >
            <ChevronLeft className="text-normal" sx={{ fontSize: "36pt" }} />
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
          <div className="flex-column gap-20">
            <button
              onClick={() => copyFrame(frame)}
              className="control-button no-border frame-button"
              disabled={frames.length === maxNumberOfFrames}
            >
              <ContentCopy className="text-normal" sx={{ fontSize: "26pt" }} />
            </button>
            <button
              onClick={incrementFrame}
              className="control-button no-border frame-button"
              disabled={frame === frames.length - 1}
            >
              <ChevronRight className="text-normal" sx={{ fontSize: "36pt" }} />
            </button>
            <button
              onClick={() => addFrame(frame)}
              className="control-button no-border frame-button"
              disabled={frames.length === maxNumberOfFrames}
            >
              <Add className="text-normal" sx={{ fontSize: "30pt" }} />
            </button>
          </div>
          {changed && (
            <div className="frame-save">
              <button
                onClick={saveFrames}
                className="control-button no-border floating-button"
              >
                <Save className="text-normal" sx={{ fontSize: "30pt" }} />
              </button>
            </div>
          )}
          {frames.length !== 1 && (
            <div className="frame-delete">
              <button
                onClick={() => deleteFrame(frame)}
                className="control-button no-border floating-button"
              >
                <Delete className="text-normal" sx={{ fontSize: "30pt" }} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FramesPage;
