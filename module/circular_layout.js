'use strict'

function circularLayout(svg, layer){

  var nodes = [], edges = [];

  layer['nodes'].forEach(function(n){
    nodes.push(objCopy(n));
  });

  layer['edges'].forEach(function(e){
    edges.push(objCopy(e));
  });

  var node_count = nodes.length, edge_count = edges.length;

  var width = +svg.attr('width');
  var height = +svg.attr('height');

  console.log(node_count);
  console.log(edge_count);

  var edge = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(edges)
    .enter()
    .append('line')
    .attr('stroke-width', function(d){
  		var w = Math.sqrt(d['cost']);
  		if ( w == 0 ) w = 0.01;
  		if ( w > 1 ) w = 1;
      return w;
    })
    .attr('ind', function(d){
  		return d['ind'];
  	});

  var node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('path')
    .data(nodes)
    .enter()
    .append('path')
    .attr('d', function(d){
      return custom_shapes[d.shape](project.node_radius, project.node_radius);
    })
  	.attr('id', function(d){
  		return d['id'];
  	})
    .style('stroke', function(d){
      if ( parseInt(d['var']) <= 5 ){
        return '#ffffff';
      }else if( parseInt(d['var']) <= 15 ){
        return '#ec8140';
      }else{
        return  '#ff0000';
      }
    })
    .attr('stroke-width', function(d){
      return 2;
    })
    .attr('fill', function(d){
      return d['color'];
    })
    .call(
      d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end',dragended)
    )
  	.on('mouseover', function(d){ // Tooltip stuff here
  		d3.select(this).attr('d', function(d){
        return custom_shapes[d.shape](1.5 * project.node_radius, 1.5 * project.node_radius);
      });
  	})
  	.on('mouseout', function(d){
  		d3.select(this).attr('d', function(d){
        return custom_shapes[d.shape](project.node_radius, project.node_radius);
      });
  	})
    .on('click', function(d){
      var tooltip = d3.select('#node-report');
  		tooltip.style('display', 'block');
  		tooltip.transition()
  		.duration(500)
  		.style('opacity', 0);
  		tooltip.transition()
  		.duration(200)
  		.style('opacity', .9);
  		tooltip.html(
  			'<a class = "close" href= "javascript:closeReport();"></a>' + // The first <a> tag
  			'<h2 class="underline">cost report</h2>' +
  			'<div>' +
  				'<p>Variance = ' + d['var'] + '</p>' +
  				'<p>Excess/Idle Capacity = ' + d['ic'] + '</p>' +
  				'<div>' +
            '<a href="javascript:window.open(' + '\'mailto:test@example.com\'' + ');">' +
            d['email'] +
  					'</a>' +
  				'</div>' +
  				'<div>' +
  					'<a href="javascript:consumptionInOutbound(' + '1, \'' + d['id'] +'\');">' +
  						'Consumption Inbound' +
  					'</a>' +
  				'</div>' +
  				'<div>' +
  					'<a href="javascript:consumptionInOutbound(' + '0, \'' + d['id'] +'\');">' +
  						'Consumption Outbound' +
  					'</a>' +
  				'</div>' +
  				'<div>' +
  					'<a href="javascript:detailedCostReport();">' +
  					'Detail Cost Report' +
  					'</a>' +
  				'</div>' +
  			'</div>'
  		)
  		.style("left", (d3.event.pageX + 1) + "px")
  		.style("top", (d3.event.pageY + 1) + "px");
  	});

    function dragstarted(d){
      if(!d3.event.active){
        simulation
        .alphaTarget(0.3)
        .restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d){
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d){
      if(!d3.event.active){
        simulation
        .alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

}
