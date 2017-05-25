'use strict'

var project = {

	nodes : [],
	edges : [],
	selectedNodeId : ''
};

var infoBox = d3.select('body')
.append('div')
.attr('class', 'report')
.style("opacity", 0);

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
	})
});

function closeReport(){
	d3.select('#nodeReport')
	.style('opacity', 0)
	.style('display', 'none');
}

function consumptionInOutbound(inout, id){
	var active, passive;
	if( inout == 1){
		active = 'Receiver = ';
		passive = 'Sender';
	}else if( inout == 0){
		active = 'Sender = ';
		passive = 'Receiver';
	}
	var innerHTML = '<div>' +
										'<p>' + active + id + '</p>' +
										'<span class = "line"></span>' +
										'<div class = "row">' +
											'<div class = "col-6">' + passive +'</div>' +
											'<div class = "col-3">Cost</div>' +
											'<div class = "col-3">Quantity</div>' +
										'</div>' +
										'<div class = "row scrollable">';
	project['edges'].forEach(function(e){
		if ( inout == 1 ){
			if( e['target']['id'] == id ){
				innerHTML += '<div class = "row">' +
												'<div class = "col-6">' + e['source']['id'] + '</div>' +
												'<div class = "col-3">' + e['cost'] + '</div>' +
												'<div class = "col-3">' + e['quantity'] + '</div>' +
											'</div>'
			}
		}else if ( inout == 0 ){
			if( e['source']['id'] == id ){
				innerHTML += '<div class = "row">' +
												'<div class = "col-6">' + e['target']['id'] + '</div>' +
												'<div class = "col-3">' + e['cost'] + '</div>' +
												'<div class = "col-3">' + e['quantity'] + '</div>' +
											'</div>'
			}
		}
	});
	innerHTML += '</div>';
	infoBox
	.html(
		innerHTML
	)
	.style('top', '10px')
	.style('left', '10px')
	.style('opacity', 1);
}
