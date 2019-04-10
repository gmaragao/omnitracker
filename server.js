var express = require("express"),
  path = require("path"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;

app.listen(port, function(req, res) {
  console.log("Server is running at port: ", port);
});

app.get("/", function(req, res) {
  res.render("index");
});
app.get("/home", function(req, res) {
  res.render("index");
});
app.get("/about-us", function(req, res) {
  res.render("about_us");
});
app.get("/contact", function(req, res) {
  res.render("contact");
});
app.get("/bots", function(req, res) {
  res.render("bots");
});

app.post("/send-email", function(req, res) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gabriel.aragao.comp@gmail.com",
      pass: "86795682gb"
    }
  });
  let mailOptions = {
    from: `${req.body.first_name} ${req.body.last_name}`, // sender address
    to: "gabriel.aragao.comp@gmail.com", // list of receivers
    subject: "Será?", // Subject line
    text: req.body.body, // plain text body
    html: `<p>A mensagem foi enviada de: ${req.body.first_name} ${
      req.body.last_name
    } e o texto é: ${req.body.body} </p>` // html body
  };
  console.log(
    "first name:" +
      req.body.first_name +
      "last name" +
      req.body.last_name +
      "texto:" +
      req.body.body
  );

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("index");
  });
});
