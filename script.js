'use strict'

var project = {

	nodes : [],
	edges : [],
	layers : [],
	layer_count : -1,
	layer_inout : [],
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

					project.edges = edgesReader(data);console.log(project.edges);
					project.layer_count++;
					project.layers.push({'nodes':project.nodes, 'edges':project.edges});console.log(project.layers);
					project.layer_inout.push(-1);

					network_display(d3.select('svg#main-svg'), project.nodes, project.edges);

					d3.select('div#overlay')
					.on('click', function(d){
						d3.selectAll('div#chartContainer > *').remove();;
						d3.select(this)
						.style('display', 'none');
					});

					d3.select('div#chartContainer')
					.on('click', function(d){
						d3.event.stopPropagation();
					})
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

function closePopup(){
	d3.select('#sub-svg')
	.style('opacity', 0)
	.style('display', 'none');
	d3.selectAll('div.breadcrumb')
	.remove();
	project.layer_count = 0;
}

function treeMapDisplay(){

	d3.select('#overlay')
	.style('display', 'block');

	var sr = [], pr = [], sp  = [], fp = [], total = [];
	total['sr'] = 0;
	total['pr'] = 0;
	total['sp'] = 0;
	total['fp'] = 0;

	console.log(project.layers[project.layer_count]['edges']);
	console.log(project.layers[project.layer_count]['nodes']);

	project.layers[project.layer_count]['edges'].forEach(function(e){

		var theNode;

		project.layers[project.layer_count]['nodes'].forEach(function(n){
			if ( project.layer_inout[project.layer_count] == 1 ){
				if( n['id'] == e['source']['id'] ) theNode = n;
			}else if ( project.layer_inout[project.layer_count] == 0 ){
				if( n['id'] == e['target']['id'] ) theNode = n;
			}
		});


		if( theNode['type'] == 'SR') {
			sr.push({
				'label' : theNode['id'],
				'value' : e['cost'],
				'svalue' : parseInt( theNode['var'] )
			});
			total['sr'] += e['cost'];console.log(total['sr']);
		}
		if( theNode['type'] == 'PR') {
			pr.push({
				'label' : theNode['id'],
				'value' : e['cost'],
				'svalue' : parseInt( theNode['var'] )
			});
			total['pr'] += e['cost'];console.log(total['pr']);
		}
		if( theNode['type'] == 'SP') {
			sp.push({
				'label' : theNode['id'],
				'value' : e['cost'],
				'svalue' : parseInt( theNode['var'] )
			});
			total['sp'] += Math.round(e['cost']);console.log(total['sp']);
		}
		if( theNode['type'] == 'FP') {
			fp.push({
				'label' : theNode['id'],
				'value' : e['cost'],
				'svalue' : parseInt( theNode['var'] )
			});
			total['fp'] += e['cost'];console.log(total['fp']);
		}
	});

	console.log(sr);console.log('\n');
	console.log(pr);console.log('\n');
	console.log(sp);console.log('\n');
	console.log(fp);console.log('\n');

	total['all'] = total['sr'] + total['pr'] + total['sp'] + total['fp'];	console.log(total);

	var data = [
		{
			'label' : 'Focused Unit',
			'fillcolor' : '8c8c8c',
			'value' : total['all']
		}
	];
	data[0]['data'] = [];
	if ( total['sr'] != 0 ){
		data[0]['data'].push({
			'label' : 'Support Resource',
			'value' : total['sr'],
			'data' : sr
		});
	}
	if ( total['pr'] != 0 ){
		data[0]['data'].push({
			'label' : 'Production Resource',
			'value' : total['pr'],
			'data' : pr
		});
	}
	if ( total['sp'] != 0 ){
		data[0]['data'].push({
			'label' : 'Semi-finished Product',
			'value' : total['sp'],
			'data' :sp
		});
	}
	if ( total['fp'] != 0 ){
		data[0]['data'].push({
			'label' : 'Finished Product',
			'value' : total['fp'],
			'data' : fp
		});
	}

	FusionCharts.ready(function(){
		d3.select('#chartContainer').style('display', 'block');
    var revenueChart = new FusionCharts({
			type: 'treemap',
      renderAt: 'chartContainer',
			width: '1100',
			height: '700',
			dataFormat: 'json',
			dataSource: {
				"chart" : {
		        "animation": "0",
		        "hidetitle": "1",
		        "plottooltext": "$label Sale: $$value Growth: $svalue%",
		        "spacex": "0",
		        "spacey": "0",
		        "horizontalpadding": "1",
		        "verticalpadding": "1",
		        "hoveronallsiblingleaves": "1",
		        "plotborderthickness": ".5",
		        "plotbordercolor": "666666",
		        "legendpadding": "0",
		        "legenditemfontsize": "10",
		        "legenditemfontbold": "1",
		        "showlegend": "1",
		        "legenditemfontcolor": "3d5c5c",
		        "algorithm": "squarified",
		        "caption": "Harry's SuperMart: Sales Team Performance Analysis",
		        "legendscalelinethickness": "0",
		        "legendcaptionfontsize": "10",
		        "subcaption": "Year Till Date",
		        "legendcaption": "Growth in sales - Compared to previous year",
		        "theme": "zune"
		    },
	    	"data" : data,
				"colorrange": {
	        "mapbypercent": "1",
	        "gradient": "1",
	        "minvalue": "-25",
	        "code": "e24b1a",
	        "startlabel": "Decline",
	        "endlabel": "Rise",
	        "color": [
						{
							"code": "ffffff",
	            "maxvalue": "0",
	            "label": "Static"
						},
						{
							"code": "6da81e",
	            "maxvalue": "100",
	            "label": "AVERAGE"
						}
	        ]
				}
			}
		});
		console.log(data);
		revenueChart.render();
	})
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
											'</div>';
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
	.duration(200)
	.style('opacity', 0)
	.transition()
	.duration(200)
	.style('opacity', 1);

	d3.selectAll('svg#layer-svg > *').remove();
	project.layer_count++;
	project.layers.push({
		'nodes':fNodes,
		'edges':fEdges
	});
	project.layer_inout.push(inout);

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
				project.layer_inout.pop();
				d3.select('a[index="'+ project.layer_count +'"]').remove();
				d3.select('span[index="'+ project.layer_count +'"]').remove();
				project.layer_count--;
			}
			project.layer_count = 1;
			network_display(
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
				project.layer_inout.pop();
				d3.select('a[index="'+ project.layer_count +'"]').remove();
				d3.select('span[index="'+ project.layer_count +'"]').remove();
				project.layer_count--;
			}
			project.layer_count = +d3.select(this).attr('index');
			network_display(
				d3.select('svg#layer-svg'),
				project.layers[project.layer_count].nodes,
				project.layers[project.layer_count].edges
			);
		});
	}

	network_display(d3.select('#layer-svg'), fNodes, fEdges);

	closeReport();

}
