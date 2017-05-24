'use strict'
$(document).ready(function(){

	var project = {};

	$.ajax({
		type : "GET",
		url : "data/Nodes.csv",
		dataType : "text",
		success : function(data){

			project.nodes = nodesReader(data);console.log(project.nodes);

			$.ajax({
				type : "GET",
				url : "data/Edges.csv",
				dataType : "text",
				success : function(data){

					project.edges = edgesReader(data);

					console.log(project.edges);

					network_show(project.nodes, project.edges);
				}
			});
		}
	});

});
