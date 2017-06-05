'use strict'

function closeInfoBox(){
	d3.select('#infoBox')
	.style('opacity', 0);
}

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
	closeInfoBox();
}

function consumptionInOutbound(inout, d){

	var fNodes = [], fEdges = [], theCenterNode = null;

	project['nodes'].forEach(function(n){
		if( d == n['Node'] ) {
			fNodes.push(n);
			theCenterNode = n;
		}
	});

	project['edges'].forEach(function(e){
		if( inout == 1 ){
			if( e['Receiver'] == d ){
				fEdges.push(e);
				project['nodes'].forEach(function(n){
					if( e['Sender'] == n['Node'] ) fNodes.push(n);
				});
			}
		}else if( inout == 0 ){
			if( e['Sender'] == d ){
				fEdges.push(e);
				project['nodes'].forEach(function(n){
					if( e['Receiver'] == n['Node'] ) fNodes.push(n);
				});
			}
		}
	})

	project.layer_count++;
	project.layers[project.layer_count] = {
		'nodes': fNodes,
		'edges': fEdges,
		'inout': inout,
		'theCenterNode': theCenterNode
	};console.log(project.layers[project.layer_count]);

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
			circularLayout(
				d3.select('svg#layer-svg'),
				project.layers[project.layer_count]
			);
			refreshInfoBox(project.layers[project.layer_count]);
		});
	}
	else{
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

			circularLayout(
				d3.select('svg#layer-svg'),
				project.layers[project.layer_count]
			);
			refreshInfoBox(project.layers[project.layer_count]);
		});
	}

	// displayNetwork(
	// 	d3.select('svg#layer-svg'),
	// 	project.layers[project.layer_count].nodes,
	// 	project.layers[project.layer_count].edges,
	// 	10,
	// 	2
	// );

	closeReport();
	circularLayout(d3.select('svg#layer-svg'), project.layers[project.layer_count]);
}
