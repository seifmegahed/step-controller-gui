import { colorsRGB } from "../utils/colors";
import "./stepDevice.css";

const StepDevice = ({
  color,
  colorUp,
  colorDown,
}: {
  color: number;
  colorUp: () => void;
  colorDown: () => void;
}) => {
  return (
    <div
      className="step-device-main-div"
      onClick={colorUp}
      onContextMenu={(e) => {
        e.preventDefault();
        colorDown();
      }}
    >
      <div
        className="step-device-inner-div"
        style={{
          backgroundColor: `rgb(${colorsRGB[color][0]}, ${colorsRGB[color][1]}, ${colorsRGB[color][2]})`,
        }}
      ></div>
    </div>
  );
};

export default StepDevice;