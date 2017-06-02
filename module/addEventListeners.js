'use strict'

function addEventListeners(){

  d3.select('div#overlay')
  .on('click', function(e){
    d3.selectAll('div#chartContainer > *').remove();
    d3.select(this)
    .style('display', 'none');
  });

  d3.select('div#chartContainer')
  .on('click', function(e){
    d3.event.stopPropagation();
  });

  d3.select('#business-category')
  .on('change', function(e){
    var sel = document.getElementById('business-category');
    if( sel.options[sel.selectedIndex].value == 'All categories' ){

      project['nodes'].forEach(function(n){
        n['bus_filtered'] = false;
        if ( n['var_filtered'] == true ){
          n['hidden'] = true;
          d3.selectAll( 'path#' + n['id'] )
          .attr('class', 'hidden');
        }
        else{
          d3.selectAll( 'path#' + n['id'] )
          .attr('class', '');
          n['hidden'] = false;
          n['var_filtered'] = false;
        }
      });

      project['edges'].forEach(function(e){
        if( e['source']['hidden'] == true || e['target']['hidden'] == true ){
          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
          .attr('class', 'hidden');
          e['var_filtered'] = true;
          e['hidden'] = true;
        }
        else{
          e['var_filtered'] = false;
          if( e['bus_filtered'] != true ){
            e['hidden'] = false;
            d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
            .attr('class', '');
          }
        }
      });
    }
    else if( sel.options[sel.selectedIndex].value == 'BU01' ){

      project['nodes'].forEach(function(n){
        console.log(n['busunit']);
        if( n['busunit'] == 'BU01' ){
          n['bus_filtered'] = true;
          n['hidden'] = true;
          d3.selectAll( 'path#' + n['id'] )
          .attr('class', 'hidden');
        }else{
          n['bus_filtered'] = false;
          if( n['var_filtered'] != true ){
            n['hidden'] = false;
            d3.selectAll( 'path#' + n['id'] )
            .attr('class', '');
          }
        }
      });

      project['edges'].forEach(function(e){
        if( e['source']['hidden'] == true || e['target']['hidden'] == true ){
          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
          .attr('class', 'hidden');
          e['var_filtered'] = true;
          e['hidden'] = true;
        }
        else{
          e['var_filtered'] = false;
          if( e['bus_filtered'] != true ){
            e['hidden'] = false;
            d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
            .attr('class', '');
          }
        }
      });
    }
    else if( sel.options[sel.selectedIndex].value == 'BU02' ){

      project['nodes'].forEach(function(n){
        if( n['busunit'] == 'BU02' ){
          n['bus_filtered'] = true;
          n['hidden'] = true;
          d3.selectAll( 'path#' + n['id'] )
          .attr('class', 'hidden');
        }else{
          n['bus_filtered'] = false;
          if( n['var_filtered'] != true ){
            n['hidden'] = false;
            d3.selectAll( 'path#' + n['id'] )
            .attr('class', '');
          }
        }
      });

      project['edges'].forEach(function(e){
        if( e['source']['hidden'] == true || e['target']['hidden'] == true ){
          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
          .attr('class', 'hidden');
          e['var_filtered'] = true;
          e['hidden'] = true;
        }
        else{
          e['var_filtered'] = false;
          if( e['bus_filtered'] != true ){
            e['hidden'] = false;
            d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
            .attr('class', '');
          }
        }
      });
    }
  });

  d3.select('#min-variance')
  .on('input', function(e){
    console.log( d3.select('#min-variance').property("value"));
    console.log(+this.value);
    var t = +this.value;
    project['nodes'].forEach(function(n){
      if( parseInt( n['var'] ) < t ){
        d3.selectAll( 'path#' + n['id'] )
        .attr('class', 'hidden');
        n['var_filtered'] = true;
        n['hidden'] = true;
      }
      else{
        n['var_filtered'] = false;
        if( n['bus_filtered'] != true ){
          n['hidden'] = false;
          d3.selectAll( 'path#' + n['id'] )
          .attr('class', '');
        }
      }
    });
    project['edges'].forEach(function(e){
      if( e['source']['hidden'] == true || e['target']['hidden'] == true ){
        d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
        .attr('class', 'hidden');
        e['var_filtered'] = true;
        e['hidden'] = true;
      }
      else{
        e['var_filtered'] = false;
        if( e['bus_filtered'] != true ){
          e['hidden'] = false;
          d3.selectAll( 'line[ind="' + e['ind'] + '"]' )
          .attr('class', '');
        }
      }
    });
  });

  d3.select('.btn-search').on('click', function(d){

		var result = d3.select('#' + document.getElementById('id-search').value);

		if( !result.empty() ){

			if( project.searchedNodeId != '' ){

				d3.select('#' + project.searchedNodeId).attr('d', function(d){
			    return custom_shapes[d.shape](project.node_radius, project.node_radius);
			  });
			}
			result.attr('d', function(d){
				return custom_shapes[d.shape]( 1.5 * project.node_radius, 1.5 * project.node_radius);
			});
			project.searchedNodeId = result.attr('id');
			console.log(project.searchedNodeId);
		}
	});
}
