// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import React, { useState, useCallback, useEffect, useRef } from "react"; // https://reactjs.org/docs/hooks-intro.html
import ReactDOM from "react-dom";



var used_array = [];


const numberOnly = (value, fallbackValue) =>
  isNaN(value) ? fallbackValue : value;
// function numberOnly(value, fallbackValue) {
//   if (isNaN(value)) {
//     return fallbackValue;
//   } else {
//     return value;
//   }
// }

function TwoButtons(props) {
  const { title } = props; // const title = props.title;
  const [inputValue, setInputValue] = useState(""); // const stateAndSetter= useState(""); const firstValue = stateAndSetter[0], setFirstValue= stateAndSetter[1];
  const [outputValue, setOutputValue] = useState("");
  const [result, setResult] = useState("");
  const [disableOperations, setDisableOperations] = useState(true);
  

  

  const handleInputValueChange = useCallback(
    (event) => {
      // function (event){
      setInputValue((currentInputValue) => {
      	used_array = [];
        const nextInputValue = event.target.value;
        return nextInputValue;
      });
    },
    [] // no need to include dependency setFirstValue: setters do not mutate
  );

  const handleOutputValueChange = useCallback(
    (event) => {
      setOutputValue(event.target.value);
    },
    [] // no need to include dependency setoutputValue: setters do not mutate
  );

  const handleInputChange = useCallback(
    (event) => {
      event.preventDefault(); // prevents form submit action

      		var input_array = inputValue.split(" ");
      		
      		var rand = Math.floor(Math.random() * input_array.length);

      		setOutputValue(input_array[rand]);
    },
    [inputValue, outputValue, setResult]
  );

  const handleOutputChange = useCallback(
    (event) => {
      event.preventDefault(); // prevents form submit action

      		    var rand;
      		    var input_array1 = inputValue.split(" ");
      			

      				if (used_array.length < input_array1.length){
      					do {
      					
      					rand = Math.floor(Math.random() * input_array1.length);
      					}
      					while (used_array.includes(input_array1[rand]))

      					used_array.push(input_array1[rand]);

      					setOutputValue(input_array1[rand]);
      				}
      				else{
      					setOutputValue("All strings have been used.")
      				}	
      				

      		
    },
    [inputValue, outputValue, setResult]
  );

  const handleResetChange = useCallback(
    (event) => {
      event.preventDefault(); // prevents form submit action
      setInputValue("");
      setOutputValue("");
      setResult("");
      used_array = [];
    },
    [] // no need to include dependencies setFirstValue, setoutputValue, or setResult: setters do not mutate
  );

  const focusedElementRef = useRef();

  useEffect(() => {
    // focusedElementRef.current.focus();
  }, []);

  useEffect(
    () => {
      let nextDisableOperations = false;
      if (isNaN(inputValue) || isNaN(outputValue)) {
        nextDisableOperations = true;
      }

      disableOperations !== nextDisableOperations &&
        setDisableOperations(nextDisableOperations);
    },
    [disableOperations, inputValue, outputValue] // need to include firstValue and outputValue: values do mutate
  );

  return (
    <div>

    <h1> Assignment 8 </h1>
    <h4> By Paul Armati and Justin Knight </h4>
      <p>{title}</p>
      <form
        method="post"
        action="https://cs.gmu.edu:8443/offutt/servlet/formHandler"
      >
        <p>
          Input String(s):
          <input
            ref={focusedElementRef}
            name="inputValue"
            value={inputValue}
            onChange={handleInputValueChange}
            placeholder="Enter string here"
          />
        </p>
        <p>
          Output String:
          <input
            name="outputValue"
            value={outputValue}
            onChange={handleOutputValueChange}
            placeholder=""
            readOnly
          />
        </p>
        
        <button
          type="submit"
          name="operation"
          value="input"
          
          onClick={handleInputChange}
        >
          With Replacement
        </button>
        <button
          type="submit"
          name="operation"
          value="output"
          onClick={handleOutputChange}
        >
          Without Replacement
        </button>
        <button onClick={handleResetChange}>Reset</button>
      </form>
      <p> For this assignment, contributions were equal from both members. 
      Both of us contributed to working with React, the design of the page, as well as implementing the necessary functions. </p>
      <p>Click <a href="https://mason.gmu.edu/~parmati/SWE432/">here</a> to go back to SWE432.</p>
      <p>Click <a href="https://github.com/parmati94/SWE432REACT">here</a> to go to our GitHub repo.  All changes were made in \src\index.js.</p>

    </div>
  );
}

ReactDOM.render(
  <TwoButtons
    title={
      "Enter a string to begin."
    }
  />,
  document.querySelector("#root")
);

