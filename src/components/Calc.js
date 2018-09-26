import React from 'react';
import DisplayWindow from './DisplayWindow';
import Key from './Key';
export default class Calc extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false,
            operators:['/','*','+','-','='],
        }
    } 
    componentDidMount() {
      document.addEventListener('keydown', this.handleKey)
     }
    clearLastChar = () => {
      if (this.state.displayValue.indexOf('e')!==-1) {
        this.setState({
          displayValue:'0'
        })
      }
      this.setState({
        displayValue: this.state.displayValue.substring(0, this.state.displayValue.length - 1) || '0'
      })
      if (this.state.displayValue==='0') {
        this.clearAll();
      }
      
    }
 
    clearAll = () => {
        this.setState({
          value: null,
          displayValue: '0',
          operator: null,
          waitingForOperand: false
        })
      }
    clearDisplay = () => {
        this.setState({
          displayValue: '0'
        })
    }
    inputPrecent = () => {
      const { displayValue } = this.state;
      const currentValue = parseFloat(displayValue);
      if (currentValue === 0)
      return;
      const newValue = currentValue/100;
      this.setState({
        displayValue: String(newValue)
      })
      
    }
    toggleSign = () => {
      const newValue = parseFloat(this.state.displayValue) * -1
      
      this.setState({
        displayValue: String(newValue)
      })
    }
    onDigitPress = (digit) => {
        if (this.state.waitingForOperand) {
            this.setState({
              displayValue: String(digit),
              waitingForOperand: false
            })
          } else {
            this.setState({
                displayValue: this.state.displayValue === '0' ?
                 String(digit) : this.state.displayValue + digit
              })
            }
    }

      operation = (nextOperator) => { 
        const parsedValue = parseFloat(this.state.displayValue);
        
        if (this.state.value == null) {
          this.setState({
            value: parsedValue
          })
        } else if (this.state.operator) {
          const currentValue = this.state.value || 0;
          const operate = () => {
            switch(this.state.operator){
                case '/':
                return currentValue / parsedValue;    
                case '*':
                return currentValue * parsedValue;
                case '+':
                return currentValue + parsedValue;
                case '-':
                return currentValue - parsedValue;
                case '=':
                return parsedValue;
                default:
                return;
            }
          }
          const newValue = operate();
          this.setState({
            value: newValue,
            displayValue: String(newValue)
          })
        }
        this.setState({
          waitingForOperand: true,
          operator: nextOperator
        })
      }
      inputDot() {
        const { displayValue } = this.state
        if (!(/\./).test(displayValue)) {
          this.setState({
            displayValue: displayValue + '.',
            waitingForOperand: false
          })
        }
      }
      handleKey = (event) => {
        let { key } = event
        event.preventDefault()
        if (key === 'Enter')
          key = '=';
        if ((/\d/).test(event.key)) {
          this.onDigitPress(parseInt(key, 10))
        }else if (this.state.operators.find(((operator) => operator === key))) {
          this.operation(key);
        } else if (key === 'Backspace') {
          this.clearLastChar();
        }else if (key ==='.'){
          this.inputDot();
        }else if(key === '%'){
          this.inputPrecent();
        }
      };
    render(){
        const { displayValue } = this.state  
        const clearDisplay = displayValue !== '0'
        const clearKey = clearDisplay ? 'C' : 'AC'
        return(
         <div className="calculator" >
         <DisplayWindow  scale={this.state.scale} displayValue={this.state.displayValue} />
         <div className="calculator-buttons">
              <Key className="calc-button  function-key" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearKey}</Key> 
              <Key className="calc-button  function-key"  onPress={() => this.toggleSign()}>±</Key>
              <Key className="calc-button  function-key" onPress = {() =>this.inputPrecent()}>%</Key>
              <Key className="calc-button  operator-key" onPress = {() => this.operation('/')}>÷</Key>
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(7)}>7</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(8)}>8</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(9)}>9</Key>
              <Key className="calc-button  operator-key" onPress = {() => this.operation('*')}>×</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(4)}>4</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(5)}>5</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(6)}>6</Key> 
              <Key className="calc-button  operator-key" onPress = {() => this.operation('-')}>-</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(1)}>1</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(2)}>2</Key> 
              <Key className="calc-button  digit-keys" onPress = {() => this.onDigitPress(3)}>3</Key> 
              <Key className="calc-button  operator-key" onPress = {() => this.operation('+')}>+</Key>
              <Key className="calc-button  key-0 digit-keys" onPress = {() => this.onDigitPress(0)}>0</Key> 
              <Key className="calc-button  digit-keys key-dot"  onPress = {() => this.inputDot()}>●</Key> 
              <Key className="calc-button  operator-key" onPress = {() => this.operation('=')}>=</Key>

           </div>
           </div>
        )
    }
}
