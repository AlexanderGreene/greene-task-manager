const express = require('express');
const multer = require('multer');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
	console.log('Server up and running on port ' + port);
});

// Saving removed code blocks for posterity
// const upload = multer({
// 	dest: 'images',
// 	limits: {
// 		fileSize: 1000000, // Number of bytes
// 	},
// 	fileFilter(req, file, cb) {
// 		if (!file.originalname.match(/\.(doc|docx)$/)) {
// 			return cb(
// 				new Error("Please upload a Word document. I'm begging you.")
// 			);
// 		}

// 		cb(undefined, true);

// 3 ways to use cb arg
// send an error
// cb(new Error('File must be a pdf or whatever'))
// success
// cb(undefined, true)
// silent failure
// cb(undefined, false)
// 	},
// });

// const errorMiddleware = (req, res, next) => {
// 	throw new Error('From my middleware');
// };

// app.post(
// 	'/upload',
// 	errorMiddleware,
// 	(req, res) => {
// 		res.send();
// 	},
// 	(error, req, res, next) => {
// 		res.status(400).send({ error: error.message });
// 	}
// );

// app.post(
// 	'/upload',
// 	upload.single('upload'),
// 	(req, res) => {
// 		res.send();
// 	},
// 	(error, req, res, next) => {
// 		res.status(400).send({ error: error.message });
// 	}
// );

//
// Without middleware: new request -> run route handler
//
// With middleware: new request -> do something -> run route handler
//

// app.use((req, res, next) => {
// 	if (req.method === 'GET') {
// 		res.send('GET requests are disabled');
// 	} else {
// 		next();
// 	}
// });

// Uncomment to enable Maintenance Mode
// app.use((req, res, next) => {
// 	res.status(503).send('Site is currently undergoing maintenance.');
// });

// Use populate to pull in task/user relationship data
// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
// 	const task = await Task.findById('68656eb725f738c8245958a4');
// 	await task.populate('owner');
// 	console.log(task.owner);
// 	const user = await User.findById('6863e5fc6323b9de911cec3d');
// 	await user.populate('tasks');
// 	console.log(user.tasks);
// };

// main();

// setting up endpoints via app.<method> without express.Router
// routes listed here have been moved to files in router directory
// USERS
// app.post('/users', async (req, res) => {
// 	const user = new User(req.body);

// 	try {
// 		await user.save();
// 		res.status(201).send(user);
// 	} catch (e) {
// 		res.status(400).send(e);
// 	}

// 	// user.save()
// 	// 	.then(() => {
// 	// 		res.send(user);
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(400).send(error);
// 	// 	});
// });

// app.get('/users', async (req, res) => {
// 	try {
// 		const users = await User.find({});
// 		if (users.length === 0) return res.status(404).send('No users found.');
// 		res.send(users);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}

// 	// User.find({})
// 	// 	.then((users) => {
// 	// 		if (users.length === 0)
// 	// 			return res.status(404).send('No users found.');
// 	// 		res.status().send(users);
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(500).send(error);
// 	// 	});
// });

// app.get('/users/:id', async (req, res) => {
// 	const _id = req.params.id;
// 	try {
// 		const user = await User.findById(_id);
// 		if (!user)
// 			return res.status(404).send(`User with id ${_id} not found.`);
// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}

// 	// User.findById(_id)
// 	// 	.then((user) => {
// 	// 		if (!user)
// 	// 			return res.status(404).send(`User with id ${_id} not found.`);
// 	// 		res.send(user);
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(500).send(error);
// 	// 	});
// });

// app.patch('/users/:id', async (req, res) => {
// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['name', 'email', 'password', 'age'];
// 	const isValidOperation = updates.every((update) =>
// 		allowedUpdates.includes(update)
// 	);

// 	if (!isValidOperation)
// 		return res.status(400).send({ error: 'Invalid updates.' });

// 	const _id = req.params.id;
// 	try {
// 		const user = await User.findByIdAndUpdate(_id, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});
// 		if (!user)
// 			return res.status(404).send(`User with id ${_id} not found.`);
// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// });

// app.delete('/users/:id', async (req, res) => {
// 	const _id = req.params.id;
// 	try {
// 		const user = await User.findByIdAndDelete(_id);
// 		if (!user) return res.status(404).send();
// 		res.send(user);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// });

// TASKS
// app.post('/tasks', async (req, res) => {
// 	const task = new Task(req.body);

// 	try {
// 		await task.save();
// 		res.status(201).send(task);
// 	} catch (e) {
// 		res.status(400).send(e);
// 	}

// 	// task.save()
// 	// 	.then(() => {
// 	// 		res.status(201).send(task);
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(400).send(error);
// 	// 	});
// });

// app.get('/tasks', async (req, res) => {
// 	try {
// 		const tasks = await Task.find({});
// 		if (tasks.length === 0) return res.status(404).send('No tasks found');
// 		res.send(tasks);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}

// 	// Task.find({})
// 	// 	.then((tasks) => {
// 	// 		if (tasks.length === 0)
// 	// 			return res.status(404).send('No tasks found.');
// 	// 		res.send(tasks);
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(500).send(error);
// 	// 	});
// });

// app.get('/tasks/:id', async (req, res) => {
// 	const _id = req.params.id;

// 	try {
// 		const task = await Task.findById(_id);
// 		if (!task)
// 			return res.status(404).send(`Task with id ${_id} not found.`);
// 		res.send(task);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}

// 	// Task.findById(_id)
// 	// 	.then((task) => {
// 	// 		if (!task)
// 	// 			return res.status(404).send(`Task with id ${_id} not found.`);
// 	// 		res.send(task);
// 	// 	})
// 	// 	.catch((error) => {
// 	// 		res.status(500).send(error);
// 	// 	});
// });

// app.patch('/tasks/:id', async (req, res) => {
// 	const updates = Object.keys(req.body);
// 	const allowedUpdates = ['description', 'completed'];
// 	const isValidOperation = updates.every((update) =>
// 		allowedUpdates.includes(update)
// 	);

// 	if (!isValidOperation)
// 		return res.status(400).send({ error: 'Invalid updates.' });

// 	const _id = req.params.id;
// 	try {
// 		const task = await Task.findByIdAndUpdate(_id, req.body, {
// 			new: true,
// 			runValidators: true,
// 		});
// 		if (!task)
// 			return res
// 				.status(404)
// 				.send({ error: `Task with id ${_id} not found.` });
// 		res.send(task);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// });

// app.delete('/tasks/:id', async (req, res) => {
// 	const _id = req.params.id;
// 	try {
// 		const task = await Task.findByIdAndDelete(_id);
// 		if (!task) return res.status(404).send();
// 		res.send(task);
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// });
