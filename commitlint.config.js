const configuration = {
	extends: ['@commitlint/config-conventional'],
	/*
	 * Functions that return true if commitlint should ignore the given message.
	 */
	ignores: [(commit) => commit === ''],
};

module.exports = configuration;
