const Input1 = ({
  title,
  isiData,
  danger,
  pesan,
  value,
  type,
  name,
  placeholder,
}) => {
  return (
    <div className="group-input1">
      <label>{title}</label>
      <input
        className={danger ? "input danger" : "input"}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={isiData}
      />
      {danger ? (
        <div className={type === "text" ? "label-danger2" : "label-danger3"}>
          {pesan}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

const Input2 = ({
  title,
  isiData,
  danger,
  pesan,
  value,
  type,
  name,
  placeholder,
}) => {
  return (
    <div className="group-input">
      <label>{title}</label>
      <input
        className={danger ? "input danger" : "input"}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={isiData}
      />
      {danger ? <div className="label-danger">{pesan}</div> : <></>}
    </div>
  );
};

export { Input1, Input2 };
