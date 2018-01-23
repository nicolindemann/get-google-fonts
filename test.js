process.on('uncaughtException', e => {
	console.log(`%c ${e.stack}`, 'color: red;')
})

const Q = require('q')
const ggf = require('./main.js')
const DEFAULT_GGF = new ggf({
	verbose: true,
	simulate: false,
	overwriting: false,
})

let tests = [
	// String @import
	'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=cyrillic',
	// String <link> (with special characters)
	'https://fonts.googleapis.com/css?family=Lobster&amp;subset=vietnamese',
	// Constructed
	ggf.constructUrl({
		Rajdhani: [700]
	}, [
		'devanagari'
	]),
	// Pass array for construct
	[{
		'Alegreya Sans SC': ['700', '700i'],
		'Alegreya+Sans+SC': ['400', '400i']
	}, [
		'greek'
	]],
	// Non-google's
	'http://weloveiconfonts.com/api/?family=entypo'
]

let res = Q()
tests.forEach((x, i) => {
	res = res.then(DEFAULT_GGF.download.bind(DEFAULT_GGF, x, {
		outputDir: `./fonts/test${i+1}/`
	}))
})
res.then(() => {
	require('child_process').spawn('start',['.\\test.html'], {
		shell: true
	})
})
