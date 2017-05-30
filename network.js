'use strict'
function displayNetwork(svg, nodes, edges, node_radius, node_padding){

  var width = +svg.attr('width');
  var height = +svg.attr('height');console.log(width);console.log(height);

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var simulation = d3.forceSimulation()
	.force('link', d3.forceLink().id( function(d){return d['id'];}) )
  .force('collide',d3.forceCollide( function(d){return node_radius + 2 }) )
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));

	var link = svg
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
  .selectAll('circle')
  .data(nodes)
  .enter()
  .append('circle')
  .attr('r', node_radius)
	.attr('id', function(d){
		return d['id'];
	})
  .style('stroke', function(d){
    if ( parseInt(d['var']) <= 5 ){
      return '#ffffff';
    }else if( parseInt(d['var']) <= 15 ){
      return '#f5a26f';
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
  .call(d3.drag()
  .on('start', dragstarted)
  .on('drag', dragged)
  .on('end',dragended))
	.on('mouseover', function(d){ // Tooltip stuff here
		d3.select(this).attr('r', 1.5 * node_radius);
	})
	.on('mouseout', function(d){
		d3.select(this).attr('r', node_radius);
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
						d['email'] +
            '<a href="javascript:window.open(' + '\'mailto:test@example.com\'' + ');">' +
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
	})
  .on('dblclick', connectedNodes);

  //Toggle stores whether the highlighting is on
  var toggle = 0;
  //Create an array logging what is connected to what
  var linkedByIndex = {};
  for (var i = 0; i < nodes.length; i++) {
      linkedByIndex[i + "," + i] = 1;
  };
  nodes.forEach(function (d) {
      linkedByIndex[d.id + "," + d.id] = 1;
  });
  edges.forEach(function (d) {
      linkedByIndex[d.source + "," + d.target] = 1;
  });

  //This function looks up whether a pair are neighbours
  function neighboring(a, b) {
      return linkedByIndex[a.id + "," + b.id];
  }
  function connectedNodes() {
      if (toggle == 0) {
          //Reduce the opacity of all but the neighbouring nodes
          var d = d3.select(this).node().__data__;
          node.style("opacity", function (o) {
              return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
          });
          link.style("opacity", function (o) {
              return d.id==o.source | d.id==o.target ? 1 : 0.1;
          });
          //Reduce the op
          toggle = 1;
      } else {
          //Put them back to opacity=1
          node.style("opacity", 1);
          link.style("opacity", 1);
          toggle = 0;
      }
  }

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
