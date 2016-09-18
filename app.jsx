var PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Holligan",
    score: 42,
    id: 3,
  },
];
  
var next_key = 4;
  
  
function Statistics(props){
  var numberOfPlayers = props.players.length;
  var points = props.players.reduce(function(total,player){
      return total + player.score;
  
  },0);
  
  return (
    <table>
      <tbody>
        <tr>
            <td>Players: </td>
            <td>{numberOfPlayers}</td>
        </tr>
        <tr>
            <td>Total Score: </td>
            <td>{points}</td>
        </tr>
      </tbody>
    </table>
  );
}  

Statistics.propTypes = {
  players:React.PropTypes.array.isRequired
  }

function Header(props) {
  return (
    <div className="header">
      <Statistics players={props.players}/>
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired
};

  
function Counter(props){
  return (
    <div className="counter">
            <button className="counter-action decrement" onClick={function(){props.onChange(-1)}}> - </button>
            <div className="counter-score"> {props.score} </div>
            <button className="counter-action increment" onClick={function(){props.onChange(+1)}}> + </button>
          </div>  
  );  
}
  
Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
  };  
  
  
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange={props.onScoreChange} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove:React.PropTypes.func.isRequired
};
  
var AddPlayerForm = React.createClass(
  { 
    propTypes:{
      onAdd: React.PropTypes.func.isRequired
    },
    onSubmit:function(e){
      e.preventDefault();  
      this.props.onAdd(this.state.name);
      this.setState({name:''});
    },
    onNameChange:function(e){
      this.setState({name:e.target.value});
    },
    getInitialState:function(){
      return {
        name:''
      }
    },
    render: function(){
      return (
        <div className="add-player-form">
            <form onSubmit={this.onSubmit} >
                <input type="text" value={this.state.name} onChange={this.onNameChange} />
                <input type="submit" value="Add" />
            </form>
      
        </div>
  
      );
  
    }
  
  
  });
  
  
  
  
var Application = React.createClass({
  
  onAddPlayer:function(name){
    this.state.players.push({
      name:name,
      score:0,
      id:next_key
    });
    this.setState(this.state);
    next_key+=1;
  },
  
  onRemovePlayer:function(index){
    this.state.players.splice(index,1);
    this.setState(this.state);
  },
  
  getInitialState: function(){
    return {
      players:this.props.initialPlayers  
  
    }
  },
  onScoreChange:function(index,delta){
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  propTypes: {
        title: React.PropTypes.string,
        initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          score: React.PropTypes.number.isRequired,
          id: React.PropTypes.number.isRequired,
        })).isRequired
    },
      getDefaultProps: function(){
        return {
          title:'Scoreboard'
        }
      }
    ,
  render:function(){
      
      return (
        <div className="scoreboard">
        <Header title={this.props.title} players = {this.state.players}/>
      
        <div className="players">
          {this.state.players.map(function(player,index) {
            return <Player onRemove = {function(index){this.onRemovePlayer(index)}.bind(this)}  onScoreChange={function(delta){ this.onScoreChange(index,delta) }.bind(this)}
            name={player.name} score={player.score} key={player.id} />
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onAddPlayer}/>          
      </div>
      
                 
    )
  }
  
  });  


ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));