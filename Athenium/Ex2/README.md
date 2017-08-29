# Question 1 - Programming

I did this in Java.

A teacher gives a class of students an exam. He decides to grade the exam using the following method:

* A score in the top 20% of all scores is an A.
* A score in the next 20% of scores is a B.
* A score in the next 20% of scores is a C.
* A score in the next 20% of scores is a D.
* A score in the bottom 20% of scores is an F.

For example, if a class of 20 students has the following scores:
99, 92, 91, 91, 89, 85, 83, 82, 80, 79, 78, 78, 77, 76, 75, 74, 62, 55, 43, 20

The first four scores (99, 92, 91, 91) would be an A, scores 5 through 8 (89,85, 83, 82) would be a B, scores 9 through 12 (80, 79, 78, 78) would be a C,scores 13 through 16 would be a D (77, 76, 75, 74) and scores 17 through 20 (62, 55, 43, 20) would be an F.

Write a function that takes an arbitrary (possibly unsorted) score list of any length (not necessarily the list used as an example above) as a parameter, and returns a grade for each score.

Note that since the list of scores can be of any length the number of scores may not necessarily be divisible by 5. Please make sure your function will handle those cases gracefully and consistently.

ADDITIONAL REQUIREMENT: If there are two (or more) scores that are identical, then those identical numerical scores must always receive the same grade, even if that causes some grades to contain more scores than others.

You may use any programming language you wish. Please make sure your code is syntactically valid and would produce an output that identifies which letter grade is received by each numerical score in the input list.