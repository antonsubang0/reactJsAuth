const Select2 = ({ title, danger, value, isiData, name, pesan, option }) => {
  return (
    <div className="group-input">
      <label>{title}</label>
      <select
        className={danger ? "input danger" : "input"}
        name={name}
        value={value}
        onChange={isiData}
      >
        {option.map((item, index) => (
          <option key={index} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
      {danger ? <div className="label-danger">{pesan}</div> : <></>}
    </div>
  );
};

export { Select2 };
