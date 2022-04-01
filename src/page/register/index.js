import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  formData,
  validateEmail,
  validateHP,
  validateName,
} from "../../helper";
import { registerHttp } from "../../http";

const Registrasi = () => {
  // dataFrom
  const [form, setForm] = useState({
    email: "",
    hp: "",
    firstname: "",
    lastname: "",
    grup: "",
    tgl_lahir: "",
    jenis_kelamin: 0,
    password: "",
    password1: "",
  });
  // status danger field
  const [danger, setDanger] = useState({
    email: false,
    hp: false,
    firstname: false,
    lastname: false,
    grup: false,
    tgl_lahir: false,
    jenis_kelamin: false,
    password: false,
    password1: false,
  });
  // status danger Button Daftar
  const [btnDaftar, setBtnDaftar] = useState(true);
  // status notif
  const [notif, setNotif] = useState(null);
  // action isi form
  const isiData = (e) => {
    setForm(formData(form, e.target.name, e.target.value));
  };
  // action Btn Daftar
  const daftarBtn = async () => {
    const dataFix = form;
    const result = await registerHttp(dataFix);
    if (result.status.kode === "success") {
      setForm({
        email: "",
        hp: "",
        firstname: "",
        lastname: "",
        grup: "",
        tgl_lahir: "",
        jenis_kelamin: 0,
        password: "",
        password1: "",
      });
      setNotif(result.status.keterangan);
    }
    console.log(result);
  };
  // live status danger field
  useEffect(() => {
    // firstname
    form.firstname !== "" && validateName(form.firstname) === null
      ? setDanger((danger) => ({ ...danger, firstname: true }))
      : setDanger((danger) => ({ ...danger, firstname: false }));
    // lastname
    form.lastname !== "" && validateName(form.lastname) === null
      ? setDanger((danger) => ({ ...danger, lastname: true }))
      : setDanger((danger) => ({ ...danger, lastname: false }));
    // email
    form.email !== "" && !validateEmail(form.email)
      ? setDanger((danger) => ({ ...danger, email: true }))
      : setDanger((danger) => ({ ...danger, email: false }));
    // hp
    form.hp !== "" && validateHP(form.hp) === null
      ? setDanger((danger) => ({ ...danger, hp: true }))
      : setDanger((danger) => ({ ...danger, hp: false }));
    // tgl_lahir
    form.hp !== "" && validateHP(form.hp) !== null && form.tgl_lahir === ""
      ? setDanger((danger) => ({ ...danger, tgl_lahir: true }))
      : setDanger((danger) => ({ ...danger, tgl_lahir: false }));
    // jenis kelamin
    form.tgl_lahir !== "" && form.jenis_kelamin === 0
      ? setDanger((danger) => ({ ...danger, jenis_kelamin: true }))
      : setDanger((danger) => ({ ...danger, jenis_kelamin: false }));
    //group
    form.jenis_kelamin !== 0 && form.grup === ""
      ? setDanger((danger) => ({ ...danger, grup: true }))
      : setDanger((danger) => ({ ...danger, grup: false }));
    // password
    form.password !== "" && form.password.length < 6
      ? setDanger((danger) => ({ ...danger, password: true }))
      : setDanger((danger) => ({ ...danger, password: false }));
    // konfirm password
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
    form.grup === "" ||
    form.jenis_kelamin === 0 ||
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
        <div className="group-row">
          <div className="group-input">
            <label>First Name</label>
            <input
              className={danger.firstname ? "input danger" : "input"}
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={isiData}
            />
            {danger.firstname ? (
              <div className="label-danger">Minimal 3 huruf</div>
            ) : (
              <></>
            )}
          </div>
          <div className="group-input">
            <label>Last Name</label>
            <input
              className={danger.lastname ? "input danger" : "input"}
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={isiData}
            />
            {danger.lastname ? (
              <div className="label-danger">Minimal 3 huruf</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="group-row">
          <div className="group-input">
            <label>Email</label>
            <input
              className={danger.email ? "input danger" : "input"}
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={isiData}
            />
            {danger.email ? (
              <div className="label-danger">Harus email</div>
            ) : (
              <></>
            )}
          </div>
          <div className="group-input">
            <label>No. HP</label>
            <input
              className={danger.hp ? "input danger" : "input"}
              type="text"
              name="hp"
              placeholder="No. HP"
              value={form.hp}
              onChange={isiData}
            />
            {danger.hp ? (
              <div className="label-danger">Harus No.HP 12 digit</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="group-row">
          <div className="group-input1">
            <label>Tanggal Lahir</label>
            <input
              className={danger.tgl_lahir ? "input danger" : "input"}
              type="date"
              name="tgl_lahir"
              placeholder="Tanggal Lahir"
              value={form.tgl_lahir}
              onChange={isiData}
            />
            {danger.tgl_lahir ? (
              <div className="label-danger1">Tanggal lahir harus diisi</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="group-row">
          <div className="group-input">
            <label>Jenis Kelamin</label>
            <select
              className={danger.jenis_kelamin ? "input danger" : "input"}
              name="jenis_kelamin"
              value={form.jenis_kelamin}
              onChange={isiData}
            >
              <option value="0">Jenis Kelamin</option>
              <option value="1">Laki-laki</option>
              <option value="2">Perempuan</option>
            </select>
            {danger.jenis_kelamin ? (
              <div className="label-danger">Jenis kelamin harus diisi</div>
            ) : (
              <></>
            )}
          </div>
          <div className="group-input">
            <label>Group</label>
            <select
              className={danger.grup ? "input danger" : "input"}
              name="grup"
              value={form.grup}
              onChange={isiData}
            >
              <option value="">Pilih Group</option>
              <option value="member">Member</option>
              <option value="mitra">Mitra</option>
            </select>
            {danger.grup ? (
              <div className="label-danger">Group harus diisi</div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="group-row">
          <div className="group-input">
            <label>Password</label>
            <input
              className={danger.password ? "input danger" : "input"}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={isiData}
            />
            {danger.password ? (
              <div className="label-danger">Minimal 6 character</div>
            ) : (
              <></>
            )}
          </div>
          <div className="group-input">
            <label>Konfirm Password</label>
            <input
              className={danger.password1 ? "input danger" : "input"}
              type="password"
              name="password1"
              placeholder="Konfirm Password"
              value={form.password1}
              onChange={isiData}
            />
            {danger.password1 ? (
              <div className="label-danger">Tidak sama dengan password</div>
            ) : (
              <></>
            )}
          </div>
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
