/*Done in JavaScript due to ease of types.*/

function distinctInt(A) {
  var distinct = [];
  distinct[0] = A[0];
  for(var i = 1; i < A.length; i++) {
    if(Array.isArray(A[i])) { // Assumes element is a list of integers
      for(var j = 0; j < A[i].length; j++) {
        if(distinct.indexOf(A[i][j]) == -1) distinct.push(A[i][j]);
      }
    }
    else {
      if(distinct.indexOf(A[i]) == -1) distinct.push(A[i]);
    }
  }
  return distinct.sort();
}

console.log(distinctInt(new Array(4,8,13,2,3,1,new Array(2,6,8,5),1)));