function circularLayout(svg, layer){

  var count = layer['edges'].length;
  var nodeToOrder = {};
  var order = 0;
  layer['edges'].forEach(function(e){
    if( layer['inout'] == 1 ){
      nodeToOrder[e['Sender']] = order;
      order++;
    }
    else if( layer['inout'] == 0 ){
      nodeToOrder[e['Receiver']] = order;
      order++;
    }
  });console.log(nodeToOrder);

  var g = svg.append('g')
    .attr('class', 'nodes');

  var node = g.selectAll('path.node')
    .data(layer['nodes'])
    .enter()
    .append('path')
    .attr('class', 'node')
    .attr('id', function(d) {
			return d['Node'];
		})
    .attr('x', function(d){
      if ( nodeToOrder[d['Node']] == undefined ){
        return 300;
      }else{
        return 300 + 250 * Math.cos( 2 * Math.PI * nodeToOrder[d['Node']] / count);
      }
    })
    .attr('y', function(d){
      if ( nodeToOrder[d['Node']] == undefined ){
        return 300;
      }else{
        return 300 + 250 * Math.sin( 2 * Math.PI * nodeToOrder[d['Node']] / count);
      }
    })
    .attr('transform', function(d){
      if ( nodeToOrder[d['Node']] == undefined ){
        return 'translate(300, 300)' ;
      }
      else{
        var x = 300 + 250 * Math.cos( 2 * Math.PI * parseInt(nodeToOrder[d['Node']]) / count);
        var y = 300 + 250 * Math.sin( 2 * Math.PI * parseInt(nodeToOrder[d['Node']]) / count);
        return 'translate(' +
          x +
          ',' +
          y + ')';
      }
    })
    .attr('d', function(d){
      if( d['Shape'] ){
				return custom_shapes[d['Shape']](20);
			}
			else {

			}
    })
    .attr('stroke',function(d){
			if ( parseInt(d['Variance']) <= 5 ){
	      return '#ffffff';
	    }else if( parseInt(d['Variance']) <= 15 ){
	      return '#ec8140';
	    }else{
	      return  '#ff0000';
	    }
		})
		.attr('stroke-width', function(d){
	    return 2;
	  })
		.attr('fill', function(d){
	    return d['Color'];
	  });

    var links =svg.insert('g', ':first-child')
  		.attr('class', 'edges')
  		.selectAll("line.edge")
  		.data(layer['edges'])
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
  		.style('stroke', function(d){
        if( layer['inout'] == 1 ){
          return '#00f';
        }
        else if( layer['inout'] == 0 ){
          return '#f00';
        }
      })
  		.style('stroke-width', 2)
  		.style('opacity', 1);

    node.on('mouseover', function(d){
  			d3.select(this).attr('d', function(d){
  	      return custom_shapes[d.Shape]( 30 );
  	    });
  		})
  		.on('mouseout', function(d){
  			d3.select(this).attr('d', function(d){
  	      return custom_shapes[d.Shape]( 20 );
  	    });
  		})
  		.on('click', function(d){

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
  					'<p>Variance = ' + d['Variance'] + '</p>' +
  					'<p>Excess/Idle Capacity = ' + d['Idle_Cap'] + '</p>' +
  					'<div>' +
  	          '<a href="javascript:window.open(' + '\'mailto:test@example.com\'' + ');">' +
  	          d['Email'] +
  						'</a>' +
  					'</div>' +
  					'<div>' +
  						'<a href="javascript:consumptionInOutbound(' + '1, \'' + d['Node'] +'\');">' +
  							'Consumption Inbound' +
  						'</a>' +
  					'</div>' +
  					'<div>' +
  						'<a href="javascript:consumptionInOutbound(' + '0, \'' + d['Node'] +'\');">' +
  							'Consumption Outbound' +
  						'</a>' +
  					'</div>' +
  					'<div>' +
  						'<a href="' + d['Report'] + '">' +
  						'Detail Cost Report' +
  						'</a>' +
  					'</div>' +
  				'</div>'
  			)
  			.style("left", (d3.event.pageX + 1) + "px")
  			.style("top", (d3.event.pageY + 1) + "px");

  			layer.edges.forEach(function(e){
  				if ( e['Sender'] == d['Node'] ){
  					svg.select('line[ind="' + e['ind'] + '"]')
  						.style('stroke', '#f00')
  						.style('opacity', 1);
  					svg.select('path#' + e['Receiver'] )
  						.style('opacity', 1);
  				}
  				else if ( e['Receiver'] == d['Node'] ){
  					svg.select('line[ind="' + e['ind'] + '"]')
  						.style('stroke', '#00f')
  						.style('opacity', 1);
  					svg.select('path#' + e['Sender'] )
  						.style('opacity', 1);
  				}
  			})
  		})
  		.append('title').text(function(d){
  	    return d['Node'];
  	  });
}
