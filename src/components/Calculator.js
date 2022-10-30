import {React, useState, useRef} from 'react'
import "./styles.css"
import Display from './Display'
import Keypad from './Keypad'

export default function Calculator() {
  const [display, setDisplay] = useState("")
  const interimResult = useRef(0)
  const currentValue = useRef("")
  const currentOperator = useRef("")
  const numberCount = useRef(0)
  const reset = useRef(false);

  function handleClick(event){
    if (event.target.nodeName === "BUTTON"){
      const button = event.target.textContent;
      
      if (button === "AC") {
        interimResult.current = 0;
        currentValue.current = "";
        currentOperator.current = "";
        numberCount.current = 0;
        setDisplay("");
        return;
      }

      if (button === "=") {
        if (currentValue.current === "") return;

        handlePercentKey();
        calculateInterim();

        (Number.isInteger(interimResult.current)) ? setDisplay(interimResult.current) : setDisplay(interimResult.current.toFixed(2));

        interimResult.current = 0;
        currentValue.current = "";
        numberCount.current = 0;
        currentOperator.current = "";
        reset.current = true;
        return;
      }

      if (button === "+/-"){
        console.log(display.lastIndexOf(currentValue.current));
        const indexDisplayCurrent = display.lastIndexOf(currentValue.current);
        const displayCurrent = display.substring(indexDisplayCurrent);
        const displayRest = display.substring(0, indexDisplayCurrent);
        console.log(displayRest, displayCurrent);

        const sign = Math.sign(Number(displayCurrent));
        
        if (sign === 1){
          setDisplay(displayRest + Number(displayCurrent) * -1)
          currentValue.current = Number(currentValue.current) * -1
        } else if (sign === -1) {
          setDisplay(displayRest + Math.abs(displayCurrent))
          currentValue.current = Math.abs(currentValue.current)
        }
        return;
      }

      if (button === "/" || button === "x" || button === "+" || button === "-" ){
        if (currentValue.current === "") return;

        if (numberCount.current === 0) {
          handlePercentKey();
          interimResult.current = Number(currentValue.current);
          currentOperator.current = button;
          currentValue.current = "";
          numberCount.current = 1;
        } else if (numberCount.current === 1){
          setDisplay(...display + button);
          handlePercentKey();
          calculateInterim();
          currentOperator.current = button;
        }
      } else {
        if (button === "." && currentValue.current.includes(".")) return;
        if (button === "." && currentValue.current === "") return;
        if (button === "%" && currentValue.current.includes("%")) return;
        if (button === "%" && currentValue.current === "") return;
        currentValue.current += button;
      }
      
      let displayUpdate = "";
      if (reset.current){
        displayUpdate = button;
        reset.current = false;
      } else {
        displayUpdate = display + button;
      }
      setDisplay(displayUpdate)
    }
  }

  function calculateInterim(){
    switch (currentOperator.current) {
      case "/":
        interimResult.current /= Number(currentValue.current);
        currentValue.current = "";
        break;
      case "x":
        interimResult.current *= Number(currentValue.current);
        currentValue.current = "";
        break;
      case "-":
        interimResult.current -= Number(currentValue.current);
        currentValue.current = "";
        break;
      case "+":
        interimResult.current += Number(currentValue.current);
        currentValue.current = "";
        break;
    
      default:
        interimResult.current = currentValue.current;
        break;
    }
  }

  function handlePercentKey(){
    const lastDigit = currentValue.current.length-1;
    if (currentValue.current[lastDigit] === "%"){
      currentValue.current = currentValue.current.slice(0, -1) / 100;
    }
  }

  return (
    <div className="calculator" onClick={handleClick}>
        <Display display={display}/>
        <Keypad />
    </div>
  )
}
