'use strict'

var typeToColor  = {
  'SR' : '#90d4f7',
  'PR' : '#c497f2',
  'SP' : '#71e096',
  'FP' : '#668de5'
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

      var node = {
        'img': '1.png'
      };

      for(var j = 0 ; j < headers.length ; j++){

        if( headers[j] == 'Bus.Unit' ){

          node['busunit'] = data[j];
        }
        if( headers[j] == 'Node' ){

          node['id'] = data[j];
        }
        if( headers[j] == 'Variance' ){

          node['var'] = data[j];
        }
        if( headers[j] == 'Idle_Cap' ){

          node['ic'] = data[j];
        }
        if( headers[j] == 'Type' ){

          node['type'] = data[j];

          node['color'] = typeToColor[ data[j] ];
        }
        if( headers[j] == 'Email' ){

          node['email'] = data[j];
        }
      }
      nodeToIndex[ node['id'] ] = i;
      nodes.push(node);
    }
  }
  return nodes;
}
