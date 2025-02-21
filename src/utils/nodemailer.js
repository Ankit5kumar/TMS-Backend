const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
  
    user: "melisa.pfeffer@ethereal.email",
    
    pass: "haSNPc32PS5dxAeB3Z",
  },
});

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main(email ,username , password) {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
        from: 'melisa.pfeffer@ethereal.email', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        // text: "you are successfully Registered", // plain text body
        html: `<b style={color : red;}>you are successfully Registered
        
        </b>
    
    <div>
      <p>
      below are the credentials which will need to login
      </p>
      
      <p>
      username: ${username}
      </p>
      <p>
      email: ${email}
      </p>
   
      <p>
      password: ${password}
      </p>
 
    </div>
        
        `, // html body
      });
      console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("error",error)
  }

  
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


