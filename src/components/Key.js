import React from 'react';
import PointTarget from 'react-point'
const Key = ({onPress,...props}) => {
    return(
        <PointTarget onPoint={onPress}>
            <button {...props} />
        </PointTarget>
        )
}
export default Key;
