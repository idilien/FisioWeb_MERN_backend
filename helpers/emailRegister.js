import nodemailer from 'nodemailer';

const emailRegister = async (data) => {
    const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
      });
      //SEND EMAIL
      const {name, email, token} =data;
      const info = await transporter.sendMail({
        from: "Fisio Web - Administración",
        to: email,
        subject: 'Confirma tu registro en FisioWeb',
        text: 'Confirmación de registro ',
        html: `<p>Hola  ${name}; </p>
                    <p>Registro en Fisio Web.
                    Confirma en el siguiente enlace:
                    <a href = "${process.env.FRONTEND_URL}/confirm/${token}">enlace</a></p>

                    <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
                    <p>Gracias por registrate,</p>
                    <p>Administración - Fisio Web.</p>
                    `,
      });
      console.log('Mensaje enviado: %s', info.messageId);
};

export default emailRegister;