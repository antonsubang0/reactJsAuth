import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { formData, validateEmail } from "../../helper";
import { loginHttp } from "../../http";

const Login = () => {
  let history = useHistory();
  //  data form
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  // status danger field
  const [danger, setDanger] = useState({
    username: false,
    password: false,
  });
  // status danger Button Login
  const [btnLogin, setBtnLogin] = useState(true);
  // status notif
  const [notif, setNotif] = useState(null);
  // isi data form
  const isiData = (e) => setForm(formData(form, e.target.name, e.target.value));
  // action data
  const loginBtn = async () => {
    const result = await loginHttp(form);
    console.log(result);
    if (result.status.kode === "failed") {
      return setNotif(result.status.keterangan);
    }
    localStorage.setItem("kunci", result.access_token);
    localStorage.setItem("data", JSON.stringify(result.data));
    history.replace("/");
  };
  // live status danger field
  useEffect(() => {
    // username
    form.username !== "" && !validateEmail(form.username)
      ? setDanger((danger) => ({ ...danger, username: true }))
      : setDanger((danger) => ({ ...danger, username: false }));
    // password
    form.password !== "" && form.password.length < 6
      ? setDanger((danger) => ({ ...danger, password: true }))
      : setDanger((danger) => ({ ...danger, password: false }));
  }, [form]);
  // live status danger Btn Daftar
  useEffect(() => {
    danger.username ||
    danger.password ||
    form.username === "" ||
    form.password === ""
      ? setBtnLogin(true)
      : setBtnLogin(false);
  }, [form, danger]);
  return (
    <div className="registrasi">
      <div className="card-registrasi login">
        <h3 className="title-registrasi">Login</h3>
        {notif ? <p className="notif danger">{notif}</p> : null}
        <div className="group-row">
          <div className="group-input1">
            <label>Username</label>
            <input
              className={danger.username ? "input danger" : "input"}
              type="text"
              name="username"
              placeholder="Username"
              onChange={isiData}
            />
            {danger.username ? (
              <div className="label-danger2">Username tidak valid</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="group-row">
          <div className="group-input1">
            <label>Password</label>
            <input
              className={danger.password ? "input danger" : "input"}
              type="password"
              name="password"
              placeholder="Password"
              onChange={isiData}
            />
            {danger.password ? (
              <div className="label-danger2">Password tidak valid</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="parent-btn">
          <button
            className={btnLogin ? "btn-blue disabled" : "btn-blue"}
            onClick={loginBtn}
            disabled={btnLogin ? true : false}
          >
            Login
          </button>
        </div>
        <div className="link">
          <Link to="/register">Pendaftaran</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
