1. Create the application "Brain Basher" with your own implementation of pure JavaScript (no frameworks or libraries) and working with the Document Object Model (DOM). Starting puzzle data will be retrieved remotely via an available API.

2. You will simulate the 3-in-a-row puzzle by writing it in pure JavaScript. 
a.The data that you will work with is pre-defined JSON data from a remote location. https://prog2700.onrender.com/threeinarow/sample . This JSON data will serve as the underlying data structure which will represent your puzzle.
b.The display grid should be an HTML table. However, the table must be generated only using JavaScript and without using the document.write() function to output the table tags. (ie. You’ll need to create elements/nodes and attach them to the DOM).
 
c. You will add unobtrusive JavaScript events to certain squares in the puzzle so that repeatedly left-clicking on the square will cycle through and change its state to one of three distinct possibilities:
i.	Empty (State 0)
ii.	State 1
iii.	State 2
d. Squares that are set to a color (or image if you wish) at the beginning of the puzzle should not be changeable as stated in the JSON data.

e. At any time during the playing of the puzzle the end user should be able to click a “Check Puzzle” button that displays one of the following status outputs
i.	“So far so good” (all colored squares are correct but the puzzle is incomplete)
ii. “Something is wrong” (one or more of the colored squares is incorrectly assigned)
iii. “You did it!!” (all squares are correct and the puzzle has been completely filled in)
f.	A checkbox can be checked at any time which will cause the puzzle to display any incorrect squares. Unchecking the box will remove the indication of any incorrect squares.

g. All JavaScript code will be unobtrusive.
h.You will also add one Innovative Feature to your version of the puzzle which will add meaningful value to the playing of the game. When you have decided your feature, or if you are struggling deciding what to add, discuss with your instructor for approval.
(check on the game: buttons pop up thing)
