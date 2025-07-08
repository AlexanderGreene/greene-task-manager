require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('685d8ffa0f31e982d185d048', { age: 1 })
// 	.then((user) => {
// 		console.log(user);
// 		return User.countDocuments({ age: 0 });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });

	return count;
};

updateAgeAndCount('685d8ffa0f31e982d185d048', 2)
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.error(e);
	});
