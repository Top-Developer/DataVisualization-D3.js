'use strict'

var project = {

	nodes : [],
	edges : [],
	layers
	selectedNodeId : ''
};

$(document).ready(function(){

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

					network_display(d3.select('svg#main-svg'), project.nodes, project.edges);
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
	})
});

function closeReport(){
	d3.select('#node-report')
	.style('opacity', 0)
	.style('display', 'none');
}

function consumptionInOutbound(inout, d){
	var fNodes = [], fEdges = [];
	project['nodes'].forEach(function(n){
		if( d == n['id'] ) fNodes.push(n);
	});
	var active, passive;
	if( inout == 1){
		active = 'Receiver = ';
		passive = 'Sender';
	}else if( inout == 0){
		active = 'Sender = ';
		passive = 'Receiver';
	}
	var innerHTML = '<div>' +
										'<p>' + active + d + '</p>' +
										'<span class = "line"></span>' +
										'<div class = "row">' +
											'<div class = "col-6">' + passive +'</div>' +
											'<div class = "col-3">Cost</div>' +
											'<div class = "col-3">Quantity</div>' +
										'</div>' +
										'<div class = "row scrollable">';
	project['edges'].forEach(function(e){
		if ( inout == 1 ){
			if( e['target']['id'] == d ){
				fNodes.push(e['source']);
				fEdges.push(e);
				innerHTML += '<div class = "row">' +
												'<div class = "col-6">' + e['source']['id'] + '</div>' +
												'<div class = "col-3">' + e['cost'] + '</div>' +
												'<div class = "col-3">' + e['quantity'] + '</div>' +
											'</div>'
			}
		}else if ( inout == 0 ){
			if( e['source']['id'] == d ){
				fNodes.push(e['target']);
				fEdges.push(e);
				innerHTML += '<div class = "row">' +
												'<div class = "col-6">' + e['target']['id'] + '</div>' +
												'<div class = "col-3">' + e['cost'] + '</div>' +
												'<div class = "col-3">' + e['quantity'] + '</div>' +
											'</div>'
			}
		}
	});
	innerHTML += '</div>';

	d3.select('#infoBox')
	.html(
		innerHTML
	)
	.style('top', '10px')
	.style('left', '10px')
	.style('opacity', 1);

	d3.select('#sub-svg')
	.style('display', 'block')
	.transition()
	.duration(500)
	.style('opacity', 0)
	.transition()
	.duration(200)
	.style('opacity', 1);

	d3.selectAll('#layer-svg > *').remove();
	network_display(d3.select('#layer-svg'), fNodes, fEdges);

	closeReport();

}
