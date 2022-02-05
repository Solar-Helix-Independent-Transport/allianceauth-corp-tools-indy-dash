import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export async function loadDash() {
  const api = await axios.get(`/indy/api/structure/list`);
  console.log(`get structure list in api`);
  console.log(api);
  return api.data;
}
