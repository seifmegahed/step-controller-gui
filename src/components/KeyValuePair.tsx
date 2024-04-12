const KeyValuePair = ({
  keyValue,
  value,
}: {
  keyValue: string | number;
  value: string | number;
}) => (
  <div className="text-normal">
    <div className="key-value-pair-container">
      <div className="text-name">
        <span>{keyValue} </span>
      </div>
      <div className="text-value">
        <span>{value}</span>
      </div>
    </div>
  </div>
);

export default KeyValuePair;
