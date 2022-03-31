import { useHistory } from "react-router-dom";

const Dashboard = () => {
  let history = useHistory();
  const logoutBtn = () => {
    localStorage.removeItem("kunci");
    localStorage.removeItem("data");
    history.replace("/login");
  };
  return (
    <div className="registrasi">
      <div className="card-registrasi login">
        <h3 className="title-registrasi">Welcome</h3>
        <div className="parent-btn">
          <button className="btn-blue" onClick={logoutBtn}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
