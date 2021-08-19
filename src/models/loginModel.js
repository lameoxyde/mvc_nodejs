const login = [
  { name: "login1", type: "okok", price: 2 },
  { name: "login2", type: "ok", price: 10 }
];

const reg = "ok";

module.exports = {
  getLogin : ()=>{
    return login;
  },
  register : ()=>{
    return reg;
  }
}