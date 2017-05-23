$(document).ready(function(){
	
	let nodes;

	$.ajax({
		type : "GET",
		url : "data/Nodes.csv",
		dataType : "text",
		success : function(data){
			nodes = nodesReader(data);
		}
	});

	console.log(nodes);
});