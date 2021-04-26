import React from 'react';

// This function presents an input box and a list of todo's items to handle

function inputBox({placeholder, inputText, onInputChange, results, onSelected}) {
    return (
        <div className="c-searchbox">
            <input type="text" placeholder={placeholder} value={inputText} 
                onChange={e => onInputChange(e.target.value)}/>
            <ul className="result-box">
                {results.map((result, index) => 
                    <li  onClick={() => onSelected(index)}>
                        {result}
                    </li>)}
            </ul>
        </div>
    );
}

export default inputBox;