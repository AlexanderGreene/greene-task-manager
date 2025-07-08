const mongoose = require('mongoose');
// import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL, {
	// deprecated connection options, but were used in the class. leaving for posterity
	// useNewUrlParser: true,
	// useCreateIndex: true,
	// useUnifiedTopology: true,
});

// uncomment this and switch the require/import statements to view collections without Compass
// const usersQuery = await User.find().exec();
// const tasksQuery = await Task.find().exec();

// console.log(usersQuery);
// console.log(tasksQuery);

// Commented out so it doesn't create duplicate records
// Uncomment to populate new instance of db
// const me = new User({
// 	name: 'Devon',
// 	email: 'notreallydevon@email.com',
// 	age: 44,
// 	password: 'nicePaSsWoRd',
// });

// const it = new Task({
// 	description: 'Do it! Seriously!',
// 	completed: false,
// });
// me.save()
// 	.then(() => {
// 		console.log(me);
// 	})
// 	.catch((error) => {
// 		console.error('Error!', error);
// 	});

// it.save()
// 	.then(() => {
// 		console.log(it);
// 	})
// 	.catch((error) => {
// 		console.error('Error!', error);
// 	});
