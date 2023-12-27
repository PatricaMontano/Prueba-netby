const newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./Open Cart.postman_collection.json'),
    reporters: 'cli',
    insecure: true
}, function (err) {
	if (err) { throw err; }
    console.log('collection run complete!');
});