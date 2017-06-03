'use strict'

var project = {

	nodes : [],
	edges : [],
	layers : [],
	layer_count : -1,
	searchedNodeId : ''
};

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

          addEventListeners();

					// project.layer_count = 0;
					// project.layers.push({
					// 	'nodes': project.nodes,
					// 	'edges': project.edges,
					// 	'inout': -1,
					// 	'theCenterNode': null
					// });

					//addEventListeners();
				}
			});
		}
	});
});
