import nodemailer from 'nodemailer';

const emailForgetPassword = async (data) => {
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
        subject: 'Restablece tu Password - FisioWeb',
        text: 'Restablece tu password ',
        html: `<p>Hola  ${name}; </p>
                    <p>Has solicitado un cambio de contraseña.
                    Confirma en el siguiente enlace:
                    <a href = "${process.env.FRONTEND_URL}/forget/${token}">enlace</a></p>

                    <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
                    <p>Gracias por registrate,</p>
                    <p>Administración - Fisio Web.</p>
                    `,
      });
      console.log('Mensaje enviado: %s', info.messageId);
};

export default emailForgetPassword;