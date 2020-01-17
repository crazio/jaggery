const app = require("express")();
//const cds = require("@sap/cds");
//
//cds.connect.to("db");
//cds.serve("all").in(app);

 const PORT = process.env.PORT || 4004;
 app.listen(PORT);