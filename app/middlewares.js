let express = global.variables.express,
    app =  global.variables.app,
    morgan = global.variables.morgan,
    session = global.variables.session,
    cors = global.variables.cors,
    bodyParser = global.variables.bodyParser,
    mongoose = global.variables.mongoose,
    passport = global.passport,
    helmet = global.variables.helmet,
    compression = global.variables.compression,
    mongo_express = require("mongo-express/lib/middleware"),
    ejs = require("ejs"),
    fs = require("fs"),
    path = require("path");

mongoose.connect(process.env.DB_URI);

app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(morgan("combined", {
  stream: fs.createWriteStream(path.join(__dirname, "./logs") + "/server.log", { flags: "a" })
}));
app.use(helmet());
app.use(compression());
app.use(session({
  cookieName: 'session',
  secret: 'dAnGkho4*7896#',
  duration: 1000 * 60 * 60 * 24 * 365 * 999,
  // activeDuration: 5 * 60 * 1000,
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/", require("./routes/index"));
app.use("/admin", mongo_express({
  mongodb: {
    connectionString: process.env.DB_URI,

    autoReconnect: true,
    poolSize: 4,
    admin: true,
    auth: [],

    adminUsername: "",
    adminPassword: "",
    whitelist: ["moneymoney"],
    blacklist: [],
  },

  site: {},

  useBasicAuth: true,
  basicAuth: {
    username: "admin",
    password: "admin"
  },

  options: {
    documentsPerPage: 10,
    editorTheme: "monokai",

    logger: { skip: () => true },
    readOnly: false,
  },

  defaultKeyNames: {},
}));
app.use("/v1", [
  require("./routes/authentication"),
  require("./routes/user"),
  require("./routes/card"),
  require("./routes/record"),
  require("./routes/note")
])

app.use((req, res) => {
  res.status(404).render("404");
})