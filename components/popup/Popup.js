import React, { useState } from "react";

export default function Popup({close, children}) {

    return (
        <div className = "popup-overlay">
            <div className = "popup-wrapper">
                <div className = "popup-content"> {children} </div>
                <div className = "popup-close" onClick={close}>X</div>
            </div>
        </div>
    )
}