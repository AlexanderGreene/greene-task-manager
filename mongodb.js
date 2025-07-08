// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
// destructured version of above requires
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();

MongoClient.connect(
	connectionURL,
	// no longer needed in current version of MongoDB (4.x.x and above); serves up warning on script run
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) return console.log('Unable to connect to database', error);

		const db = client.db(databaseName);

		// Since MongoDB Compass won't work on my machine I need to log all the entries to see collections
		// Uncomment to see these collections
		// db.collection('users')
		// 	.find()
		// 	.toArray((error, results) => {
		// 		if (error) return console.error(error);
		// 		console.log(results);
		// 	});
		// db.collection('tasks')
		// 	.find()
		// 	.toArray((error, results) => {
		// 		if (error) return console.error(error);
		// 		console.log(results);
		// 	});
	}
);
// The below function calls will run when we run the script and populate their associated collection
// They are commented below for posterity
// CREATE
// db.collection('users').insertOne(
// 	{
// You can specify an id or the
// 		_id: id,
// 		name: 'Kelley',
// 		age: 34,
// 	},
// 	(error, result) => {
// 		if (error) return console.log('Unable to insert user', error);
// 		console.log('It happened!', result.ops);
// 	}
// );
// db.collection('users').insertMany(
// 	[
// 		{
// 			name: 'Alexander',
// 			age: 38,
// 		},
// 		{
// 			name: 'Kelley Victoria',
// 			age: 34,
// 		},
// 		{
// 			name: 'Arthur',
// 			age: 8,
// 		},
// 	],
// 	(error, result) => {
// 		if (error) return console.log('Unable to insert user', error);
// 		console.log('We did it!', result.ops);
// 	}
// );
// db.collection('tasks').insertMany(
// 	[
// 		{
// 			description: 'Eat',
// 			completed: false,
// 		},
// 		{
// 			description: 'Pray',
// 			completed: false,
// 		},
// 		{
// 			description: 'Live',
// 			completed: true,
// 		},
// 		{
// 			description: 'Laugh',
// 			completed: true,
// 		},
// 		{
// 			description: 'Love',
// 			completed: false,
// 		},
// 		{
// 			description: 'Basketball',
// 			completed: true,
// 		},
// 	],
// 	(error, result) => {
// 		if (error) return console.log("I didn't do it right", error);
// 		console.log('I did it right!', result.ops);
// 	}
// );
// READ
// db.collection('users').findOne(
// 	{ _id: new ObjectId('685ad0d34ba66f52088b1b74') },
// 	(error, result) => {
// 		if (error) return console.log('Something done hecked up.', error);
// 		if (!result) return console.log('User not found.');
// 		console.log(result);
// 	}
// );
// db.collection('users')
// 	.find({ age: 38 })
// 	.toArray((error, users) => {
// 		if (error) return console.error(error);
// 		console.log(users);
// 	});

// db.collection('users')
// 	.find({ age: 34 })
// 	.count((error, count) => {
// 		if (error) return console.error(error);
// 		console.log(count);
// 	});

// db.collection('tasks').findOne(
// 	{
// 		_id: new ObjectId('685acd1ad2fdff2abcd5e6bc'),
// 	},
// 	(error, result) => {
// 		if (error) return console.error(error);
// 		console.log(result);
// 	}
// );

// db.collection('tasks')
// 	.find({ completed: false })
// 	.toArray((error, tasks) => {
// 		if (error) return console.error(error);
// 		console.log(tasks);
// 	});
// UPDATE
// db.collection('users')
// 	.updateOne(
// 		{
// 			_id: new ObjectId('685ab2d22e63d24d78b63fec'),
// 		},
// 		{
// 			// $set: {
// 			// 	name: 'Dickie Lovelady',
// 			// },
// 			$inc: {
// 				age: -3,
// 			},
// 		}
// 	)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

// ^ same as this
// const updatePromise = db.collection('users').updateOne(
// 	{
// 		_id: new ObjectId('685ab2d22e63d24d78b63feb'),
// 	},
// 	{
// 		$set: {
// 			name: 'Clebthorn',
// 		},
// 	}
// );

// updatePromise
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
// db.collection('tasks')
// 	.updateMany(
// 		{
// 			completed: false,
// 		},
// 		{
// 			$set: {
// 				completed: true,
// 			},
// 		}
// 	)
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
// DELETE
// db.collection('users')
// 	.deleteMany({
// 		age: 38,
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
// db.collection('tasks')
// 	.deleteOne({ description: 'Basketball' })
// 	.then((result) => {
// 		console.log(result.deletedCount);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
