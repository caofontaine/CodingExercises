class Solution {
  public int solution(int[] A) {
    int sum = 0, avg = 0;
	int i = 0;
	int curDev = 0; // Value of current calculated deviation.
	int index = 0;
	int highDev = -1; // Value of most extreme deviation.
	
	// If array is empty, return -1
	if (A.length == 0) return -1;
	
	// Add the array elements together.
	for (i = 0; i < A.length; i++) {
	  sum += A[i];	
	}
	
	// Find the extreme element by looping through and calculating deviation.
	for (i = 0; i < A.length; i++) {
	  curDev = Math.abs(A[i] - avg);

      // If the current calculated deviation is more extreme than the current extreme,
      // make curDev the new highDev.
      if(curDev > highDev) {
        highDev = curDev;
		index = i;
      }	  
	}
	
	return index;
  }  
}