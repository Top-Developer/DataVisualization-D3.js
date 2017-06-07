'use strict'

$(document).ready(function(){

	$.ajax({
		type : "GET",
		url : "data/Nodes.csv",
		dataType : "text",
		success : function(data){

			project.nodes = d3.csvParse(data);

      project.nodes.forEach(function(n){

        if( n['Node'].substring(0,2) == 'RP' ){
          n['Shape'] = 'parallelogram';
        }
        else if( n['Node'].substring(0,2) == 'BP' ){
          n['Shape'] = 'arrow';
        }
        else if( n['Node'].substring(0,2) == 'SF' || n['Node'].substring(0,2) == 'FP' ){
          n['Shape'] = 'hexagon';
        }

      });

			$.ajax({
				type : "GET",
				url : "data/Edges.csv",
				dataType : "text",
				success : function(data){

					project.edges = d3.csvParse(data);

          var i = 0;
          project.edges.forEach(function(e){
            e['ind'] = i;
            i++;
          })

          var diameter = 1000;
          var main_svg = d3.select('#main-svg')
            .attr('width', diameter)
            .attr('height', diameter);

          drawBasicLayer(project, main_svg);

					project.layer_count = 0;
					project.layers[project.layer_count] = {
						nodes: project.nodes,
						edges: project.edges,
						inout: -1,
						theCenterNode: null,
						searchedNodeId: null
					};

					d3.select('.loader')
						.style('display', 'none');
					d3.select('div#overlay')
						.style('display', 'none');
					d3.select('div#control-pane')
						.style('display', 'block');
					d3.select('body > svg')
						.style('border', 'solid 1px');

          addEventListeners();

				}
			});
		}
	});
});
