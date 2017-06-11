'use strict'

function showTreeMap(layer){
//console.log(layer);
  var sr = [], pr = [], sp = [], fp = [], done, theNode, total = {
    'sr': 0,
    'pr': 0,
    'sp': 0,
    'fp': 0
  };

  d3.select('div#overlay')
    .style('display', 'block');

  layer['edges'].forEach(function(e){
		done = false;
		theNode = null;

		if( e['Version'] == 'A/T' ){
			if( parseFloat( e['Cost'] ) != 0.0 ){
				if( layer['inout'] == 1 ){
					layer['nodes'].forEach(function(n){
						if( n['Node'] == e['Sender'] ){
							theNode = n;
						}
					});
					if( theNode == null ){
						alert('unexpected exception : theNode');
						//console.log(e);
						//console.log(layer);
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
						//console.log(e);
						//console.log(layer);
					}
				}
				else{
					alert('unexpected exception : layer_inout');
					//console.log(layer);
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
							value: 0,
              color: theNode['Color'],
              type: 'SR'
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
							value: 0,
              color: theNode['Color'],
              type: 'PR'
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
							value: 0,
              color: theNode['Color'],
              type: 'SP'
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
							value: 0,
              color: theNode['Color'],
              type: 'FP'
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
						//console.log(e);
						//console.log(layer);
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
						//console.log(e);
						//console.log(layer);
					}
				}
				else{
					alert('unexpected exception : layer_inout');
					//console.log(layer);
				}

				if( theNode['Type'] == 'SR') {
					sr.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['sr'] += parseFloat( e['Cost'] );
              //console.log(total['sr']);
							done = true;
						}
					});
					if( done == false ){
						sr.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0,
              color: theNode['Color'],
              type: 'SR'
						});
						total['sr'] += parseFloat( e['Cost'] );
            //console.log(total['sr']);
						done = true;
					}
				}
				if( theNode['Type'] == 'PR') {
					pr.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['pr'] += parseFloat( e['Cost'] );
              //console.log(total['pr']);
							done = true;
						}
					});
					if( done == false ){
						pr.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0,
              color: theNode['Color'],
              type: 'PR'
						});
						total['pr'] += parseFloat( e['Cost'] );
            //console.log(total['pr']);
						done = true;
					}
				}
				if( theNode['Type'] == 'SP') {
					sp.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['sp'] += parseFloat( e['Cost'] );
              //console.log(total['sp']);
							done = true;
						}
					});
					if( done == false ){
						sp.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0,
              color: theNode['Color'],
              type: 'SP'
						});
						total['sp'] += parseFloat( e['Cost'] );
            //console.log(total['sp']);
						done = true;
					}
				}
				if( theNode['Type'] == 'FP') {
					fp.forEach(function(n){
						if( n['label'] == theNode['Node'] ){
							n['value'] = parseFloat( e['Cost'] );
							total['fp'] += parseFloat( e['Cost'] );
              //console.log(total['fp']);
							done = true;
						}
					});
					if( done == false ){
						fp.push({
							label: theNode['Node'],
							value: parseFloat( e['Cost'] ),
							svalue: 0,
              color: theNode['Color'],
              type: 'FP'
						});
						total['fp'] += parseFloat( e['Cost'] );
            //console.log(total['fp']);
						done = true;
					}
				}
			}
		}
	});

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

  var data = {
    label: 'root',
    children: []
  };
  //console.log(total['sr']);
  if( total['sr'] != 0 ){
    data.children.push({
      label: 'Support Resource',
      children: sr
    });
  }
  //console.log(total['pr']);
  if( total['pr'] != 0 ){
    data.children.push({
      label: 'Production Resource',
      children: pr
    });
  }
  //console.log(total['sp']);
  if( total['sp'] != 0 ){
    data.children.push({
      label: 'Semi-finished Product',
      children: sp
    });
  }
  //console.log(total['fp']);
  if( total['fp'] != 0 ){
    data.children.push({
      label: 'Finished Product',
      children: fp
    });
  }
  //console.log(data);

  var width = 800, height = 600;

  var margin_top = $(window).height() / 2 - 300 - 100;
  var margin_left = $(window).width() / 2 - 400;

  var div = d3.select('div#treeMapContainer')
    .style('position', 'absolute')
    .style('width', width + 100)
    .style('height', height + 200)
    .style('top', margin_top)
    .style('left', margin_left);

  var svg = div.select('svg')
    .attr('width', width)
    .attr('height', height)
    .style('margin-left', 100 / 2);

  var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([ width, height ])
    .round(true)
    .paddingInner(1);

  var root = d3.hierarchy(data)
    .sum(function(d){
      return d['value'];
    })
    .sort(function(a, b) {
      return b.value - a.value;
    });

  var tree = treemap(root);

  var tooltip = d3.select("div.maptooltip")
  	.style('position', 'absolute')
  	.style('z-index', '10')
  	.style('visibility', 'hidden');

  var magnified = 0;

  var cell = svg
    .selectAll('g.cell')
    .data( tree.leaves() )
    .enter()
    .append('g')
    .attr('class', 'cell')
    .attr("transform", function(d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });
  cell
    .append('rect')
    .attr('id', function(d){
      return d['data']['label'];
    })
    .attr('width', function(d){
      return d.x1- d.x0;
    })
    .attr('height', function(d){
      return d.y1- d.y0;
    })
    .attr('fill', function(d){
      return d['data']['color'];
    })
    .style('opacity', 1)
    .on('mouseover', function(d){
      return d3.select(this).style('opacity', 0.7);
    })
    .on('mouseout', function(d){
      return d3.select(this).style('opacity', 1);
    })
    .on('click', function(d){
      d3.event.stopPropagation();
      if( magnified == 0){
        var kx = 800 / ( d['parent']['x1'] - d['parent']['x0'] );
        var ky = 600 / ( d['parent']['y1'] - d['parent']['y0'] );
        var xo = d['parent']['x0'];
        var yo = d['parent']['y0'];
        cell
          .transition()
          .duration(750)
          .attr('transform', function(d){
            return 'translate(' + (d.x0 - xo) * kx + ',' + (d.y0 - yo) * ky + ')';
          })
          .select('rect')
          .attr('width', function(d){
            return (d.x1 - d.x0) * kx;
          })
          .attr('height', function(d){
            return (d.y1 - d.y0) * ky;
          });
        magnified = 1;
      }
      else if( magnified == 1){
        cell
          .transition()
          .duration(750)
          .attr('transform', function(d){
            return 'translate(' + d.x0 + ',' + d.y0 + ')';
          })
          .select('rect')
          .attr('width', function(d){
            return d.x1 - d.x0;
          })
          .attr('height', function(d){
            return d.y1 - d.y0;
          });
        magnified = 0;
      }
      else {
        // console.log('Unexpected Exception');
      }
    });
  cell
    .append('title')
    .text(function(d){
      return d['data']['label'] + '\n' + 'Value = ' + d['data']['value'] + '\n' + 'Variance = ' + d['data']['svalue'] + '\n';
    });

  d3.select('div#treeMapContainer')
    .style('display', 'block');

  var slider_svg = d3.select("svg.slider-svg"),
    margin = {right: 50, left: 50},
    slider_width = +slider_svg.attr("width") - margin.left - margin.right,
    slider_height = +slider_svg.attr("height");

  var x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, slider_width])
      .clamp(true);

  slider_svg
    .select('*')
    .remove();

  var slider = slider_svg.append('g')
      .attr('class', 'slider')
      .attr('transform', 'translate(' + margin.left + ',' + 20 + ')');

  slider.append("line")
      .attr('class', 'track')
      .attr('x1', x.range()[0])
      .attr('x2', x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr('class', 'track-inset')
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr('class', 'track-overlay')
      .call(d3.drag()
          .on('start.interrupt', function() { slider.interrupt(); })
          .on('start drag', function() {
            handle.attr('cx', x(x.invert(d3.event.x)));
            var t = x(x.invert(d3.event.x));
            svg.selectAll('g.cell > rect')
              .attr('fill', function(d){
                if( d['data']['svalue'] < t / 8 ){
                  return '#666';
                }
                else{
                  return d['data']['color'];
                }
              })
          })
      );

  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(x.ticks(10))
    .enter().append("text")
      .attr("x", x)
      .attr("text-anchor", "middle")
      .text(function(d) { return d + '$'; });

  var handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);
}
