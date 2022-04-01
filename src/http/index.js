const APP_URL = "http://202.157.184.201:8000";

//  send via urlencoded
const loginHttp = async (data) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", data.username);
    urlencoded.append("password", data.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${APP_URL}/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
};

// send via JSON
const registerHttp = async (data) => {
  return new Promise((resolve, reject) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const dataSiap = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: dataSiap,
      redirect: "follow",
    };

    fetch(`${APP_URL}/users`, requestOptions)
      .then((response) => response.json())
      .then((result) => resolve(result))
      .catch((error) => console.log("error", error));
  });
};

export { loginHttp, registerHttp };
