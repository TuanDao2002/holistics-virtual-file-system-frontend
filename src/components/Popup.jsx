import React from "react";

const Popup = (props) => {
    return (
        <div className="popup-box">
          <span className="close-icon-sm md:close-icon-md" onClick={props.handleClose}>x</span>
          <div className="box-sm md:box-md">
            {<h1 className="text-center text-3xl" >Instruction</h1>}
            {props.content}
          </div>
        </div>
    );
}

export default Popup;