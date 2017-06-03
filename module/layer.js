'use strict'

var layer = {
	theCenterNode: {},
	inout: -1,
	nodes: [],
	edges: [],
	searchedNodeId: ''
}

var custom_shapes = {
	hexagon: function(radius) {
		var width = radius * 0.8, height = radius * 0.8;
		var points = [ [width, 0], [width/2, height*.865], [-width/2, height*.865], [-width, 0],[-width/2, -height*.865],[width/2, -height*.865],[width, 0] ]
		return d3.line()(points);
	},
	parallelogram: function(radius) {
		var width = radius, height = radius;
		var points = [ [width*.916, height*.4], [-width*.175, height*.4], [-width*.916, -height*.4], [width*.175, -height*.4], [width*.916, height*.4] ]
		return d3.line()(points);
	},
	arrow: function(radius) {
		var width = radius * 0.6, height = radius * 0.6;
		var points = [ [width, 0], [width/2, height*.865], [-width*1.5, height*.865], [-width, 0], [-width*1.5, -height*.865], [width/2, -height*.865], [width, 0] ]
		return d3.line()(points);
	}
}

function refreshInfoBox(layer){

  var active, passive;

	if( layer['inout'] == 1){
		active = 'Receiver = ';
		passive = 'Sender';
	}else if( layer['inout'] == 0){
		active = 'Sender = ';
		passive = 'Receiver';
	}
	var innerHTML = '<div>' +
										'<p>' + active + layer['theCenterNode']['Node'] + '</p>' +
										'<span class = "line"></span>' +
										'<div class = "row">' +
											'<div class = "col-6">' + passive +'</div>' +
											'<div class = "col-3">Cost</div>' +
											'<div class = "col-3">Quantity</div>' +
										'</div>' +
										'<div class = "row scrollable">';
	layer['edges'].forEach(function(e){
		if ( layer['inout'] == 1 ){
      innerHTML += '<div class = "row">' +
                      '<div class = "col-6">' + e['Sender'] + '</div>';
		}
    else if ( layer['inout'] == 0 ){
      innerHTML += '<div class = "row">' +
                      '<div class = "col-6">' + e['Receiver'] + '</div>';
    }
    innerHTML += '<div class = "col-3">' + Math.round( e['Cost'] * 100 ) / 100 + '</div>' +
                  '<div class = "col-3">' + Math.round( e['Quantity'] * 100 ) / 100 + '</div>' +
                '</div>';
	});
	innerHTML += '</div>';

  d3.select('#infoBox')
	.html(
		innerHTML
	)
	.style('top', '10px')
	.style('left', '10px')
	.style('opacity', 1);
}

function showTreeMap(layer){

	var sr = [], pr = [], sp  = [], fp = [], total = [];
	total['sr'] = 0;
	total['pr'] = 0;
	total['sp'] = 0;
	total['fp'] = 0;

	console.log(layer['edges']);
	console.log(layer['nodes']);

	layer['edges'].forEach(function(e){

		var theNode = null;

		layer['nodes'].forEach(function(n){
			if( layer['inout'] == 1 ){
				if( e['source']['id'] == n['id'] ) theNode = n;
			}else if( layer['inout'] == 0 ){
				if( e['target']['id'] == n['id'] ) theNode = n;
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
		        "plottooltext": "$label Cost: $$value Variance: $svalue%",
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
