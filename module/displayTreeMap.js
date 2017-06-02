function displayTreeMap(){

	d3.select('#overlay')
	.style('display', 'block');

	showTreeMap(project.layers[project.layer_count])
}
