'use strict'

var project = {

	nodes : [],
	edges : [],
	layers : [],
	layer_count : -1,
	searchedNodeId : ''
};

$(document).ready(function(){

	$.ajax({
		type : "GET",
		url : "data/Nodes.csv",
		dataType : "text",
		success : function(data){

			project.nodes = d3.csvParse(data);console.log(project.nodes)

			$.ajax({
				type : "GET",
				url : "data/Edges.csv",
				dataType : "text",
				success : function(data){

					project.edges = d3.csvParse(data);

          var diameter = 1000;
          var main_svg = d3.select('#main-svg')
            .attr('width', diameter)
            .attr('height', diameter);

          drawBasicLayer(project, main_svg);

					// project.layer_count = 0;
					// project.layers.push({
					// 	'nodes': project.nodes,
					// 	'edges': project.edges,
					// 	'inout': -1,
					// 	'theCenterNode': null
					// });

					//addEventListeners();
				}
			});
		}
	});
});
