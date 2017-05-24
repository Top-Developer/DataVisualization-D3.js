'use strict'
$(document).ready(function(){

	var project = {
		selectedNodeId : ''
	};

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

	d3.select('.btn-search').on('click', function(d){

		var result = d3.select('#' + document.getElementById('id-search').value);

		if( !result.empty() ){

			if( project.selectedNodeId != '' ){
				d3.select('#' + project.selectedNodeId).attr('r', 5);
			}
			result.attr('r', 20);
			project.selectedNodeId = result.attr('id');
			console.log(project.selectedNodeId);
		}
console.log(document.getElementById('id-search').value);
console.log(d3.select('#' + document.getElementById('id-search').value).empty());
		d3.select('#' + document.getElementById('id-search').value).attr('r', 20);
	})

});
