'use strict'

var project = {

	nodes : [],
	edges : [],
	layers : [],
	layer_count : -1,
	searchedNodeId : '',
	node_radius: 8
};

$(document).ready(function(){

	$.ajax({
		type : "GET",
		url : "data/Nodes.csv",
		dataType : "text",
		success : function(data){console.log(d3.csvParse(data));

			project.nodes = nodesReader(data);

			$.ajax({
				type : "GET",
				url : "data/Edges.csv",
				dataType : "text",
				success : function(data){console.log(d3.csvParse(data));

					project.edges = edgesReader(data);
					project.layer_count++;
					project.layers.push({
						'nodes': project.nodes,
						'edges': project.edges,
						'inout': -1,
						'theCenterNode': null
					});

					displayNetwork(d3.select('svg#main-svg'), project.nodes, project.edges, project.node_radius, 2);

					addEventListeners();
				}
			});
		}
	});
});

function treeMapDisplay(){

	d3.select('#overlay')
	.style('display', 'block');

	showTreeMap(project.layers[project.layer_count])
}
