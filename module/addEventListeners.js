'use strict'

var project = {

	nodes : [],
	edges : [],
	layers : [],
	layer_count : -1
};

function addEventListeners(){

  d3.select('div#overlay')
  .on('click', function(e){
    d3.selectAll('div#chartContainer > *').remove();
    d3.select(this)
    .style('display', 'none');
  });

	d3.select('#toggle-edges')
  .on('click', function(e){
    console.log(d3.select(this).text());
		if( d3.select(this).text() == ' Show all edges ' ){
			d3.select(this).text(' Hide all edges ');
			d3.selectAll('line.edge')
				.style('opacity', 1);
		}
		else if( d3.select(this).text() == ' Hide all edges ' ){
			d3.select(this).text(' Show all edges ');
			d3.selectAll('line.edge')
				.style('opacity', 0);
		}
		// d3.select(this)
		// 	.text()
  });

  d3.select('div#chartContainer')
  .on('click', function(e){
    d3.event.stopPropagation();
  });

  d3.select('#business-category')
  .on('change', function(e){
    var sel = document.getElementById('business-category');
    if( sel.options[sel.selectedIndex].value == 'All categories' ){

			d3.select('div#overlay')
				.style('display', 'block');
			d3.select('.loader')
				.style('display', 'block');
			d3.select('span#min-variance-val').text(function(d){
				return +d3.select('#min-variance').property("value");
			});

			setTimeout(function(){
				project['nodes'].forEach(function(n){
	        n['bus_filtered'] = false;
	        if ( n['var_filtered'] == true ){
	          n['hidden'] = true;
	          d3.selectAll( 'path#' + n['Node'] )
	          .attr('class', 'node hidden');
	        }
	        else{
	          d3.selectAll( 'path#' + n['Node'] )
	          .attr('class', 'node');
	          n['hidden'] = false;
	          n['var_filtered'] = false;
	        }
	      });

	      project['edges'].forEach(function(e){
	        if( d3.select('path#' + e['Sender']).attr('class') == 'node hidden' || d3.select('path#'+e['Receiver']).attr('class') == 'node hidden' ){
	          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
	          .attr('class', 'edge hidden');
	          e['var_filtered'] = true;
	          e['hidden'] = true;
	        }
	        else{
	          e['var_filtered'] = false;
	          if( e['bus_filtered'] != true ){
	            e['hidden'] = false;
	            d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
	            .attr('class', 'edge');
	          }
	        }
	      });
				closeReport();
				d3.select('div#overlay')
					.style('display', 'none');
				d3.select('.loader')
					.style('display', 'none');
			}, 10);
    }
    else if( sel.options[sel.selectedIndex].value == 'BU01' ){

			d3.select('div#overlay')
				.style('display', 'block');
			d3.select('.loader')
				.style('display', 'block');
			d3.select('span#min-variance-val').text(function(d){
				return +d3.select('#min-variance').property("value");
			});

			setTimeout(function(){

	      project['nodes'].forEach(function(n){
	        if( n['Bus.Unit'] == 'BU01' ){
	          n['bus_filtered'] = true;
	          n['hidden'] = true;
	          d3.selectAll( 'path#' + n['Node'] )
	          .attr('class', 'node hidden');
	        }else{
	          n['bus_filtered'] = false;
	          if( n['var_filtered'] != true ){
	            n['hidden'] = false;
	            d3.selectAll( 'path#' + n['Node'] )
	            .attr('class', 'node');
	          }
	        }
	      });

	      project['edges'].forEach(function(e){
	        if( d3.select('path#' + e['Sender']).attr('class') == 'node hidden' || d3.select('path#'+e['Receiver']).attr('class') == 'node hidden' ){
	          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
	          .attr('class', 'edge hidden');
	          e['var_filtered'] = true;
	          e['hidden'] = true;
	        }
	        else{
	          e['var_filtered'] = false;
	          if( e['bus_filtered'] != true ){
	            e['hidden'] = false;
	            d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
	            .attr('class', 'edge');
	          }
	        }
	      });
				closeReport();
				d3.select('div#overlay')
					.style('display', 'none');
				d3.select('.loader')
					.style('display', 'none');
			}, 10);
    }
    else if( sel.options[sel.selectedIndex].value == 'BU02' ){

			d3.select('div#overlay')
				.style('display', 'block');
			d3.select('.loader')
				.style('display', 'block');
			d3.select('span#min-variance-val').text(function(d){
				return +d3.select('#min-variance').property("value");
			});

			setTimeout(function(){

	      project['nodes'].forEach(function(n){
	        if( n['Bus.Unit'] == 'BU02' ){
	          n['bus_filtered'] = true;
	          n['hidden'] = true;
	          d3.selectAll( 'path#' + n['Node'] )
	          .attr('class', 'node hidden');
	        }else{
	          n['bus_filtered'] = false;
	          if( n['var_filtered'] != true ){
	            n['hidden'] = false;
	            d3.selectAll( 'path#' + n['Node'] )
	            .attr('class', 'node');
	          }
	        }
	      });

	      project['edges'].forEach(function(e){
	        if( d3.select('path#' + e['Sender']).attr('class') == 'node hidden' || d3.select('path#'+e['Receiver']).attr('class') == 'node hidden' ){
	          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
	            .attr('class', 'edge hidden');
	          e['var_filtered'] = true;
	          e['hidden'] = true;
	        }
	        else{
	          e['var_filtered'] = false;
	          if( e['bus_filtered'] != true ){
	            e['hidden'] = false;
	            d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
	            .attr('class', 'edge');
	          }
	        }
	      });
				closeReport();
				d3.select('div#overlay')
					.style('display', 'none');
				d3.select('.loader')
					.style('display', 'none');
			}, 10);
    }
  });

	d3.select('#min-variance')
	  .on('input', function(e){
			d3.select('span#min-variance-val').text(function(d){
				return +d3.select('#min-variance').property("value");
			});
		});

	d3.select('#min-variance')
	  .on('mouseup', function(e){

			d3.select('div#overlay')
				.style('display', 'block');
			d3.select('.loader')
				.style('display', 'block');

			setTimeout(function(){
	    	filter();
				closeReport();
				d3.select('div#overlay')
					.style('display', 'none');
				d3.select('.loader')
					.style('display', 'none');
			}, 10);

	  });

	function filter(){
		var t = +d3.select('#min-variance').property("value");
    project['nodes'].forEach(function(n){
      if( parseInt( n['Variance'] ) < t ){
        d3.selectAll( 'path#' + n['Node'] )
        .attr('class', 'node hidden');
        n['var_filtered'] = true;
        n['hidden'] = true;
      }
      else{
        n['var_filtered'] = false;
        if( n['bus_filtered'] != true ){
          n['hidden'] = false;
          d3.selectAll( 'path#' + n['Node'] )
          	.attr('class', 'node');
        }
      }
    });
    project['edges'].forEach(function(e){
      if( d3.select('path#' + e['Sender']).attr('class') == 'node hidden' || d3.select('path#'+e['Receiver']).attr('class') == 'node hidden' ){
        d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
        .attr('class', 'edge hidden');
        e['var_filtered'] = true;
        e['hidden'] = true;
      }
      else{
        e['var_filtered'] = false;
        if( e['bus_filtered'] != true ){
          e['hidden'] = false;
          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
          .attr('class', 'edge');
        }
      }
    });
	}

  d3.select('.btn-search').on('click', function(d){

    var t = document.getElementById('id-search').value;

    if( t != '' ){
      project.layers[project.layer_count].nodes.forEach(function(n){
        if( n['Node'] == t ){
          if( project.layer_count == 0 ){
            d3.select('#main-svg')
              .selectAll('path.node')
              .style('opacity', function(d){
                if(t == d['data']['Node']){
                  return 1;
                }
                else{
                  return 0.2;
                }
              });
              d3.select('#main-svg')
                .selectAll('line.edge')
                .style('opacity', 0);
          }
          else if( project.layer_count > 0 ){
            d3.select('#layer-svg')
              .selectAll('path.node')
              .style('opacity', function(d){
                if(t == d['Node']){
                  return 1;
                }
                else{
                  return 0.2;
                }
              });
              d3.select('#layer-svg')
                .selectAll('line.edge')
                .style('opacity', 0);
          }
        }
      });
			closeReport();
    }



    // var result = d3.select('#' + document.getElementById('id-search').value);
    //
		// if( !result.empty() ){
    //
		// 	if( project.searchedNodeId != '' ){
    //
		// 		d3.select('#' + project.searchedNodeId).attr('d', function(d){
		// 	    return custom_shapes[d.shape](project.node_radius, project.node_radius);
		// 	  });
		// 	}
		// 	result.attr('d', function(d){
		// 		return custom_shapes[d.shape]( 1.5 * project.node_radius, 1.5 * project.node_radius);
		// 	});
		// 	project.searchedNodeId = result.attr('id');
		// 	console.log(project.searchedNodeId);
		// }
	});
}
