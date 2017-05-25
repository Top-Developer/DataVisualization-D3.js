'use strict'
function edgesReader(allText){
  var edges = [];

  var allTextLines = allText.split(/\r\n|\n/);

  var headers = allTextLines[0].split(',');

  var lines = [];

  var whole_edge_count = allTextLines.length-1;

  for( var i = 0 ; i < whole_edge_count ; i++ ){

    var data = allTextLines[ i + 1 ].split(',');

    if( data.length == headers.length ){

      var edge = {};

      for(var j=0 ; j<headers.length ; j++){

        if( headers[j] == 'Sender' ){

          edge['source'] = data[j];
        }
        if( headers[j] == 'Receiver' ){

          edge['target'] = data[j];
        }
        if( headers[j] == 'Cost' ){

          edge['cost'] = data[j];
        }
        if( headers[j] == 'Quantity' ){

          edge['quantity'] = data[j];
        }
      }
      edges.push(edge);
    }
  }
  return edges;
}
