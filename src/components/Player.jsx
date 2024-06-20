import { useState } from "react";
export default function Player(props)
//since we need to manage some data that should cause the UI to update when changed we have to take a state variable for edit button 
{
    const [isEditing,setIsEditing]=useState(false);//i plan to store the information whether we currently are editing the player or not
    const [playerName,setPlayerName]=useState(props.name);//I want to get the changes the user applies to the input in the playername textbox so we can save the upadated player name and output it.I want to update this state whenever i type into the input field
    //handle is used as a convention to indicate that this function will be triggered upon some event
    function handleEditClick()
    {
        setIsEditing((editing)=>!editing);
    }
    //this function will be triggered whenever user enters character or pastes value into input field etc.
    function handleInputChange(event)
    {
        //OnChange triggers for every keystroke and will provide us with an event object that contains the value that was entered by the user
        //the event object has a property called target which will refer to the element<here input> that emitted the event
        //the value is obtained through .value
        setPlayerName(event.target.value);
    }


    return(
        <li className={props.isActive?'active':undefined}>
            <span className="player">
            {isEditing?<input type="text" required value={playerName} onChange={handleInputChange}></input>:<span className="player-name">{playerName}</span>}
            <span className="player-symbol">{props.symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
            
          </li>
    )
}