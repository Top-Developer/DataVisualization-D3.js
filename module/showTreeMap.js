'use strict'

function showTreeMap(layer){

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
    console.log(e);
		if( e['Version'] == 'A/T' ){
			if( parseFloat( e['Cost'] ) != 0.0 ){
				if( layer['inout'] == 1 ){
					layer['nodes'].forEach(function(n){
						if( n['Node'] == e['Sender'] ){
							theNode = n;
              console.log(theNode);
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
							value: 0,
              color: theNode['Color']
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
              color: theNode['Color']
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
              color: theNode['Color']
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
              color: theNode['Color']
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
							svalue: 0,
              color: theNode['Color']
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
							svalue: 0,
              color: theNode['Color']
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
							svalue: 0,
              color: theNode['Color']
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
							svalue: 0,
              color: theNode['Color']
						});
						total['fp'] += parseFloat( e['Cost'] );console.log(total['fp']);
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
  console.log(total['sr']);
  if( total['sr'] != 0 ){
    data.children.push({
      label: 'Support Resource',
      children: sr
    });
  }
  console.log(total['pr']);
  if( total['pr'] != 0 ){
    data.children.push({
      label: 'Production Resource',
      children: pr
    });
  }
  console.log(total['sp']);
  if( total['sp'] != 0 ){
    data.children.push({
      label: 'Semi-finished Product',
      children: sp
    });
  }
  console.log(total['fp']);
  if( total['fp'] != 0 ){
    data.children.push({
      label: 'Finished Product',
      children: fp
    });
  }console.log(data);

  var width = 800, height = 600;

  var div = d3.select('#treeMapContainer')
    .style("width", width)
    .style("height", height);

  console.log(width);
  console.log(height);

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

  console.log(root);

  var tree = treemap(root);

  var margin_top = screen.height / 2 - 300;
  var margin_left = $(window).width() / 2 - 400;

  var tooltip = d3.select("body")
	.append('div')
  .attr('class', 'maptooltip')
	.style('position', 'absolute')
	.style('z-index', '10')
	.style('visibility', 'hidden');

  var leaf = div.datum(root)
    .selectAll('.unit')
    .data(tree.leaves())
    .enter()
    .append('div')
    .attr('class', 'unit')
    .style('position', 'absolute')
    .style('left', function(d){
      return margin_left + d.x0 + 'px';
    })
    .style('top', function(d){
      return margin_top + d.y0 + 'px';
    })
    .style('width', function(d){
      return Math.max(0, d.x1 - d.x0 - 1) + 'px';
    })
    .style('height', function(d){
      return Math.max(0, d.y1 - d.y0 - 1) + 'px';
    })
    .style('background-color', function(d){
      //return 'hsl(360, 100%, ' + (100 - d.data.svalue) + '%)';
      return d['data']['color'];
    })
    .on('click', function(d){
      d3.event.stopPropagation();
    })
    .on('mouseover', function(d){
      tooltip
        .selectAll('*')
        .remove();
      tooltip
        .append('div')
        .text(d['data']['label']);
      tooltip
        .append('div')
        .text('value : ' + d['value']);
      tooltip
        .append('div')
        .text('variance : ' + d['data']['svalue']);
      tooltip
        .style("visibility", "visible");
      return tooltip;
    })
    .on("mousemove", function(d){
      return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
    })
    .on("mouseout", function(){
      return tooltip.style("visibility", "hidden");
    });
}
