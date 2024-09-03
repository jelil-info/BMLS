const express = require("express");
const formModel = require("../models/form");
const path = require('path');
const app = express();
// Nodemailer
const nodemailer = require("nodemailer");
// Importing isomorphic-fetch package
const fetch = require("isomorphic-fetch");
// Import multer
const multer = require("multer");

const Queue = require('bull');
// Import dotenv
require("dotenv").config();

var request = require('request');

//const pug = require('pug');

//const Email = require('email-templates');

//const { nodemailerMjmlPlugin } = require('nodemailer-mjml');
const fs = require('fs').promises;
//const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
//import fetch from 'node-fetch';
//const fetch2 = require('node-fetch'); // Use require for Node.js
//const fetch2 = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//const fetch2 = require("node-fetch");
const mustache = require("mustache");
const mjml = require("mjml");





//const compiledFunction = pug.compileFile('templates/email-template.pug');
//const { mjml2html } = require('mjml'); // tslint:disable-line
//const mjml2html = require('mjml');
//var mjml2html = require('mjml-browser')
//const renderTemplate = require("../src/renderTemplate");
//const mjmlTemplate = fs.readFileSync('email.mjml', 'utf-8');
//const mjml = require('mjml');

// Compile the MJML template
//const template = mjml.compileFromFile('template.mjml');

// Render the template with data
/*const html = template({
  name: 'John Doe'
});*/


// Read the MJML template file

//const mjmlTemplate = await fs.readFile("./src/template.mjml", "utf-8");




//const { validateEmail } = require('./validator')

//const signupTemplet = require('./signup')

// To accept HTML form data

app.use(express.urlencoded({ extended: false }));


// Making public folder static where index.html file is present
// By making it static, we can easily serve index.html page

app.use(express.static("public"));








/*app.post("/form", async (request, response) => {
  const form = new formModel(request.body);

  try {
    await form.save();
    //response.send(food);
    //response.send("Name saved to database");
    response.sendFile(path.join(__dirname, '/thanksForSending.html'));

  } catch (error) {
    response.status(500).send(error);
  }
});*/

// Multer file storage

/*const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./attachments");
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});*/

// Middleware to get attachments

/*const attachmentUpload = multer({
  storage: Storage,
}).single("attachment");*/


// Convert MJML to HTML
//mjml2html(mjmlTemplate, { validationLevel: 'soft' }).then(({ html }) => {
// Create transporter
/*const transporter = nodemailer.createTransport({
    // transporter configuration options
  });*/

//const Eta = require("eta");


//const cors = require("cors");
//const bodyParser = require("body-parser");s

//const app = express();
//app.engine("eta", Eta.renderFile);
/*async function renderTemplate(data) {

  // Use data from the request body to personalize the email
  const { name, email } = data;

const mjmlTemplate = await fs.readFile("./src/template.mjml", "utf-8");

// Modify the template with dynamic data
const modifiedTemplate = mjmlTemplate
  .replace(/<%=\s*it\.name\s*%>/g, "name")
  .replace(/<%=\s*it\.company\s*%>/g, "name")
  .replace(/<%=\s*it\.message\s*%>/g, "name")

// Convert the modified MJML to HTML using mjml2html
const { html } = mjml2html(modifiedTemplate);

return html;

}
app.set("view engine", "eta");*/
//app.set("views", "./views");



// don't forget the `.html`




// Instantiate the SMTP server
// Authenticating and creating a method to send a mail
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "infotechcrush@yahoo.com", // generated ethereal user
    pass: process.env.Brevo_Token, // generated ethereal password
    //type: "OAuth2",
    //user: process.env.SENDER_EMAIL,
    //accessToken,
    //clientId: process.env.OAUTH_CLIENT_ID,
    //clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

/*transporter.use('compile', nodemailerMjmlPlugin({
  templateFolder: path.join(__dirname, 'template') // Specify your template directory
}));*/

//transporter.use('compile', nodemailerMjmlPlugin());





/* Root directory -homepage
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});*/





// Route to handle sending mails



// Pulling out the form data from the request body
//const recipient = req.body.email;
//const mailSubject = req.body.subject;
//const mailBody = req.body.message;
//const attachmentPath = req.file?.path;

// POST route from contact form
app.post("/form", async (req, res) => {

  // Read the HTML template and image file
  //const htmlTemplate =  readFileAsync('templates/template.html', 'utf-8');
  //const imageAttachment =  readFileAsync('templates/01.jpg');

  //const name = req.body.name;

  // getting site key from client side

  const response_key = req.body["g-recaptcha-response"];

  // Put secret key here, which we get from google console

  const secret_key = process.env.recaptcha_key;


  // Hitting POST request to the URL, Google will

  // respond with success or error scenario.

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;


  // Making POST request to verify captcha

  fetch(url, {

    method: "post",

  })

    .then((response) => response.json())

    .then((google_response) => {


      // google_response is the object return by

      // google as a response

      if (google_response.success == true) {

        //   if captcha is verified

        return res.sendFile(path.join(__dirname, '/thanksForSending.html'));

      } else {

        // if captcha is not verified

        //return res.send({ response: "Failed" });
        return res.sendFile(path.join(__dirname, '/failed-Nocaptcha.html'));
        //return console.log('Server received our data');

      }

    })

    .catch((error) => {

      // Some error while verify captcha

      return res.json({ error });

    });

  /*const email1 = req.body.email
 if (email1) {
 //const email = req.body.email;
 res.status(404).json({ message: 'The user already exist!' });
 console.error('Error sending test email');
} else {}*/

  //const form = new formModel(req.body);





  // Pulling out the form data from the request body
  const recipient = req.body.email;
  const mailSubject = "Welcome to infotechcrush.com" //req.body.subject;
  const mailBody = req.body.message;

  const templateData = {
    "user": req.body.name,
    "message": req.body.message
  };


  const fs = require('fs');
  /*const signUpHTML = mjml2html(
    fs.readFileSync(
      path.resolve(__dirname, './email/template.mjml'), 'utf8'
    )
  ).html;*/

  const mjmlSource = fs.readFileSync(path.resolve(__dirname, './email/template.mjml'), 'utf8');
  const mjmlTemplate = mjmlSource;
  const renderedMJML = mustache.render(mjmlTemplate, templateData);
  const html = mjml(renderedMJML).html;

  //const attachmentPath = req.file?.path;
  //const name1 = req.body.name;
  //const subject = 'Welcome to My Website';
  //const html = compiledFunction({ name });
  /*const htmlOutput = mjml2html(`
  <mjml>
    <mj-body>
      <mj-section>
        <mj-column>
          <mj-text>
            Hello World!
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`, options)*/

  // Destructing submitted client data.
  //const { name, email } = req.body;

  // Dynamically populating email template.
  //const renderedTemplate = await renderTemplate(req.body);

  // Sender Email to user.
  //const result = await senderEmail(renderedTemplate, email, subject);

  /*const htmlOutput = mjml2html(`
    <mjml>
    <mj-body>
      <mj-raw>

      </mj-raw>
      <mj-section background-color="#f0f0f0">
        <mj-column>
          <mj-text font-style="italic" font-size="20px" color="#626262">My Company</mj-text>
        </mj-column>
      </mj-section>
      <mj-raw>

      </mj-raw>
      <mj-section background-url="http://1.bp.blogspot.com/-TPrfhxbYpDY/Uh3Refzk02I/AAAAAAAALw8/5sUJ0UUGYuw/s1600/New+York+in+The+1960's+-+70's+(2).jpg" background-size="cover" background-repeat="no-repeat">
        <mj-column width="600px">
          <mj-text align="center" color="#fff" font-size="40px" font-family="Helvetica Neue">Slogan here</mj-text>
          <mj-button background-color="#F63A4D" href="#">Promotion</mj-button>
        </mj-column>
      </mj-section>
      <mj-raw>

      </mj-raw>
      <mj-section background-color="#fafafa">
        <mj-column width="400px">
          <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">My Awesome Text</mj-text>
          <mj-text color="#525252">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum enim eget magna efficitur, eu semper augue semper. Aliquam erat volutpat. Cras id dui lectus. Vestibulum sed finibus lectus, sit amet suscipit nibh. Proin nec commodo purus.
            Sed eget nulla elit. Nulla aliquet mollis faucibus. Hello,   req.body.name . This message is from infotechcrush ",</mj-text>
          <mj-button background-color="#F45E43" href="#">Learn more</mj-button>
        </mj-column>
      </mj-section>
      <mj-raw>

      </mj-raw>
      <mj-section background-color="white">
        <mj-raw>

        </mj-raw>
        <mj-column>
          <mj-image width="200px" src="https://designspell.files.wordpress.com/2012/01/sciolino-paris-bw.jpg"></mj-image>
        </mj-column>
        <mj-raw>

        </mj-raw>
        <mj-column>
          <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">Find amazing places</mj-text>
          <mj-text color="#525252">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum enim eget magna efficitur, eu semper augue semper. Aliquam erat volutpat. Cras id dui lectus. Vestibulum sed finibus lectus.</mj-text>
        </mj-column>
      </mj-section>
      <mj-raw>

      </mj-raw>
      <mj-section background-color="#fbfbfb">
        <mj-column>
          <mj-image width="100px" src="http://191n.mj.am/img/191n/3s/x0l.png"></mj-image>
        </mj-column>
        <mj-column>
          <mj-image width="100px" src="http://191n.mj.am/img/191n/3s/x01.png"></mj-image>
        </mj-column>
        <mj-column>
          <mj-image width="100px" src="http://191n.mj.am/img/191n/3s/x0s.png"></mj-image>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`)*/

  /*const fs = require('fs');
  const signUpHTML = mjml2html(
    fs.readFileSync(
      path.resolve(__dirname, './src/template.mjml'), 'utf8'
    )
  ).html;*/

  /*const signUpTXT = fs.readFileSync(
    path.resolve(__dirname, './src/template.txt'), 'utf8'
  );*/

  // Specify what the email will look like
  let mailOptions = {
    from: process.env.Brevo_Sender,
    to: recipient,
    subject: "Hello, " + req.body.name,
    html: html,
    //html: signUpHTML,
    //html: htmlOutput,
    /*html: await mjml2html.compileFromFile('welcome.mjml', { // Compile MJML template
      // Your data to be injected into the template
      name: 'John Doe'
    }),*/
    //subject: 'Hello from MJML and Nodemailer!',
    //html: html
    //subject: mailSubject,
    //text: "Hello, " +  req.body.name + ". This message is from infotechcrush ", // plain text body
    //html: "<strong>Hello, ${req.body.name}</strong> <p>Thank you for filling the form</p>",
    //template: 'welcome',
    //subject,
    //html
    //subject: 'Test email',
    //mjml: '<mjml>'


    //mjml: htmlOutput

    //html: htmlTemplate,
    /*attachments: [{
        filename: 'image.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'uniqueImageCID', // Referenced in the HTML template
    }],*/

    //text: mailBody,
    /*attachments: [
      {
        path: attachmentPath,
      },
    ],*/
  };

  const internalEmail = {
      from: req.body.email, // User's email address
      //to: ['support@infotechcrush.com','oyekanmijelili@yahoo.com'], // Internal recipient address
      to: 'infotechcrusher@gmail.com', // Internal recipient address
      subject: 'New Contact Submission',
      //text: "A new contact form has been submitted!" + "email:" req.body.email + "user:" req.body.name + "message:" req.body.message+".",
      text: `A new contact form has been submitted to infotechcrush.com!
      Email: ${req.body.email}
      User: ${req.body.name}
      Message: ${req.body.message}`,


    };
    // Generate a unique ID for this email submission
    //const emailId = Math.random().toString(36).substring(2, 15);

  try {




    const formData = new formModel(req.body);

    // Check if an email with this ID already exists
    //const existingSubmission = await formModel.findOne({ email: formData.email, user: formData.name });
    const existingSubmission = await formModel.findOne({ email: formData.email });

    if (existingSubmission) {
      // Email already submitted, handle it (e.g., send a notification)
      //console.log('Email already submitted with ID:', emailId);
      //return res.status(429).send('Email already submitted. Please try again later.');
      //return res.sendFile(path.join(__dirname, '/failed-double-submit.html'));
      
      // You can send a notification to the user here
      console.log('Double Submission is not allowed!');
      return;
    }

    // Create a new EmailSubmission document
    //const newSubmission = new formModel(req.body);
    await formData.save();



    //await formData.save();

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(internalEmail);
    console.log('Emails sent successfully!');
    //response.send(food);
    //response.send("Name saved to database");
    //res.sendFile(path.join(__dirname, '/thanksForSending.html'));
    //let emailTransporter = await createTransporter();


    // Attempt to send the email
    // Send email
    /*let info = await transporter.sendMail(mailOptions, internalEmail, function (error, info) {
      if (error) {
        // failed block
        console.log(error);
      } else {
        // Success block
        console.log("Email sent: " + info.response);

      }
    });*/
    // Get response from the createTransport
    //let emailTransporter = await createTransporter();

    // Send email
    /*emailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // failed block
        console.log(error);
      } else {
        // Success block
        console.log("Email sent: " + info.response);

        // Delete file from the folder after sent
        fs.unlink(attachmentPath, function (err) {
          if (err) {
            return res.end(err);
          } else {
            console.log(attachmentPath + " has been deleted");
            return res.redirect("/success.html");
          }
        });
      }
    });*/





  } catch (error) {
    return console.log(error);
    //response.status(500).send(error);
  }







});


app.get("/forms", async (request, response) => {

  const forms = await formModel.find({});

  try {
    response.send(forms);
  } catch (error) {
    response.status(500).send(error);
  }
});


// ...




app.patch("/form/:id", async (request, response) => {
  try {
    await formModel.findByIdAndUpdate(request.params.id, request.body);
    await formModel.save();
    response.send(form);
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...


// ...

app.delete("/form/:id", async (request, response) => {
  try {
    const form = await formModel.findByIdAndDelete(request.params.id);

    if (!form) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ...



module.exports = app;
