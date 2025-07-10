const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');
const { testUserOne, testUserOneId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(async () => {
	await mongoose.connection.close();
});

test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'Alex',
			email: 'alexgreene39@example.com',
			password: 'testpass',
		})
		// Assert that the status code for the post request is correct
		.expect(201);

	// Assert that the database was changed correctly
	const userUnderTest = await User.findById(response.body.user._id);
	expect(userUnderTest).not.toBeNull();

	// Assertions about the response
	expect(response.body).toMatchObject({
		user: {
			name: 'Alex',
			email: 'alexgreene39@example.com',
		},
		token: userUnderTest.tokens[0].token,
	});

	expect(userUnderTest.password).not.toBe('testpass');
});

test('Should login existing user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: testUserOne.email,
			password: testUserOne.password,
		})
		.expect(200);

	const userUnderTest = await User.findById(response.body.user._id);
	expect(userUnderTest).not.toBeNull();

	expect(response.body.token).toBe(userUnderTest.tokens[1].token);
});

test('Should not log in nonexistent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: 'garbage@example.com',
			password: testUserOne.password,
		})
		.expect(403);
});

test('Should not log in user with bad password', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: testUserOne.email,
			password: 'garbagepass',
		})
		.expect(403);
});

test('Should get profile for user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.send()
		.expect(200);
	const userUnderTest = await User.findById(testUserOne._id);
	expect(userUnderTest).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/testimage.jpg')
		.expect(200);
	const user = await User.findById(testUserOneId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.send({
			name: 'Craig',
			age: 44,
		})
		.expect(200);

	const user = await User.findById(testUserOneId);
	expect(user.name).toBe('Craig');
	expect(user.age).toBe(44);
});

test('Should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${testUserOne.tokens[0].token}`)
		.send({
			shoeSize: 10.5,
		})
		.expect(400);
});

// TODO: Should not signup user with invalid name/email/password
// TODO: Should not update user if unauthenticated
// TODO: Should not update user with invalid name/email/password
// TODO: Should not delete user if unauthenticated
