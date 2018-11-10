import React, {Component} from 'react';
import Table from './Table'
import LoadingTeams from './LoadingTeams';
import axios from 'axios';
import KickrNavBar from '../Dashboard/NavBar'

class Leaderboard extends Component {
    constructor(){
        super();

        this.state={
            playersLoaded: false,
            loading: false, 
            error: null,
            teamOrLeague: "", // Make GET requests by individual team leaders or league leaders
            teamName: "",
            leagueName: "",
            sortBy: "",
            maxPlayers: 0,
            players: null,
            apiUrl: "http://kickr.herokuapp.com/api/leaderboard?teamOrLeague="
        }
        this.handleTeamLeaders = this.handleTeamLeaders.bind(this);
        this.handleLeagueLeaders = this.handleLeagueLeaders.bind(this);
        this.fetchPlayers = this.fetchPlayers.bind(this);
    }

    handleTeamLeaders =(e)=> {
        // Pass callback function so state update occurrs synchronously
        e.preventDefault();
        console.log("in handleTeamLeaders()");
        this.setState({
            teamOrLeague: "league",
            loading: true
        },
        () => this.fetchPlayers())
    }

    handleLeagueLeaders = (e) =>{
        // Pass callback function so state update occurrs synchronously
        e.preventDefault();
        console.log("in handleLeagueLeaders()");
        this.setState({
            teamOrLeague: "league",
            loading: true
        },
        () => this.fetchPlayers())  
    }

    handleChange = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
        console.log([e.target.name] +": " + e.target.value);
    }

    // Don't fetch players until user submits info
    fetchPlayers(){
        console.log("Leaderboard state:", this.state);
        var API_URL;
        if(this.state.teamOrLeague === "team"){
            // get players by team
            API_URL = 
                this.state.apiUrl + this.state.teamOrLeague 
                + "&leagueName="+ this.state.leagueName 
                + "&teamName=" + this.state.teamName 
                + "&numPlayerLimit=" + this.state.maxPlayers.toString() 
                + "&sortBy=" + this.state.sortBy;
        } else {
            // get players by league
            API_URL = 
                this.state.apiUrl + this.state.teamOrLeague 
                + "&leagueName=" + this.state.leagueName 
                + "&numPlayerLimit=" + this.state.maxPlayers.toString() 
                + "&sortBy=" + this.state.sortBy;
        }
        
        axios.get(API_URL)
        .then(res => {
            console.log("GET result:", res);
            if(res){
                this.setState({
                        playersLoaded: true,
                        loading: false,
                        //array of players in specified league
                        players: res.data.players 
                })
            }else{
                this.setState({
                    playersLoaded: false,
                    loading: false,
            })
            }
        })
        .catch((error) =>{
            console.log(error);
            console.log("in catch");
            //reset loading and playersLoaded because GET req was bad
            this.setState({
                playersLoaded: false,
                loading: false,
        })
        });
    }

    render(){

        return(
            <div>
                <KickrNavBar/>
                <h2>Leaderboard</h2>
                <input 
                    name="leagueName"
                    type="text"
                    placeholder="Enter league name"
                    value={this.state.leagueName}
                    onChange={this.handleChange.bind(this)} 
                />
                <select 
                    name="maxPlayers"
                    onChange={this.handleChange.bind(this)}>
                    <option value = "" disabled selected>Number of players to display</option>
                    <option value = "5" >5</option>
                    <option value = "15" >15</option>
                    <option value = "25" >25</option>
                    <option value = "50" >50</option>
                </select>
                <select 
                    name="sortBy"
                    onChange={this.handleChange.bind(this)}>
                    <option value = "" disabled selected>Sort players by</option>
                    <option value= "Goals">Goals</option>
                    <option value= "Assists">Assists</option>
                </select>
                <button 
                    onClick={this.handleTeamLeaders.bind(this)} 
                    disabled={(this.state.leagueName && this.state.maxPlayers && this.state.sortBy) ? false : true }
                    >   
                    View your team leaders
                </button>
                <button 
                    onClick={this.handleLeagueLeaders.bind(this)} 
                    disabled={(this.state.leagueName && this.state.maxPlayers && this.state.sortBy) ? false : true }
                    >
                    View your league leaders
                </button>
                {(this.state.loading) ? <LoadingTeams teamOrLeague={this.state.teamOrLeague}/> : ""}
                {(this.state.playersLoaded) ?  <Table players={this.state.players}/>: "" }
            </div>
        );
    }
}

export default Leaderboard;