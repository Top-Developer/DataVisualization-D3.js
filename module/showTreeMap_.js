function showTreeMap(layer){

	d3.select('div#overlay')
		.style('display', 'block');

	var sr = [], pr = [], sp  = [], fp = [], total = [];
	total['sr'] = 0;
	total['pr'] = 0;
	total['sp'] = 0;
	total['fp'] = 0;

	//console.log(layer['edges']);
	//console.log(layer['nodes']);

	var done, theNode;

	layer['edges'].forEach(function(e){
		done = false;
		theNode = null;
		//console.log(e);


		if( layer['inout'] == 1 ){
			layer['nodes'].forEach(function(n){
				if( n['Node'] == e['Sender'] ){
					theNode = n;
				}
			});
			if( theNode == null ){
				alert('unexpected exception : theNode');
				console.log(e);
				console.log(layer);
			}
		}
		else if( layer['inout'] == 0 ){
			layer['nodes'].forEach(function(n){
				if( n['Node'] == e['Receiver'] ){
					theNode = n;
				}
			});
			if( theNode == null ){
				alert('unexpected exception : theNode');
				console.log(e);
				console.log(layer);
			}
		}
		else{
			alert('unexpected exception : layer_inout');
			console.log(layer);
		}

		if( theNode['Type'] == 'SR') {
			sr.push({
				label: theNode['Node'],
				value: parseFloat( e['Cost'] ),
				svalue: parseFloat( e['Variance'] )
			});
			total['sr'] += parseFloat( e['Cost'] );
		}
		else if( theNode['Type'] == 'PR') {
			pr.push({
				label: theNode['Node'],
				value: parseFloat( e['Cost'] ),
				svalue: parseFloat( e['Variance'] )
			});
			total['pr'] += parseFloat( e['Cost'] );
		}
		else if( theNode['Type'] == 'SP') {
			sp.push({
				label: theNode['Node'],
				value: parseFloat( e['Cost'] ),
				svalue: parseFloat( e['Variance'] )
			});
			total['sp'] += parseFloat( e['Cost'] );
		}
		else if( theNode['Type'] == 'FP') {
			sp.push({
				label: theNode['Node'],
				value: parseFloat( e['Cost'] ),
				svalue: parseFloat( e['Variance'] )
			});
			total['fp'] += parseFloat( e['Cost'] );
		}
		else{}
	});

	// console.log(sr);console.log('\n');
	// console.log(pr);console.log('\n');
	// console.log(sp);console.log('\n');
	// console.log(fp);console.log('\n');

	sr.forEach(function(item, index, object){
		if( item['value'] == 0 ){
			object.splice(index, 1);
		}
	});
	pr.forEach(function(item, index, object){
		if( item['value'] == 0 ){
			object.splice(index, 1);
		}
	});
	sp.forEach(function(item, index, object){
		if( item['value'] == 0 ){
			object.splice(index, 1);
		}
	});
	fp.forEach(function(item, index, object){
		if( item['value'] == 0 ){
			object.splice(index, 1);
		}
	});

	// console.log(sr);console.log('\n');
	// console.log(pr);console.log('\n');
	// console.log(sp);console.log('\n');
	// console.log(fp);console.log('\n');
	// console.log(total['sr']);console.log('\n');
	// console.log(total['pr']);console.log('\n');
	// console.log(total['sp']);console.log('\n');
	// console.log(total['fp']);console.log('\n');

	total['all'] = total['sr'] + total['pr'] + total['sp'] + total['fp'];	//console.log(total);

	var data = [
		{
			'label' : 'Focused Unit',
			'fillcolor' : '8c8c8c',
			'value' : total['all'],
			'svalue': 0
		}
	];
	data[0]['data'] = [];
	if ( total['sr'] != 0 ){
		data[0]['data'].push({
			'label': 'Support Resource',
			'value': total['sr'],
			'svalue': 0,
			'data': sr
		});
	}
	if ( total['pr'] != 0 ){
		data[0]['data'].push({
			'label' : 'Production Resource',
			'value' : total['pr'],
			'svalue': 0,
			'data' : pr
		});
	}
	if ( total['sp'] != 0 ){
		data[0]['data'].push({
			'label': 'Semi-finished Product',
			'value': total['sp'],
			'svalue': 0,
			'data': sp
		});
	}
	if ( total['fp'] != 0 ){
		data[0]['data'].push({
			'label': 'Finished Product',
			'value': total['fp'],
			'svalue': 0,
			'data': fp
		});
	}

	var suffix;
	if( layer['inout'] == 1 ){
		suffix = 'Inbound Consumption';
	}else{
		suffix = 'Outbound Consumption';
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
		        "plottooltext": "$label Cost: $$value Variance: $$svalue",
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
		        "caption": layer['theCenterNode']['Node'] + ' ' +suffix,
		        "legendscalelinethickness": "0",
		        "legendcaptionfontsize": "10",
		        "subcaption": "Cost and Variance",
		        "legendcaption": "Filter by variances",
		        "theme": "zune"
		    },
	    	"data" : data,
				"colorrange": {
	        "mapbypercent": "0",
	        "gradient": "1",
	        "minvalue": -6000,
	        "code": "e24b1a",
	        "startlabel": "Min",
	        "endlabel": "Max",
	        "color": [
						{
							"code": "ffffff",
	            "maxvalue": 0,
	            "label": "Mid"
						},
						{
							"code": "6da81e",
	            "maxvalue": 6000,
	            "label": "AVERAGE"
						}
	        ]
				}
			}
		});
		//console.log(data);
		revenueChart.render();
	})
}

function displayTreeMap(){
	showTreeMap(project.layers[project.layer_count]);
}
