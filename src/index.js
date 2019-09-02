import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';

let clearTimer;

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
            paused: false,
            session: false,
            break: true,
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.timer = this.timer.bind(this);
        this.reset = this.reset.bind(this);
        this.paused = this.paused.bind(this);
        this.myRef = React.createRef();
    }

    componentDidMount(){
        
        this.setState({
            time: ""+(this.state.multiplier*this.state.base*60),
            minutes: this.state.multiplier,
            seconds: this.state.seconds === 60 ? "00" : this.state.seconds ,
        });
        
    }

    paused(){
        this.setState({
            paused: !this.state.paused,
        });
    }

    timer(){

        if(this.state.minutes!==0 && this.state.seconds!==0){
            
            clearTimer = setInterval(() => {

                if(!this.state.paused){

                    this.setState({
                        time: ""+(this.state.time-this.state.base),
                        minutes: this.state.minutes > 0 ? Math.floor(((this.state.time-this.state.base)/(this.state.base))/60) : this.state.minutes,
                        seconds: this.state.seconds > 0 ? this.state.seconds-1 : 59,
                        session: (this.state.minutes===0 && this.state.seconds===1) ? true : false,
                        break: (this.state.minutes===0 && this.state.seconds===1) ? false : true,
                    });
                    console.log(typeof this.state.time);
                    if(this.state.time==="0"){
                        this.myRef.current.play();
                    }
                    
                }

            }, this.state.base);

        }
    }

    reset(){
        clearInterval(clearTimer);
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

        if(myId==="break-decrement" && this.state.breakLength > 1){

            this.setState({
                breakLength: this.state.breakLength > 1 ? this.state.breakLength-1 : this.state.breakLength,
            });

        }
        else if(myId==="multiplier-decrement" && this.state.multiplier > 1 && this.state.time > 1 && this.state.minutes > 1){

            this.setState({
                multiplier: this.state.multiplier > 1 ? this.state.multiplier-1 : this.state.multiplier,
                time: this.state.time > 1 ? (""+((this.state.multiplier-1)*this.state.base*60)) : this.state.time,
                minutes: this.state.minutes > 1 ? this.state.multiplier-1: this.state.minutes,
            });

        }

    }

    render(){
        console.log(this.state);

        if(this.state.minutes===0 && this.state.seconds===0){
            clearInterval(clearTimer);
        }

        let minutes = (""+this.state.minutes).length===0 ? "0"+this.state.minutes : this.state.minutes;
        let seconds = this.state.seconds===60 ? "00" : ((""+this.state.seconds).length===1 ? "0"+this.state.seconds : this.state.seconds);
        let lastSesMin = (minutes===0) ? {color: 'red',} : {};

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
                    <div className="nums" style={lastSesMin}>
                        <label id="minutes">{minutes}</label>:<label id="seconds">{seconds}</label>
                    </div>
                </div>

                <div className="item4">
                    <div>
                        <i className="fa fa-play-circle arrow controls" title="start" onClick={this.timer}></i> 
                        <i className="fa fa-pause-circle arrow controls" title="pause" onClick={this.paused}></i>
                        <i className="fa fa-refresh fa arrow controls" title="reset" onClick={this.reset}></i>
                    </div>
                </div>
                <audio ref={this.myRef} id="beep" preload="auto" src="https://goo.gl/65cBl1"></audio>
            </div>
        );

    }

}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'));