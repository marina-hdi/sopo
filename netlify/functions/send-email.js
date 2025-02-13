const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const { fileNameCsv, csvContent, recipient, adresseValueLower, formattedDate } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Use true if using port 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        let mailOptions = {
            from: `RELEVE SOPODEX <marina.nahdi@gmail.com>`, // Use a verified email
            to: recipient,
            subject: `NOUVEAU RELEVÉ : ${adresseValueLower.toUpperCase()}`, // ✅ Updated subject with uppercase address
            text: `Relevé chaufferie\n${adresseValueLower}\nEffectué le ${formattedDate}`, // ✅ Updated text with line breaks
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
