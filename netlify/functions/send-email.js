const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    try {
        const { fileName, csvContent, recipient } = JSON.parse(event.body);

        let transporter = nodemailer.createTransport({
            service: "gmail", // Or use another SMTP service
            auth: {
                user: process.env.EMAIL_USER, // Set this in Netlify environment variables
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: `CSV File: ${fileName}`,
            text: "Here is your CSV file.",
            attachments: [{
                filename: fileName,
                content: csvContent
            }]
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
