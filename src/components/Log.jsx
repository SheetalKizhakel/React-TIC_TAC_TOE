//Our log outputs an ordered list with an ID of log for styling reasons where we output information about the differnet turns we had in our game so far
export default function Log({turns})
{
    //whenever youre outputting a list dynamically you need to give a key to the li
    //backticks + dollar is used to dynamically construct strings
    return(
        <ol id="log">
        
        {turns.map(turn=><li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>)}
        </ol>
    )
}