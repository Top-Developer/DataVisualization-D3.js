function displayTreeMap(){

	d3.select('div#overlay')
	.style('display', 'block');

	showTreeMap(project.layers[project.layer_count])
}
