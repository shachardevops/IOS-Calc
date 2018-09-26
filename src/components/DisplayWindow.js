import React from 'react';
import DynamicFont from 'react-dynamic-font';

const DisplayWindow = (props) => {
    const value = props.displayValue;
   
    let formattedValue = Number(value).toLocaleString('en-US', {
      useGrouping: true,
      maximumFractionDigits: 20
    })

    const match = value.match(/\.\d*?(0*)$/)
    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
      if (Number(value)>999999999999999) {
        formattedValue = '∞';
    }
    if ((Number(value)>0&&Number(value)<9e-20)||
        (Number(value)<0&&Number(value)>-9e-20)) {
        formattedValue = '0';
    }
    return(
        <div className="calculator-display">
            <DynamicFont  content={formattedValue} />
        </div>
        )
}
export default DisplayWindow;

    
      
    
