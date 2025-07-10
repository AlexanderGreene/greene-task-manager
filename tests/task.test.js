const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
	testUserOne,
	testUserOneId,
	testTaskOne,
	testTaskTwo,
	testTaskThree,
	setupDatabase,
	testUserTwo,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.send({
			description: 'Test task',
		})
		.expect(201);
	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toBe(false);
	expect(task.description).toBe('Test task');
	expect(task.owner).toEqual(testUserOneId);
});

test('Should get all tasks for user', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body.length).toBe(2);
});

test('Should not delete tasks owned by different user', async () => {
	await request(app)
		.delete(`/tasks/${testTaskOne._id}`)
		.set('Authorization', `Bearer ${testUserTwo.tokens[0].token}`)
		.send()
		.expect(404);

	const taskUnderTest = await Task.findById(testTaskOne._id);
	expect(taskUnderTest).not.toBeNull();
});

// TODO: Should not create task with invalid description/completed
// TODO: Should not update task with invalid description/completed
// TODO: Should delete user task
// TODO: Should not delete task if unauthenticated
// TODO: Should not update other users task
// TODO: Should fetch user task by id
// TODO: Should not fetch user task by id if unauthenticated
// TODO: Should not fetch other users task by id
// TODO: Should fetch only completed tasks
// TODO: Should fetch only incomplete tasks
// TODO: Should sort tasks by description/completed/createdAt/updatedAt
// TODO: Should fetch page of tasks
