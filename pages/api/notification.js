const path = require("path")
export default function (req, res) {
    require('dotenv').config({
        path: path.join(__dirname, "../../.env")
    })
    
    let nodemailer = require('nodemailer')
    if (req.method !== "POST") {
        res.status(405).send("only POST request allowed")
        return
    }

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD,
      },
      secure: true,
    })
    const mailData = {
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ADDRESS}>`,
      to: `${process.env.EMAIL_NAME} <${process.env.EMAIL_ADDRESS}>`,
      subject: `Notification from BananaCount`,
      text: `Product ${req.body.itemName} out of stock.`,
      html: `<div>Product ${req.body.itemName} out of stock.</div>`
    }
    transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info)
    })
    res.status(200).send("email sent")
  }