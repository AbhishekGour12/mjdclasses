import nodemailer from 'nodemailer';

let ContactMessage = async(from, subject, htmlContent) =>{
    try{
        console.log(from)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: "aggour124421@gmail.com",
                pass: "vupf wimf scix xtse"
            }
        })
        
        const mailOptions = {
            from,
            to: "mahendra@mjdclasses.in", 
            subject,
            html: htmlContent,
        }

        const info = await transporter.sendMail(mailOptions);
        console.log("message sent successfully"+info.messageId)
    }catch(err){
        console.log(err.message)
    }


}
export default ContactMessage;
