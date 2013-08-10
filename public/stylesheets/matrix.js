
var create_matrix = function(rows){
  var matrix = [];
  for (var row = 0 ; row < rows; row++){
    matrix.push([]);
  }
  return matrix;
}

var matrix_with_nums = function(rand, randomtoget){
  var matrix = create_matrix(rand);
  numberstart = 1;
  numberend = randomtoget;
  for (var rowind = 0; rowind < matrix.length; rowind++){
    for (var colind = 0; colind < matrix.length; colind++){
      if (numberstart===0){
        matrix[rowind].push(numberstart);
      }
      else{
        matrix[rowind].push(numberstart);
        numberstart++;
        if (numberstart > numberend) {
          if(rowind != matrix.length-1 ){
            numberstart = 1
          }
          else(numberstart = 0)
        }
      }
    }
  }
  return matrix
}