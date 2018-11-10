import React from 'react';
import './Table.css';
import KickrNavBar from '../Dashboard/NavBar'
import Leaderboard from './Leaderboard'

const Table = (props) => {
    if (props.player !== null){
        return (
            <div className="Table-container"> 
           
                <table className="Table">
                    <thead className="Table-head">
                    <tr>
                        <th>Player</th>
                        <th>Goals Scored</th>
                        <th>Assists</th>
                        <th>Team</th>
                        <th>League</th>
                    </tr>   
                    </thead>
                    <tbody className="Table-body">
                    {props.players.map((player) => (
                        <tr 
                            key = {player.id}
                            onClick={() => {console.log('row clicked')}}
                        >
                            <th>{player.firstname}</th>
                            <th>{player.goals}</th> 
                            <th>{player.assists}</th>
                            <th>{player.team}</th> 
                            <th>{player.league}</th> 
                        </tr> 
                    ))}
                    </tbody> 
                </table>
            </div>
        );
    }
    else{
        return(<div>Select data to show</div>);
    }
}

export default Table; 