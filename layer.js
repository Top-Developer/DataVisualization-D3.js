var layer ={
	theCenterNode: {},
	inout: -1,
	nodes: [],
	edges: []
}

function refreshInfoBox(layer){

  var active, passive;

	if( layer['inout'] == 1){
		active = 'Receiver = ';
		passive = 'Sender';
	}else if( layer['inout'] == 0){
		active = 'Sender = ';
		passive = 'Receiver';
	}
	var innerHTML = '<div>' +
										'<p>' + active + layer['theCenterNode'] + '</p>' +
										'<span class = "line"></span>' +
										'<div class = "row">' +
											'<div class = "col-6">' + passive +'</div>' +
											'<div class = "col-3">Cost</div>' +
											'<div class = "col-3">Quantity</div>' +
										'</div>' +
										'<div class = "row scrollable">';
	layer['edges'].forEach(function(e){
		if ( inout == 1 ){
      innerHTML += '<div class = "row">' +
                      '<div class = "col-6">' + e['source']['id'] + '</div>';
    else if ( inout == 0 ){
      innerHTML += '<div class = "row">' +
                      '<div class = "col-6">' + e['target']['id'] + '</div>';
    }
    innerHTML += '<div class = "col-3">' + e['cost'] + '</div>' +
                  '<div class = "col-3">' + e['quantity'] + '</div>' +
                '</div></div>';
    d3.select('#infoBox')
  	.html(
  		innerHTML
  	)
  	.style('top', '10px')
  	.style('left', '10px')
  	.style('opacity', 1);
  }
