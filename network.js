'use strict'
function network_show(nodes, edges){

	var svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height');console.log(width);console.log(height);

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var simulation = d3.forceSimulation()
	.force('link', d3.forceLink().id(function(d){return d['id'];}))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));

	// Define 'div' for tooltips
	var div = d3.select("body")
		.append("div")  // declare the tooltip div
		.attr("class", "report")              // apply the 'tooltip' class
		.style("opacity", 0);                  // set the opacity to nil

	var link = svg
  .append('g')
  .attr('class', 'links')
  .selectAll('line')
  .data(edges)
  .enter()
  .append('line')
  .attr('stroke-width', function(d){
		var w = Math.sqrt(d['value']);
		if ( w == 0 ) w = 0.01;
		if ( w > 1 ) w = 1;
    return w;
  });

  var node = svg
  .append('g')
  .attr('class', 'nodes')
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr('r', 5)
	.attr('id', function(d){
		return d['id'];
	})
  .attr('fill', function(d){
    return d['color'];
  })
  .call(d3.drag()
  .on('start', dragstarted)
  .on('drag', dragged)
  .on('end',dragended))
	.on('mouseover', function(d){ // Tooltip stuff here
		d3.select(this).attr('r', 10);
		div.transition()
		.duration(500)
		.style("opacity", 0);
		div.transition()
		.duration(200)
		.style("opacity", .9);
		div.html(
			'<a class = "close" href= "#"></a>' + // The first <a> tag
			'<h2 class="underline">cost report</h2>' +
			'<div>' +
				'<p>Variance = ' + d['var'] + '</p>' +
				'<p>Excess/Idle Capacity = ' + d['ic'] + '</p>' +
				'<div>' +
					'<a href="javascript:window.open('+'mailto:test@example.com'+');">' +
						d['email'] +
					'</a>' +
				'</div>' +
				'<div>' +
					'<a href="javascript:consumptionInOutbound('+'in'+');">' +
						'Consumption Inbound' +
					'</a>' +
				'</div>' +
				'<div>' +
					'<a href="javascript:consumptionInOutbound('+'out'+');">' +
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
		.style("left", (d3.event.pageX) + "px")
		.style("top", (d3.event.pageY) + "px");
	})
	.on('mouseout', function(){
		d3.select(this).attr('r', 5);
	});

  node.append('title').text(function(d){
    return d['id'];
  });

  simulation
  .nodes(nodes)
  .on('tick', ticked);

  simulation
  .force('link')
  .links(edges);

  function ticked(){
    link
    .attr('x1', function(d){ return d.source.x; })
    .attr('y1', function(d){ return d.source.y; })
    .attr('x2', function(d){ return d.target.x; })
    .attr('y2', function(d){ return d.target.y; });

    node
    .attr('cx', function(d){ return d.x; })
    .attr('cy', function(d){ return d.y; });
  }

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
