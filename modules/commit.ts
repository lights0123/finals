import { resolve } from 'path';
const fs = require('fs').promises;
const { readFile } = fs;

async function getHeadCommit() {
	const rev = (await readFile(resolve('.git/HEAD'))).toString();
	if (rev.indexOf(':') === -1) {
		return rev.trim();
	}
	return (await readFile(resolve(`.git/${rev.substring(5).trim()}`))).toString().trim();
}

export default async function commit(moduleOptions) {
	const hash = await getHeadCommit();
	this.addPlugin({
		src: resolve(__dirname, '../plugins/commit.ts'),
		options: {
			hash,
		},
	});
}
