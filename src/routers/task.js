const express = require('express');
const auth = require('../middleware/auth');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});
	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc (or asc)
router.get('/tasks', auth, async (req, res) => {
	const match = {};
	const sort = {};

	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		// const tasks = await Task.find({ owner: req.user._id });
		await req.user.populate({
			path: 'tasks',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip),
				sort,
			},
		});
		if (req.user.tasks.length === 0)
			return res.status(404).send('No tasks found');
		res.send(req.user.tasks);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task)
			return res.status(404).send(`Task with id ${_id} not found.`);
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation)
		return res.status(400).send({ error: 'Invalid updates.' });

	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id });

		// If we didn't need to run middleware on updates we could do it this way
		// const task = await Task.findByIdAndUpdate(_id, req.body, {
		// 	new: true,
		// 	runValidators: true,
		// });

		if (!task)
			return res
				.status(404)
				.send({ error: `Task with id ${_id} not found.` });

		updates.forEach((update) => (task[update] = req.body[update]));

		await task.save();

		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

// Drop the database without MongoDB Compass or similar GUI
// router.delete('/tasks/db', auth, async (req, res) => {
// 	try {
// 		Task.collection.drop();
// 		res.send();
// 	} catch (e) {
// 		console.log(e);
// 		res.status(500).send(e);
// 	}
// });

router.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOneAndDelete({
			_id,
			owner: req.user._id,
		});
		if (!task) return res.status(404).send();
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
