'use strict'

var layer = {
	theCenterNode: {},
	inout: -1,
	nodes: [],
	edges: [],
	searchedNodeId: ''
}

var custom_shapes = {
	hexagon: function(radius) {
		var width = radius * 0.8, height = radius * 0.8;
		var points = [ [width, 0], [width/2, height*.865], [-width/2, height*.865], [-width, 0],[-width/2, -height*.865],[width/2, -height*.865],[width, 0] ]
		return d3.line()(points);
	},
	parallelogram: function(radius) {
		var width = radius, height = radius;
		var points = [ [width*.916, height*.4], [-width*.175, height*.4], [-width*.916, -height*.4], [width*.175, -height*.4], [width*.916, height*.4] ]
		return d3.line()(points);
	},
	arrow: function(radius) {
		var width = radius * 0.6, height = radius * 0.6;
		var points = [ [width, 0], [width/2, height*.865], [-width*1.5, height*.865], [-width, 0], [-width*1.5, -height*.865], [width/2, -height*.865], [width, 0] ]
		return d3.line()(points);
	}
}

function refreshInfoBox(layer){

  var active, passive;

	if( layer['inout'] == 1){
		active = 'Receiver = ';
		passive = 'Sender';
	}else if( layer['inout'] == 0){
		active = 'Sender = ';
		passive = 'Receiver';
	}
	var innerHTML = '<div>' +
										'<p>' + active + layer['theCenterNode']['Node'] + '</p>' +
										'<span class = "line"></span>' +
										'<div class = "row">' +
											'<div class = "col-4">' + passive +'</div>' +
											'<div class = "col-2">Version</div>' +
											'<div class = "col-2">Cost</div>' +
											'<div class = "col-2">Quantity</div>' +
											'<div class = "col-2">UoM</div>' +
										'</div>' +
										'<div class = "row scrollable">';
	layer['edges'].forEach(function(e){
		if ( layer['inout'] == 1 ){
      innerHTML += '<div class = "row">' +
                      '<div class = "col-4">' + e['Sender'] + '</div>';
		}
    else if ( layer['inout'] == 0 ){
      innerHTML += '<div class = "row">' +
                      '<div class = "col-4">' + e['Receiver'] + '</div>';
    }
    innerHTML += '<div class = "col-2">' + e['Version'] + '</div>' +
									'<div class = "col-2">' + Math.round( e['Cost'] * 100 ) / 100 + '</div>' +
                  '<div class = "col-2">' + Math.round( e['Quantity'] * 100 ) / 100 + '</div>' +
									'<div class = "col-2">' + e['UoM'] + '</div>' +
                '</div>';
	});
	innerHTML += '</div>';

  d3.select('#infoBox')
	.html(
		innerHTML
	)
	.style('top', '10px')
	.style('left', '10px')
	.style('opacity', 1);
}
