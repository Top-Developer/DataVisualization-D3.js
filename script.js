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
					project.edges.forEach(function(e){console.log('e = '+e['receiver']+' ' +e['sender']);
						project.nodes.forEach(function(n, index){console.log('n = '+n['id']);
							if( n['id'] == e['sender'] ) e['source'] == index;
							if( n['id'] == e['receiver'] ) e['target'] == index;
						});
					});

					console.log(project.edges);

					network_show(project.nodes, project.edges);
				}
			});
		}
	});

});
