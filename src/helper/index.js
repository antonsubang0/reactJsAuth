// helper form
const formData = (data, id, value) => {
  return {
    ...data,
    [id]: value,
  };
};
// helper regex email
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validateName = (nama) => {
  return String(nama).match(/^[a-zA-Z\s'-]{3,50}$/);
};

const validateHP = (hp) => {
  return String(hp).match(/^[0-9]{11,13}$/);
};

export { formData, validateEmail, validateName, validateHP };
