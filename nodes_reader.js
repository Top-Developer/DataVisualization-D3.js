'use strict'

var typeToColor  = {
  'SR' : 2,
  'PR' : 4,
  'SP' : 6,
  'FP' : 8
};

var nodeToIndex = {};

function nodesReader(allText){

  var nodes = [];

  var allTextLines = allText.split(/\r\n|\n/);

  var headers = allTextLines[0].split(',');

  var lines = [];

  var whole_node_count = allTextLines.length-1;

  for( var i = 0 ; i < whole_node_count ; i++ ){

    var data = allTextLines[ i + 1 ].split(',');

    if( data.length == headers.length ){

      var node = {};

      for(var j = 0 ; j < headers.length ; j++){

        if( headers[j] == 'Node' ){

          node['id'] = data[j];
        }
        if( headers[j] == 'Type' ){

          node['type'] = data[j];

          node['color'] = typeToColor[ data[j] ];
        }
      }
      nodeToIndex[ node['id'] ] = i;
      nodes.push(node);
    }
  }
  return nodes;
}
