const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'greene.alexanderj@gmail.com',
		subject: 'Welcome to the Task Thingy!',
		text: `Welcome to the Task Thingy, ${name}! You can use it! Do the thingy! Ask me if you need a different thingy! \\nYour shoe is untied. \\nBest, Alex`,
	});
};

const sendCancellationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'greene.alexanderj@gmail.com',
		subject: "We're sad to see you go...",
		text: `But we love to watch you go, ${name}. Don\'t you...dah nah nah nah...forget about us...`,
	});
};

module.exports = {
	sendWelcomeEmail,
	sendCancellationEmail,
};

// Example very basic email send function call
// sgMail.send({
// 	to: 'greene.alexanderj@gmail.com',
// 	from: 'greene.alexanderj@gmail.com',
// 	subject: 'This is a test email from task-manager to myself.',
// 	text: 'I hope this email finds you well. \\nYour shoe is untied. \\nBest, Alex',
// });
