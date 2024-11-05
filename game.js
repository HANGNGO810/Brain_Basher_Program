
/*
    Name: Hang Ngo
    Date: March 18, 2024
    References: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
                https://www.w3schools.com/js/js_htmldom.asp
                https://www.linkedin.com/learning/javascript-enhancing-the-dom
 */

(()=>{
    //FECTH DATA
    //https://prog2700.onrender.com/threeinarow/sample ->6*6
    //https://prog2700.onrender.com/threeinarow/random ->random              
    fetch('https://prog2700.onrender.com/threeinarow/random')
    .then((response) => {
    if (!response.ok){
        throw new Error('There is an error in response! Maybe there is a problem of network');
    }
   return response.json();
})
    
.then((json) => 
{
        //div theGame is a container
        const container = document.querySelector("#theGame");
        //display name of the Game: h1 and h2
        const welcomeMsg = document.createElement('h1');
        welcomeMsg.innerText ="DAILY 3-IN-A-ROW";
        container.appendChild(welcomeMsg);
    
        //create a table element
        const table = document.createElement("table");
        table.classList ="fixed-table";
        //create a div to store buttons, checkboxs
        const divButtons = document.createElement("div");
        divButtons.id="divButtons";
       
        //Create a Button: Check Puzzles
        const checkPuzzleBtn = document.createElement("button");
        checkPuzzleBtn.type="button";
        checkPuzzleBtn.id="checkPuzzleBton";
        checkPuzzleBtn.textContent ="Check";
        //added button check puzzle to the list of buttons div
       divButtons.appendChild(checkPuzzleBtn);

       //Create a Button: Restart
       const restartBtn= document.createElement("button");
       restartBtn.type="button";
       restartBtn.id="restartbtn";
       restartBtn.textContent ="Restart";
       //added button check restart to the list of buttons div
       divButtons.appendChild(restartBtn);

        //textbox to display message for the check button
        const textBox = document.createElement("p");
        textBox.id ="textBox";
        divButtons.appendChild(textBox);

        //Create a checkbox to show mistakes when checking
        const checkBox = document.createElement("input");
        checkBox.type="checkbox";
        checkBox.id="mistakeCheckBox";
        checkBox.classList ="checkBoxStyle";
        
        //create a label element for checkbox
        const label = document.createElement('label');
        //set the 'for' attribute to the checkbox ID
        label.setAttribute('for', 'mistakeCheckBox');
        label.textContent ="Show incorrect squares";
        label.classList = "labels";
        //append the checkbox and label to container
        divButtons.appendChild(checkBox);
        divButtons.appendChild(label);

        //Create a checkbox to show X and O on squares
        const checkbox2 = document.createElement("input");
        checkbox2.type="checkbox";
        checkbox2.id ="xAndOcheck";
        checkbox2.classList ="checkBoxStyle";

        const label2= document.createElement('label');
        label2.setAttribute('for', 'xAndOcheck');
        label2.textContent = "Show X and O";
        label2.classList = "labels";
        //append the checkbox and label to container
        divButtons.appendChild(checkbox2);
        divButtons.appendChild(label2);

        //Declare an array of colors for cells in the table 
        let cellColors =["rgb(179, 172, 172)", "rgb(219, 3, 136)", "white"];//0:GRAY, 1: PINK, 2:WHITE
    
//--------------------------------------------------------FUNCTION TO CREATE TABLE OF PUZZLE------------------------------------
    function generateTable(json){
        //Create rows and columns
        for(let i=0; i<json.rows.length; i++){
            //add row to table
            let row = table.insertRow();
            //check allcorrect and allfilled

            for(let j=0; j<json.rows[i].length; j++){
                //add column to row
                let cell = row.insertCell();
                let currentCell = json.rows[i][j];
     
                //set custom data attribute: state, correctState and canToggle
                    cell.dataset.cantoggle = currentCell.canToggle;
                    cell.dataset.state = currentCell.currentState;
                    cell.dataset.correctstate = currentCell.correctState;
                    //set the color of the cell to the currentstate (index) in the array CellColors
                    cell.style.background=cellColors[cell.dataset.state];
                
            }//close for second for--loop
        }//close for first for-loop

        //Add table to the container
        container.appendChild(table);
    }
//generate table
    generateTable(json);

//add the div Buttons to the container
    container.append(divButtons);
    
//add some text for the copyright
    const msg3 = document.createElement('p');
    msg3.innerText ="Copyright 2024 HANGNGO";
    divButtons.appendChild(msg3);

    container.append(divButtons);
    const msg4 = document.createElement('p');
    msg4.id ="msg4";
    msg4.innerText ="This application was built with my own implementation of pure JavaScript (no frameworks or libraries) and working with the Document Object Model"
    msg3.appendChild(msg4);

    //
    
//----------------------------------------FUNCTION FOR CLICK CELLS-----------------------------------------------

let cells = document.querySelectorAll('td');
//Check if the cell can toggle or not, cell can be clicked if cantogg le is true
cells.forEach((cell)=>{
    if(cell.dataset.cantoggle==='true'){
        //add eventlisener when user click on each cell
            cell.addEventListener("click", ()=>{
                let currentState = parseInt(cell.dataset.state);
                //Toggle between 0, 1, 2
                let nextState = (currentState+1) %3;
                //Update cell text and state attribute
                //set the color of cell change to index in cellColors array
                cell.style.backgroundColor=cellColors[nextState];
                cell.dataset.state=nextState;

            })
    }
});

//-------------------------------------FUNCTION FOR BUTTON CHECK PUZZLE-----------------------------------------------------------------
//Check if all cells are filled and corrects?
function checkButtonFunc (){
    //declare variables to check all cells are filled or corrects
    let allCellCorrect= true;
    let allCellFilled = true;
    //get all cell in the table 

    //loop into each cell
    cells.forEach((cell) => {
        //get the current state of each cell
        let currentstate = parseInt(cell.dataset.state);
        //get the correct state of each cell
        let correctState = parseInt(cell.dataset.correctstate);

        //check if state of current cell is equal to zero
        if ( currentstate === 0) {
            //if yes, then change value of allCellFilled to false --> current cell is not filled
            allCellFilled= false;
        }
        //check if state of current cell is the not equal to the correct state
        else if(currentstate!==correctState)
        {
            //change to variable allCellCorrect to false --> state of current cell is not right
            allCellCorrect=false;
        }

            //for remove the incorrect message on squares
            if(currentstate==correctState){
                cell.textContent ="";
            }
    });

    //exit the loop of all cells
    //check conditions
    //If all cells are filled and correct 
    if ( allCellFilled  && allCellCorrect ) {
        textBox.innerText = "You did it";
    //if all currect filled cells are correct but user may not finished to game    
    } else if (allCellCorrect) {
        textBox.innerText = "So far so good";
    } 
    //else--> something is wrong: user choose the wrong correct state of cells
    else {
        textBox.innerText = "Something is wrong";
    }

checkBoxMistakeFunc();
}


//-------------------------------------FUNCTIONS FOR CHECKBOXS------------------------------------------------------------------------------------------------------------
//CHECKBOX: show incorrect squares
function checkBoxMistakeFunc(){
    let showMistakes = checkBox.checked;// showmistake is now true
    if (showMistakes) {
        //find all cells
        //iterate each cell
        cells.forEach((cell) => {
            //get the current state and correct state
            let currentstate = parseInt(cell.dataset.state);
            let correctState = parseInt(cell.dataset.correctstate);
        //If the cell is incorrect, this line adds the CSS class 'incorrect' to the cell. 
        //This class is likely used to style incorrect cells differently, such as highlighting them in red.
            if ((currentstate !== correctState) &&(currentstate!=0)) {
               // adds the CSS class 'incorrect' to the cell
                cell.classList.add('incorrect');
                cell.textContent ="!";
            }
        });
    } else { //when the checkbox is unchecked
        let cells = document.querySelectorAll('td.incorrect');
        cells.forEach((cell) => {
            //removes the CSS class 'incorrect' from the cell
            cell.classList.remove('incorrect');
            cell.textContent ="";
        });
    }
}
//----------------------------------------------------------
//CHECKBOX: show X and O on squares
function showXandO(){
    let checkXandO = checkbox2.checked;
    if (checkXandO){
        cells.forEach((cell) => {
            //get the current state and correct state
            let currentstate = parseInt(cell.dataset.state);
            if (currentstate==1) {
                // adds the CSS class 'incorrect' to the cell
                 cell.classList.add('display');
                 cell.textContent ="X";
             }
            
             if (currentstate==2) {
                // adds the CSS class 'incorrect' to the cell
                 cell.classList.add('display');
                 cell.textContent ="O";
             }

        });
    }

    else { //when the checkbox is unchecked
            let cells = document.querySelectorAll('td.display');
            cells.forEach((cell) => {
                //removes the CSS class 'incorrect' from the cell
                cell.classList.remove('display');
                cell.textContent ="";
            });
    }
}

//----------------------------------------------ADD EVENT LISTENER TO BUTTONS AND CHECKBOXS----------------------------------------------------------------------------------------------
checkPuzzleBtn.addEventListener("click", checkButtonFunc);
checkbox2.addEventListener("change",showXandO);
//RESTART BUTTON
restartBtn.addEventListener("click", ()=>{
    alert("You will lost all the current puzzle and start over from the beginning");
    window.location.reload();

});
          

})//close for Json=>
.catch(error => console.error('Error fetching data:', error));//catch the error when fetching data
})();