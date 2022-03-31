import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formData, validateEmail } from "../../helper";
import { registerHttp } from "../../http";

const Registrasi = () => {
  // dataFrom
  const [form, setForm] = useState({
    email: "",
    hp: "",
    firstname: "",
    lastname: "",
    grup: "member",
    tgl_lahir: "",
    jenis_kelamin: 1,
    password: "",
    password1: "",
  });
  //   status danger field
  const [danger, setDanger] = useState({
    email: false,
    hp: false,
    firstname: false,
    lastname: false,
    grup: "member",
    tgl_lahir: false,
    jenis_kelamin: 1,
    password: false,
    password1: false,
  });
  //    status danger Button Daftar
  const [btnDaftar, setBtnDaftar] = useState(true);
  //    status notif
  const [notif, setNotif] = useState(null);
  //   action isi form
  const isiData = (e) => {
    setForm(formData(form, e.target.name, e.target.value));
  };
  //    action Btn Daftar
  const daftarBtn = async () => {
    const dataFix = form;
    const result = await registerHttp(dataFix);
    if (result.status.kode === "success") {
      setForm({
        email: "",
        hp: "",
        firstname: "",
        lastname: "",
        grup: "member",
        tgl_lahir: "",
        jenis_kelamin: 1,
        password: "",
        password1: "",
      });
      setNotif(result.status.keterangan);
    }
    console.log(result);
  };
  //   live status danger field
  useEffect(() => {
    form.firstname !== "" && form.firstname.length < 3
      ? setDanger((danger) => ({ ...danger, firstname: true }))
      : setDanger((danger) => ({ ...danger, firstname: false }));

    form.lastname !== "" && form.lastname.length < 3
      ? setDanger((danger) => ({ ...danger, lastname: true }))
      : setDanger((danger) => ({ ...danger, lastname: false }));

    form.email !== "" && !validateEmail(form.email)
      ? setDanger((danger) => ({ ...danger, email: true }))
      : setDanger((danger) => ({ ...danger, email: false }));

    form.hp !== "" && form.hp.length < 12
      ? setDanger((danger) => ({ ...danger, hp: true }))
      : setDanger((danger) => ({ ...danger, hp: false }));

    form.password !== "" && form.password.length < 6
      ? setDanger((danger) => ({ ...danger, password: true }))
      : setDanger((danger) => ({ ...danger, password: false }));

    form.password1 !== "" && form.password1 !== form.password
      ? setDanger((danger) => ({ ...danger, password1: true }))
      : setDanger((danger) => ({ ...danger, password1: false }));
  }, [form]);
  //   live status danger Btn Daftar
  useEffect(() => {
    danger.firstname ||
    danger.lastname ||
    danger.email ||
    danger.hp ||
    danger.password ||
    danger.password1 ||
    form.firstname === "" ||
    form.lastname === "" ||
    form.email === "" ||
    form.hp === "" ||
    form.password === "" ||
    form.password !== form.password1
      ? setBtnDaftar(true)
      : setBtnDaftar(false);
  }, [form, danger]);
  return (
    <div className="registrasi">
      <div className="card-registrasi">
        <h3 className="title-registrasi">Pendaftaran</h3>
        {notif ? <p className="notif success">{notif}</p> : null}
        {notif ? <p className="notif success">Silahkan Login....</p> : null}
        <div className="group-input">
          <input
            className={danger.firstname ? "input2 danger" : "input2"}
            type="text"
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={isiData}
          />
          <input
            className={danger.lastname ? "input2 danger" : "input2"}
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={isiData}
          />
        </div>
        <div className="group-input">
          <input
            className={danger.email ? "input2 danger" : "input2"}
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={isiData}
          />
          <input
            className={danger.hp ? "input2 danger" : "input2"}
            type="text"
            name="hp"
            placeholder="HP"
            value={form.hp}
            onChange={isiData}
          />
        </div>
        <div className="group-input">
          <input
            className="input1"
            type="date"
            name="tgl_lahir"
            placeholder="Tanggal Lahir"
            value={form.tgl_lahir}
            onChange={isiData}
          />
        </div>
        <div className="group-input">
          <select
            className="input2"
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={isiData}
          >
            <option value="1">Laki-laki</option>
            <option value="2">Perempuan</option>
          </select>
          <select
            className="input2"
            name="group"
            value={form.grup}
            onChange={isiData}
          >
            <option value="member">Member</option>
            <option value="mitra">Mitra</option>
          </select>
        </div>
        <div className="group-input">
          <input
            className={danger.password ? "input2 danger" : "input2"}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={isiData}
          />
          <input
            className={danger.password1 ? "input2 danger" : "input2"}
            type="password"
            name="password1"
            placeholder="Konfirm Password"
            value={form.password1}
            onChange={isiData}
          />
        </div>
        <div className="parent-btn">
          <button
            className={btnDaftar ? "btn-blue disabled" : "btn-blue"}
            onClick={daftarBtn}
            disabled={btnDaftar ? true : false}
          >
            Daftar
          </button>
        </div>
        <div className="link">
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Registrasi;
