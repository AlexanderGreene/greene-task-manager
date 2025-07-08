require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('685c5c60ba58c0e97236ab93')
// 	.then((task) => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then((result) => {
// 		console.log(result);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

deleteTaskAndCount('')
	.then((count) => {
		console.log(count);
	})
	.catch((e) => {
		console.error(error);
	});
