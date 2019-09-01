import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';

class Pomodoro  extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            breakLength: 5,
            multiplier: 25,
            base: 1000,
            time: 0,
            minutes: 25,
            seconds: 60,
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.timer = this.timer.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount(){
        
        this.setState({
            time: ""+(this.state.multiplier*this.state.base*60),
            minutes: this.state.multiplier,
            seconds: this.state.seconds === 60 ? "00" : this.state.seconds ,
        });
        
    }

    timer(){
        
        setInterval(() => {

            this.setState({
                time: ""+(this.state.time-this.state.base),
                minutes: Math.floor(((this.state.time-this.state.base)/(this.state.base))/60),
                seconds: this.state.seconds > 0 ? this.state.seconds-1 : 59,
            });

        }, this.state.base);

    }

    reset(){
        clearInterval(this.timer);
        this.setState({
            breakLength: 5,
            multiplier: 25,
            base: 1000,
            time: ""+(this.state.multiplier*this.state.base*60),
            minutes: 25,
            seconds: 60,
        });
    }

    increment(e){
        console.log(e.target.id);
        let myId = e.target.id;

        if(myId==="break-increment"){

            this.setState({
                breakLength: this.state.breakLength+1,
            });

        }
        else if(myId==="multiplier-increment"){

            this.setState({
                multiplier: this.state.multiplier+1,
                time: ""+((this.state.multiplier+1)*this.state.base*60),
                minutes: this.state.multiplier+1,
            });

        }

        

    }

    decrement(e){
        
        console.log(e.target.id);
        let myId = e.target.id;

        if(myId==="break-decrement"){

            this.setState({
                breakLength: this.state.breakLength > 0 ? this.state.breakLength-1 : this.state.breakLength,
            });

        }
        else if(myId==="multiplier-decrement"){

            this.setState({
                multiplier: this.state.multiplier > 0 ? this.state.multiplier-1 : this.state.multiplier,
            });

        }

    }

    render(){
        console.log(this.state);
        let minutes = (""+this.state.minutes).length===0 ? "0"+this.state.minutes : this.state.minutes;
        let seconds = this.state.seconds===60 ? "00" : ((""+this.state.seconds).length===1 ? "0"+this.state.seconds : this.state.seconds);
        
        //console.log(this.state.minutes);
        return(
            <div className="grid-container cent">
                <h1 className="item1">Pomodoro Clock</h1>

                <div className="item2">
                    <h3>Break Length</h3>

                    <div className="arrow">
                        <i className="fa fa-arrow-down fa-2x" id="break-decrement" onClick={this.decrement}></i>
                    </div>

                    <div className="nums">
                        {this.state.breakLength}
                    </div>

                    <div className="arrow">
                        <i className="fa fa-arrow-up fa-2x" id="break-increment" onClick={this.increment}></i>
                    </div> 

                </div>

                <div className="item3">
                    <h3>Session Length</h3>

                    <div className="arrow">
                        <i className="fa fa-arrow-down fa-2x" id="multiplier-decrement" onClick={this.decrement}></i>
                    </div>

                    <div className="nums">
                        {this.state.multiplier}
                    </div>

                    <div className="arrow">
                        <i className="fa fa-arrow-up fa-2x" id="multiplier-increment" onClick={this.increment}></i>
                    </div> 

                </div>

                <div className="item4">
                    <h3>Session</h3>
                    <div className="nums">
                        <label id="minutes">{minutes}</label>:<label id="seconds">{seconds}</label>
                    </div>
                </div>

                <div className="item4">
                    <div>
                        <i className="fa fa-play-circle arrow controls" title="start" onClick={this.timer}></i> 
                        <i className="fa fa-pause-circle arrow controls" title="pause"></i>
                        <i className="fa fa-refresh fa arrow controls" title="reset" onClick={this.reset}></i>
                    </div>
                </div>

            </div>
        );

    }

}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'));