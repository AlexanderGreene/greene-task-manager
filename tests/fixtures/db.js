const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const testUserOneId = new mongoose.Types.ObjectId();
const testUserOne = {
	_id: testUserOneId,
	name: 'Jared',
	email: 'jared@example.com',
	password: 'testpass',
	tokens: [
		{
			token: jwt.sign({ _id: testUserOneId }, process.env.JWT_SECRET),
		},
	],
};

const testUserTwoId = new mongoose.Types.ObjectId();
const testUserTwo = {
	_id: testUserTwoId,
	name: 'Adam',
	email: 'adam@example.com',
	password: 'testpass2',
	tokens: [
		{
			token: jwt.sign({ _id: testUserTwoId }, process.env.JWT_SECRET),
		},
	],
};

const testTaskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Test task One',
	completed: false,
	owner: testUserOneId,
};

const testTaskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Test task Two',
	completed: true,
	owner: testUserOneId,
};

const testTaskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Test task Three',
	completed: true,
	owner: testUserTwoId,
};

const setupDatabase = async () => {
	await User.deleteMany();
	await Task.deleteMany();
	await new User(testUserOne).save();
	await new User(testUserTwo).save();
	await new Task(testTaskOne).save();
	await new Task(testTaskTwo).save();
	await new Task(testTaskThree).save();
};

module.exports = {
	testUserOne,
	testUserOneId,
	testUserTwo,
	testUserTwoId,
	testTaskOne,
	testTaskTwo,
	testTaskThree,
	setupDatabase,
};
