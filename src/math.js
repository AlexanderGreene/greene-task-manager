const calculateTotalWithTip = (total, tipPercentage) => {
	const tip = total * tipPercentage;
	return total + tip;
};

module.exports = {
	calculateTotalWithTip,
};
