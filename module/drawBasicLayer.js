'use strict'

function generateHierarchy(theNodes){

	var sr = {
		'name': 'Support Resource',
		'children': []
	},
	pr = {
		'name': 'Production Resource',
		'children': []
	},
	sp = {
		'name': 'Semi-finished Product',
		'children': []
	},
	fp = {
		'name': 'Finished Product',
		'children': []
	};

	var root = {
		'name': 'root',
		'children': [sr, pr, sp, fp]
	};

	theNodes.forEach(function(n){
		if ( n['Type'] == 'SR' ){
			n['Color'] = '#90d4f7';
			sr['children'].push(n);
		}
		else if ( n['Type'] == 'PR' ){
			n['Color'] = '#882ce4';
			pr['children'].push(n);
		}
		else if ( n['Type'] == 'SP' ){
			n['Color'] = '#a8ecbe';
			sp['children'].push(n);
		}
		else if ( n['Type'] == 'FP' ){
			n['Color'] = '#668de5';
			fp['children'].push(n);
		};
	});

	return d3.hierarchy(root);
}

function drawBasicLayer(theProject, svg){

	var hierarchy = generateHierarchy(theProject['nodes']);
	hierarchy.sum(function(n){
		return 1;
	}).sort(function(a, b) { return b.value - a.value; });

	console.log(hierarchy);

	var width = +svg.attr('width');console.log(width);
	var height = +svg.attr('height');console.log(height);
	var packLayer = d3.pack()
	 	.size( [width, height] );

	svg.on('click', function(){

		closeReport();

		svg.selectAll('path.node')
			.style('opacity', 1);

		svg.selectAll('line.edge')
			.style('stroke', '#000')
			.style('opacity', 0);
	});

	var g = svg.append('g')
		.attr('class', 'nodes');
	var node = g.selectAll('.node')
		.data(packLayer(hierarchy).descendants())
		.enter()
		.append('path')
		.attr('class', function(d) {
			return d.children ? "node" : "leaf node";
		})
		.attr('x', function(d) {
			return d.x;
		})
		.attr('y', function(d) {
			return d.y;
		})
		.attr('transform', function(d) {
			return "translate(" + d.x + "," + d.y + ")";
		})
	  .attr('d', function(d){
			if( d['data']['Shape'] ){
				return custom_shapes[d.data.Shape](d.r);
			}
			else {

			}
	  })
		.attr('id', function(d) {
			return (d['data']['name']) ? d['data']['name'] : d['data']['Node'];
		})
		.attr('stroke',function(d){
			if ( parseInt(d['data']['Variance']) <= 5 ){
	      return '#ffffff';
	    }else if( parseInt(d['data']['Variance']) <= 15 ){
	      return '#ec8140';
	    }else{
	      return  '#ff0000';
	    }
		})
		.attr('stroke-width', function(d){
	    return 2;
	  })
		.attr('fill', function(d){
	    return d['data']['Color'];
	  });

	var links =svg.insert('g', ':first-child')
		.attr('class', 'edges')
		.selectAll("line.edge")
		.data(theProject['edges'])
		.enter()
		.append("line")
		.attr('x1', function(d) { return svg.select('path#' + d.Sender).attr('x'); })
		.attr('y1', function(d) { return svg.select('path#' + d.Sender).attr('y'); })
		.attr('x2', function(d) { return svg.select('path#' + d.Receiver).attr('x'); })
		.attr('y2', function(d) { return svg.select('path#' + d.Receiver).attr('y'); })
		.attr('ind', function(d){
			return d['ind'];
		})
		.attr('class', 'edge')
		.style('stroke', '#000')
		.style('stroke-width', 2)
		.style('opacity', 0);

	node.on('mouseover', function(d){
			d3.select(this).attr('d', function(d){
	      return custom_shapes[d.data.Shape]( 1.5 * d.r );
	    });
		})
		.on('mouseout', function(d){
			d3.select(this).attr('d', function(d){
	      return custom_shapes[d.data.Shape]( d.r );
	    });
		})
		.on('click', function(d){

			d3.event.stopPropagation();

			svg.selectAll('line')
				.style('opacity', 0);

			svg.selectAll('path.node')
				.style('opacity', 0.2);

			d3.select(this)
				.style('opacity', 1);

	    var tooltip = d3.select('#node-report');
			tooltip.style('display', 'block');
			tooltip.transition()
			.duration(500)
			.style('opacity', 0);
			tooltip.transition()
			.duration(200)
			.style('opacity', 1);
			tooltip.html(
				'<a class = "close" href= "javascript:closeReport();"></a>' + // The first <a> tag
				'<h2 class="underline">cost report</h2>' +
				'<div>' +
					'<p>Variance = ' + d['data']['Variance'] + '</p>' +
					'<p>Excess/Idle Capacity = ' + d['data']['Idle_Cap'] + '</p>' +
					'<div>' +
	          '<a href="javascript:window.open(' + '\'mailto:test@example.com\'' + ');">' +
	          d['data']['Email'] +
						'</a>' +
					'</div>' +
					'<div>' +
						'<a href="javascript:consumptionInOutbound(' + '1, \'' + d['data']['Node'] +'\');">' +
							'Consumption Inbound' +
						'</a>' +
					'</div>' +
					'<div>' +
						'<a href="javascript:consumptionInOutbound(' + '0, \'' + d['data']['Node'] +'\');">' +
							'Consumption Outbound' +
						'</a>' +
					'</div>' +
					'<div>' +
						'<a href="' + d['data']['Report'] + '">' +
						'Detail Cost Report' +
						'</a>' +
					'</div>' +
				'</div>'
			)
			.style("left", (d3.event.pageX + 1) + "px")
			.style("top", (d3.event.pageY + 1) + "px");

			theProject.edges.forEach(function(e){
				if ( e['Sender'] == d['data']['Node'] ){
					svg.select('line[ind="' + e['ind'] + '"]')
						.style('stroke', '#f00')
						.style('opacity', 1);
					svg.select('path#' + e['Receiver'] )
						.style('opacity', 1);
				}
				else if ( e['Receiver'] == d['data']['Node'] ){
					svg.select('line[ind="' + e['ind'] + '"]')
						.style('stroke', '#00f')
						.style('opacity', 1);
					svg.select('path#' + e['Sender'] )
						.style('opacity', 1);
				}
			})
		})
		.append('title').text(function(d){
	    return (d['data']['name']) ? d['data']['name'] : d['data']['Node'];
	  });
}
