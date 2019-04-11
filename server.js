require("dotenv").config();
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
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: req.body.email, // sender address
    to: "gabriel.aragao.comp@gmail.com", // list of receivers
    subject: "Contato Omnitracker Site", // Subject line
    text: req.body.body, // plain text body
    html: `<b>A mensagem foi enviada de: ${req.body.name}, email: ${
      req.body.email
    } </b>
    <br><br><p>e o texto é: ${req.body.body}</p> ` // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("contact");
  });
});
