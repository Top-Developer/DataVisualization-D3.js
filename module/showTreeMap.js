function showTreeMap(layer){

	d3.select('div#overlay')
		.style('display', 'block');

	var sr = [], pr = [], sp  = [], fp = [], total = [];
	total['sr'] = 0;
	total['pr'] = 0;
	total['sp'] = 0;
	total['fp'] = 0;

	console.log(layer['edges']);
	console.log(layer['nodes']);

	var done, theNode;

	layer['edges'].forEach(function(e){
		done = false;
		theNode = null;console.log(e);
		if( e['Version'] == 'A/T' ){
			if( parseFloat( e['Cost'] ) != 0.0 ){
				if( layer['inout'] == 1 ){
					layer['nodes'].forEach(function(n){
						if( n['Node'] == e['Sender'] ){
							theNode = n;console.log(theNode);
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
					sr.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['svalue'] = parseFloat( e['Cost'] );
							done = true;
						}
					});
					if( done == false ){
						sr.push({
							label: theNode['Node'],
							svalue: parseFloat( e['Cost'] ),
							value: 0
						});
						done = true;
					}
				}
				if( theNode['Type'] == 'PR') {
					pr.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['svalue'] = parseFloat( e['Cost'] );
							done = true;
						}
					});
					if( done == false ){
						pr.push({
							label: theNode['Node'],
							svalue: parseFloat( e['Cost'] ),
							value: 0
						});
						done = true;
					}
				}
				if( theNode['Type'] == 'SP') {
					sp.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['svalue'] = parseFloat( e['Cost'] );
							done = true;
						}
					});
					if( done == false ){
						sp.push({
							label: theNode['Node'],
							svalue: parseFloat( e['Cost'] ),
							value: 0
						});
						done = true;
					}
				}
				if( theNode['Type'] == 'FP') {
					fp.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['svalue'] = parseFloat( e['Cost'] );
							done = true;
						}
					});
					if( done == false ){
						fp.push({
							label: theNode['Node'],
							svalue: parseFloat( e['Cost'] ),
							value: 0
						});
						done = true;
					}
				}
			}
		}
		else if( e['Version'] == 'V002' ){
			if( parseFloat( e['Cost'] ) != 0.0 ){
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
					sr.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['sr'] += parseFloat( e['Cost'] );console.log(total['sr']);
							done = true;
						}
					});
					if( done == false ){
						sr.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0
						});
						total['sr'] += parseFloat( e['Cost'] );console.log(total['sr']);
						done = true;
					}
				}
				if( theNode['Type'] == 'PR') {
					pr.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['pr'] += parseFloat( e['Cost'] );console.log(total['pr']);
							done = true;
						}
					});
					if( done == false ){
						pr.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0
						});
						total['pr'] += parseFloat( e['Cost'] );console.log(total['pr']);
						done = true;
					}
				}
				if( theNode['Type'] == 'SP') {
					sp.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['sp'] += parseFloat( e['Cost'] );console.log(total['sp']);
							done = true;
						}
					});
					if( done == false ){
						sp.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0
						});
						total['sp'] += parseFloat( e['Cost'] );console.log(total['sp']);
						done = true;
					}
				}
				if( theNode['Type'] == 'FP') {
					fp.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['fp'] += parseFloat( e['Cost'] );console.log(total['fp']);
							done = true;
						}
					});
					if( done == false ){
						fp.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0
						});
						total['fp'] += parseFloat( e['Cost'] );console.log(total['fp']);
						done = true;
					}
				}
			}
		}
	});

	console.log(sr);console.log('\n');
	console.log(pr);console.log('\n');
	console.log(sp);console.log('\n');
	console.log(fp);console.log('\n');

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

	console.log(sr);console.log('\n');
	console.log(pr);console.log('\n');
	console.log(sp);console.log('\n');
	console.log(fp);console.log('\n');
	console.log(total['sr']);console.log('\n');
	console.log(total['pr']);console.log('\n');
	console.log(total['sp']);console.log('\n');
	console.log(total['fp']);console.log('\n');

	total['all'] = total['sr'] + total['pr'] + total['sp'] + total['fp'];	console.log(total);

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
		        "caption": "FusionChart shows cost and variances",
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
	        "minvalue": "0",
	        "code": "ffffff",
	        "startlabel": "Min",
	        "endlabel": "Max",
	        "color": [
						{
							"code": "f0a28c",
	            "maxvalue": "50",
	            "label": "Mid"
						},
						{
							"code": "e24b1a",
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

function displayTreeMap(){
	showTreeMap(project.layers[project.layer_count]);
}
