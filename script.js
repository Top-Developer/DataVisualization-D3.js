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

			project.nodes = nodesReader(data);console.log(project.nodes);

			$.ajax({
				type : "GET",
				url : "data/Edges.csv",
				dataType : "text",
				success : function(data){

					project.edges = edgesReader(data);console.log(project.edges);
					project.layer_count++;
					project.layers.push({
						'nodes': project.nodes,
						'edges': project.edges,
						'inout': -1,
						'theCenterNode': null
					});console.log(project.layers);

					displayNetwork(d3.select('svg#main-svg'), project.nodes, project.edges);

					d3.select('div#overlay')
					.on('click', function(e){
						d3.selectAll('div#chartContainer > *').remove();
						d3.select(this)
						.style('display', 'none');
					});

					d3.select('div#chartContainer')
					.on('click', function(e){
						d3.event.stopPropagation();
					});

					d3.select('#business-category')
					.on('change', function(e){
						if( d3.select('#business-category').node().value() == 'All categories' ){

						}
						else if( d3.select('#business-category').node().value() == 'BU01' ){

						}
						else if( d3.select('#business-category').node().value() == 'BU02' ){

						}
					});

					d3.select('#min-variance')
					.on('input', function(e){
						console.log( d3.select('#min-variance').property("value"));
						console.log(+this.value);
						var t = +this.value;
						project['nodes'].forEach(function(n){
							if( parseInt( n['var'] ) < t ){
								d3.selectAll( 'circle#' + n['id'] )
								.attr('class', 'hidden');
								n['hidden'] = true;
							}
							else{
								d3.selectAll( 'circle#' + n['id'] )
								.attr('class', '');
								n['hidden'] = false;
							}
						});
						project['edges'].forEach(function(e){
							if( e['source']['hidden'] == true || e['target']['hidden'] == true ){
								d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
								.attr('class', 'hidden');
								e['hidden'] = true;
							}
							else{
								d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
								.attr('class', '');
								e['hidden'] = false;
							}

						});
					});

				}
			});
		}
	});

	d3.select('.btn-search').on('click', function(d){

		var result = d3.select('#' + document.getElementById('id-search').value);

		if( !result.empty() ){

			if( project.searchedNodeId != '' ){

				d3.select('#' + project.searchedNodeId).attr('r', 5);
			}
			result.attr('r', 20);
			project.searchedNodeId = result.attr('id');
			console.log(project.searchedNodeId);
		}
	})
});

function closeReport(){
	d3.select('#node-report')
	.style('opacity', 0)
	.style('display', 'none');
}

function closePopup(){
	d3.select('#sub-svg')
	.style('opacity', 0)
	.style('display', 'none');
	d3.selectAll('div.breadcrumb')
	.remove();
	while(project.layer_count > 0){
		project.layers.pop();
		d3.select('a[index="'+ project.layer_count +'"]').remove();
		d3.select('span[index="'+ project.layer_count +'"]').remove();
		project.layer_count--;
	}
	closeReport();
}

function treeMapDisplay(){

	d3.select('#overlay')
	.style('display', 'block');

	showTreeMap(project.layers[project.layer_count])
}

function consumptionInOutbound(inout, d){

	var fNodes = [], fEdges = [], theCenterNode = null;

	project['nodes'].forEach(function(n){
		if( d == n['id'] ) {
			fNodes.push(n);
			theCenterNode = n;
		}
	});

	project['edges'].forEach(function(e){
		if( inout == 1 ){
			if( e['target']['id'] == d ){
				fEdges.push(e);
				project['nodes'].forEach(function(n){
					if( e['source']['id'] == n['id'] ) fNodes.push(n);
				});
			}
		}else if( inout == 0 ){
			if( e['source']['id'] == d ){
				fEdges.push(e);
				project['nodes'].forEach(function(n){
					if( e['target']['id'] == n['id'] ) fNodes.push(n);
				});
			}
		}
	})

	project.layer_count++;
	project.layers.push({
		'nodes': fNodes,
		'edges': fEdges,
		'inout': inout,
		'theCenterNode': theCenterNode
	});

	refreshInfoBox(project.layers[project.layer_count]);

	d3.select('#sub-svg')
	.style('display', 'block')
	.transition()
	.duration(200)
	.style('opacity', 1);

	d3.selectAll('svg#layer-svg > *').remove();

	if( project.layer_count == 1){
		d3.select('#sub-svg')
		.append('div')
		.attr('class', 'breadcrumb')
		.append('a')
		.attr('href', '#')
		.attr('index', '1')
		.text('1')
		.on('click', function(d){
			d3.selectAll('svg#layer-svg > *').remove();
			while(project.layer_count > 1){
				project.layers.pop();
				d3.select('a[index="'+ project.layer_count +'"]').remove();
				d3.select('span[index="'+ project.layer_count +'"]').remove();
				project.layer_count--;
			}
			project.layer_count = 1;
			displayNetwork(
				d3.select('svg#layer-svg'),
				project.layers[project.layer_count].nodes,
				project.layers[project.layer_count].edges
			);
		});
	}else{
		d3.select('.breadcrumb')
		.append('span')
		.attr('index', project.layer_count)
		.text('>');
		d3.select('.breadcrumb')
		.append('a')
		.attr('href', '#')
		.attr('index', project.layer_count)
		.text(project.layer_count)
		.on('click', function(){
			d3.selectAll('svg#layer-svg > *').remove();
			while( project.layer_count > +d3.select(this).attr('index') ){
				project.layers.pop();
				d3.select('a[index="'+ project.layer_count +'"]').remove();
				d3.select('span[index="'+ project.layer_count +'"]').remove();
				project.layer_count--;
			}

			displayNetwork(
				d3.select('svg#layer-svg'),
				project.layers[project.layer_count].nodes,
				project.layers[project.layer_count].edges
			);

			drawInfoBox()
		});
	}

	displayNetwork(
		d3.select('svg#layer-svg'),
		project.layers[project.layer_count].nodes,
		project.layers[project.layer_count].edges
	);

	closeReport();

}
