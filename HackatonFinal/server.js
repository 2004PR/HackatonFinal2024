const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const userRoutes = require("./app/routes/user.routes.js")
const productRoutes = require("./app/routes/product.routes.js")
const authRoutes = require("./app/routes/auth.routes.js")
const paymentRoutes = require("./app/routes/payment.routes.js")
const app = express();
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "auth-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hola");
});

userRoutes(app);
authRoutes(app);
productRoutes(app);
paymentRoutes(app);

const dbConfig = require("./app/config/db.config.js");
const db = require("./app/models/index.js");
const Role = db.role;

db.mongoose
.connect(`mongodb+srv://${dbConfig.HOST}:${dbConfig.PORT}@${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
