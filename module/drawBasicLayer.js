'use strict'

function generateHierarchy(theNodes){

	var sr = {
		'name': 'Support Resource',
		'children': []
	},
	pr = {
		'name': 'Production Resource',
		'children': []
	},
	sp = {
		'name': 'Semi-finished Product',
		'children': []
	},
	fp = {
		'name': 'Finished Product',
		'children': []
	};

	var root = {
		'name': 'root',
		'children': [sr, pr, sp, fp]
	};

	theNodes.forEach(function(n){
		if ( n['Type'] == 'SR' ){
			sr['children'].push(n);
		}
		else if ( n['Type'] == 'PR' ){
			pr['children'].push(n);
		}
		else if ( n['Type'] == 'SP' ){
			sp['children'].push(n);
		}
		else if ( n['Type'] == 'FP' ){
			fp['children'].push(n);
		};
	});

	return d3.hierarchy(root);
}

function drawBasicLayer(theProject, svg){

	var hierarchy = generateHierarchy(theProject['nodes']);
	hierarchy.sum(function(n){
		return parseInt(n['Variance']);
	})
	.sort(function(a, b) { return b.value - a.value; });

	console.log(hierarchy);

	var width = +svg.attr('width');console.log(width);
	var height = +svg.attr('height');console.log(height);
	var packLayer = d3.pack()
	 	.size( [width, height] );

	var node = svg.selectAll('.node')
		.data(packLayer(hierarchy).descendants())
		.enter()
		.append('g')
		.attr('class', function(d) {
			return d.children ? "node" : "leaf node";
		})
		.attr('transform', function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		});

	node.append('circle')
		.attr('r', function(d){ return d.r; })



}
