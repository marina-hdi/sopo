const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const { fileName, csvContent, recipient } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            host: "smtp.office365.com", // Microsoft SMTP server
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: `NOUVEAU RELEVE: ${fileNameCsv}`,
            text: ${fileNameCsv}`,
            attachments: [{
                filename: fileNameCsv,
                content: csvContent
            }]
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Mail envoyé:", info.response);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Mail envoyé!" })
        };

    } catch (error) {
        console.error("Erreur lors de l'envoi:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
