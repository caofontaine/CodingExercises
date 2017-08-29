import java.util.Arrays;

public class Grading {
  
  public static void checkDuplicate(int[] scores, String[] letterGrades, String[] gradeFormat, int i, int j) {
    if(scores[i] == scores[i+1]) { //Checks if score is equal to previous.
      letterGrades[i] = letterGrades[i+1]; //If equal, give equal letter grade.
    }
    else {
      letterGrades[i] = gradeFormat[j]; //If not, proceed as normal.
    }
  }
  
  public static void grading(int[] scores) {
    String[] gradeFormat = {"A", "B", "C", "D", "F"};
    String[] letterGrades = new String[scores.length];
    int j = 0; //Counter for letter grade representation.
    double limit = 2.0; //Counter for number of grades in certain percentile. Set at 2 since first number is manually determined below.
    double percentile = Math.ceil(scores.length/5.0); //The number of grades for each 20%.
    Arrays.sort(scores);
    
    letterGrades[scores.length - 1] = "A"; //First grade is always the top.
    
    //Print out first grade.
    System.out.println(scores[scores.length-1] + " - " + letterGrades[letterGrades.length-1]);
    
    for(int i = (scores.length - 2); i >= 0; i--) {
      if((limit <= percentile)) { //Checks if within the proper percentile.
        checkDuplicate(scores, letterGrades, gradeFormat, i, j);
        System.out.println(scores[i] + " - " + letterGrades[i]);
        limit++;
      }
      else {
        j++;
        checkDuplicate(scores, letterGrades, gradeFormat, i, j);
        System.out.println(scores[i] + " - " + letterGrades[i]);
        limit = 2.0;
      }
    }
  }
    
  public static void main(String[] args) {

    grading(new int[] {99,92,91,91,89,85,83,82,80,79,78,78,77,76,75,74,62,55,43,20});
    //grading(new int[] {99,100,2});
    //grading(new int[] {99,99,99,99,99,99,99,80}); 
    //grading(new int[] {91,89,83,80,79,78,75,62,55,43});
  }
    
}
  