import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input1, Input2 } from "../../component/input1";
import { Select2 } from "../../component/select1";
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
  const jenisKelamin = [
    { id: 0, value: 0, title: "Jenis Kelamin" },
    { id: 1, value: 1, title: "Laki-laki" },
    { id: 2, value: 2, title: "Perempuan" },
  ];

  const jenisGroup = [
    { id: 0, value: "", title: "Pilih Group" },
    { id: 1, value: "member", title: "Member" },
    { id: 2, value: "mitra", title: "Mitra" },
  ];
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
    dataFix.jenis_kelamin = parseInt(dataFix.jenis_kelamin);
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
          <Input2
            title={"First Name"}
            danger={danger.firstname}
            pesan={"Bukan nama"}
            name={"firstname"}
            placeholder={"First Name"}
            type={"text"}
            value={form.firstname}
            isiData={isiData}
          />
          <Input2
            title={"Last Name"}
            danger={danger.lastname}
            pesan={"Bukan nama"}
            name={"lastname"}
            placeholder={"Last Name"}
            type={"text"}
            value={form.lastname}
            isiData={isiData}
          />
        </div>
        <div className="group-row">
          <Input2
            title={"Email"}
            danger={danger.email}
            pesan={"Harus email"}
            name={"email"}
            placeholder={"Email"}
            type={"text"}
            value={form.email}
            isiData={isiData}
          />
          <Input2
            title={"No. HP"}
            danger={danger.hp}
            pesan={"Harus No.HP"}
            name={"hp"}
            placeholder={"No. HP"}
            type={"text"}
            value={form.hp}
            isiData={isiData}
          />
        </div>
        <div className="group-row">
          <Input1
            title={"Tanggal Lahir"}
            isiData={isiData}
            danger={danger.tgl_lahir}
            name={"tgl_lahir"}
            placeholder={"Tanggal Lahir"}
            type={"date"}
            value={form.tgl_lahir}
            pesan={"Tanggal lahir harus diisi"}
          />
        </div>
        <div className="group-row">
          <Select2
            title={"Jenis Kelamin"}
            danger={danger.jenis_kelamin}
            name={"jenis_kelamin"}
            value={form.jenis_kelamin}
            isiData={isiData}
            option={jenisKelamin}
            pesan={"Jenis kelamin harus diisi"}
          />
          <Select2
            title={"Group"}
            danger={danger.grup}
            name={"grup"}
            value={form.grup}
            isiData={isiData}
            option={jenisGroup}
            pesan={"Group harus diisi"}
          />
        </div>
        <div className="group-row">
          <Input2
            title={"Password"}
            danger={danger.password}
            pesan={"Minimal 6 character"}
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            value={form.password}
            isiData={isiData}
          />
          <Input2
            title={"Konfirm Password"}
            danger={danger.password1}
            pesan={"Tidak sama dengan password"}
            name={"password1"}
            placeholder={"Konfirm Password"}
            type={"password"}
            value={form.password1}
            isiData={isiData}
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
