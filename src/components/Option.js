import React from 'react';
const Option = (props) =>(
        <div className='options'>
        <p className='options__text'>{props.count}.{props.optiontext}</p>      
            <button 
            className = 'button button--link'
             onClick ={(e) => {
                 props.handleDeleteOption(props.optiontext);
                 }}
                 > 
            Remove</button>
            </div>
    );



export default Option;