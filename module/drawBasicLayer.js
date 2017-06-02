'use strict'

var custom_shapes = {
	hexagon: function(height, width) {
		var points = [ [width, 0], [width/2, height*.865], [-width/2, height*.865], [-width, 0],[-width/2, -height*.865],[width/2, -height*.865],[width, 0] ]
		return d3.line()(points);
	},
	parallelogram: function(height, width) {
		var points = [ [width*1.5, height*.865], [-width/2, height*.865], [-width*1.5, -height*.865], [width/2, -height*.865], [width*1.5, height*.865] ]
		return d3.line()(points);
	},
	arrow: function(height, width) {
		var points = [ [width, 0], [width/2, height*.865], [-width*1.5, height*.865], [-width, 0], [-width*1.5, -height*.865], [width/2, -height*.865], [width, 0] ]
		return d3.line()(points);
	}
}

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
			n['Color'] = '#90d4f7';
			sr['children'].push(n);
		}
		else if ( n['Type'] == 'PR' ){
			n['Color'] = '#882ce4';
			pr['children'].push(n);
		}
		else if ( n['Type'] == 'SP' ){
			n['Color'] = '#a8ecbe';
			sp['children'].push(n);
		}
		else if ( n['Type'] == 'FP' ){
			n['Color'] = '#668de5';
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

	node.append('path')
	  .attr('d', function(d){
			if( d['data']['Shape'] ){
				return custom_shapes[d.data.Shape](d.r, d.r);
			}
			else {

			}
	  })
		.attr('stroke',function(d){
			if ( parseInt(d['data']['Variance']) <= 5 ){
	      return '#ffffff';
	    }else if( parseInt(d['data']['Variance']) <= 15 ){
	      return '#ec8140';
	    }else{
	      return  '#ff0000';
	    }
		})
		.attr('stroke-width', function(d){
	    return 2;
	  })
		.attr('fill', function(d){
	    return d['data']['Color'];
	  });



}
