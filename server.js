//import app
const app = require("./backend/app");

//start server on :http://localhost:3000
app.listen(3000, () => {
  console.log("express application is satrting to lisetening on port 3000");
});
