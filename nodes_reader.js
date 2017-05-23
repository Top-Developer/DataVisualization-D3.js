'use strict'
function nodesReader(allText){
    var nodes = [];
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    whole_node_count = allTextLines.length-2;

    for( var i=0 ; i < whole_node_count ; i++ ){
    	var data = allTextLines[i+1].split(',');
        if(data.length == headers.length){
            var node = {
                id: 'n' + i
            };
            for(var j=0 ; j<headers.length ; j++){
                if(headers[j] == 'Version'){
                    node['version'] = data[j];
                }
                if(headers[j] == 'Year'){
                    node['year'] = parseInt(data[j]);
                }
                if(headers[j] == 'Month'){
                    node['month'] = data[j];
                }
                if(headers[j] == 'Bus.Unit'){
                    //node['color'] = colorsForBU[data[j]];
                    node['category'] = data[j];
                }
                nodes.push(node);
            }
        }
    }
}