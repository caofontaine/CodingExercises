/*Done incorrectly.
  Lots of mix ups between Java and JavaScript regarding arrays and array functions.
  Java is type dependent, making it difficult in this case to use functions for Arrays since
  most are used specifically for Strings.
*/

public static int[] distinctInt(int[] A) {
  int distinct[];
  distinct[0] = A[0];
  for(int i = 1; i <= A.length-1; i++) {
    if(A[i].length != 1) { // Assumes a list of integers
      for(int j = 0; j < A[i].length; j++) {
        if(distinct.indexOf(A[i][j]) == -1) distinct[i] = A[i][j];
      }
    }
    else {
      if(distinct.indexOf(A[i]) == -1) distinct[i] = A[i];
    }
  }
}
  