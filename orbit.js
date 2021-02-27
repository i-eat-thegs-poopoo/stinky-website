function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const width = 45
const height = 45

function coordsToText(loc) {
	const empty = '   '
	const point = ' # '
	const coordx = Math.min(Math.max(loc[0],1), width);
	const coordy = Math.min(Math.max(loc[1],1), height);
	const prev = ('|' + empty.repeat(width) + '|\n').repeat(coordy - 1) + '|' + empty.repeat(coordx - 1)
	const next = empty.repeat(width - coordx) + '|' + ('\n|' + empty.repeat(width) + '|').repeat(height - coordy)
	const canvas = '|' + '---'.repeat(width) + '|\n' + prev + point + next + '\n|' + '---'.repeat(width) + '|'
	return canvas
}

function sunToText (text) {
	return text.slice(0,Math.floor(text.length / 2)) + 'O' + text.slice(Math.ceil(text.length / 2),text.length)
}

function addVectors(vec1,vec2) {
	return [vec1[0] + vec2[0],vec1[1] + vec2[1]]
}

function vectorLengthTo(vec) {
	const length = Math.sqrt((vec[0] ** 2) + (vec[1] ** 2))
	return [vec[0] / length,vec[1] / length]
}

function gravityCenter(loc) {
	const center = [Math.ceil(width / 2),Math.ceil(height / 2)]
	const gravityVector = [center[0] - loc[0],center[1] - loc[1]]
	let gravityVectorNew = vectorLengthTo(gravityVector)
	const gravityDistance = Math.sqrt((gravityVector[0] ** 2) + (gravityVector[1] ** 2))
	gravityVectorNew = [0.8 ** gravityDistance * gravityVectorNew[0],0.8 ** gravityDistance * gravityVectorNew[1]]
	return gravityVectorNew
}

console.log(coordsToText([8,12]))

let location = [24,36]
let inertia = [0.8,0]

console.log(`location: (${location}), inertia: <${inertia}>, gravity: <${gravityCenter(location)}>`)

async function orbit() {
	for(i = 0; i < 150; i++) {
		await sleep(150)
		inertia = addVectors(inertia,gravityCenter(location))
		location = addVectors(location,inertia)
		showLocation = [Math.round(location[0]),Math.round(location[1])]
		console.log(sunToText(coordsToText(showLocation)))
		console.log(`location: (${location}), inertia: <${inertia}>`)
	}
}

orbit()