/*
 * @Author: govind
 * @Date:   2018-05-24 04:02:00
 * @Last Modified by:   govindrao54
 * @Last Modified time: 2018-05-25 18:28:26
 */

const crypto = require('crypto');
const chalk = require('chalk');
const log = console.log;

const operation = process.argv[2];
const count = process.argv[3];

if (!operation || (!count || !(count > 0 && count < 20))) {
    log(chalk.yellow(`\n
		Usage: node demo2.js [operation] [count]\n
		operation: --sync or --async
		count: integer 1 to 20\n
    `));
    process.exit(0);
}

for (let i = 0; i < count; i++) {
    console.time(chalk.green('Task - ' + i));
}

// synchronous version
if (operation === '--sync') {
    for (let i = 0; i < count; i++) {
        crypto.pbkdf2Sync('secret', 'salt', 10000, 512, 'sha512');
        console.timeEnd(chalk.green('Task - ' + i));
    }
}

// asynchronous version
if (operation === '--async') {
    for (let i = 0; i < count; i++) {
        crypto.pbkdf2('secret', 'salt', 10000, 512, 'sha512', () => {
            console.timeEnd(chalk.green('Task - ' + i));
        });
    }
}