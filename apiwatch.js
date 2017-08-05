const request = require('request-promise');
const deepEqual = require('deep-equal');
const P = require('bluebird');

const secondsInterval = 30;
const urls = require('./urls');

const urlNames = Object.keys(urls);
const urlValues = Object.values(urls);

let prev = null;
function update() {
	P.all(urlValues.map(request))
	.then(rs => rs.map(r => r[1]))
	.then(curr => {
		if(prev === null)
			console.log(`Now watching changes on ${curr.length} pages.`);
		else for(let i = 0; i < urlNames.length; i++)
			if(!deepEqual(prev[i], curr[i]))
				console.log(`Page "${urlNames[i]}" is different!`);
		prev = curr;
	}).catch(console.error);
}
setInterval(update, 1000 * secondsInterval);
update();
