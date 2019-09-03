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
            disabled: false,
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.timer = this.timer.bind(this);
        this.reset = this.reset.bind(this);
        this.paused = this.paused.bind(this);
        this.url = "http://soundbible.com/grab.php?id=2158&type=wav";
        this.audio = new Audio(this.url);

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
                this.setState({
                    disabled: true,
                });
                if(!this.state.paused){

                    if(this.state.session===false){
                        console.log("Sada ide session.");
                        
                        this.setState({
                            time: ""+(this.state.time-this.state.base),
                            minutes: this.state.minutes > 0 ? Math.floor(((this.state.time-this.state.base)/(this.state.base))/60) : this.state.minutes,
                            seconds: this.state.seconds > 0 ? this.state.seconds-1 : 59,
                            session: (this.state.minutes===0 && this.state.seconds===1) ? true : false,
                            break: (this.state.minutes===0 && this.state.seconds===1) ? false : true,
                        });

                        if(this.state.time==="0"){
                            this.audio.play();
                        }

                    }
                    
                    if(this.state.break===false && this.state.session===true && this.state.time==="0"){
                        console.log("Kraj session-a. Sada ide resetovanje, pa break.");
                        this.setState({
                            time: ""+(this.state.breakLength*this.state.base*60),
                            minutes: this.state.breakLength,
                            seconds: 60,
                        });

                    }

                    if(this.state.break===false){
                        console.log("Sada ide break.");
                        this.setState({
                            time: ""+(this.state.time-this.state.base),
                            minutes: this.state.minutes > 0 ? Math.floor(((this.state.time-this.state.base)/(this.state.base))/60) : this.state.minutes,
                            seconds: this.state.seconds > 0 ? this.state.seconds-1 : 59,
                            session: (this.state.minutes===0 && this.state.seconds===1) ? false : true,
                            break: (this.state.minutes===0 && this.state.seconds===1) ? true : false,
                        });

                        if(this.state.time==="0"){
                            this.audio.play();
                        }

                    }

                    if(this.state.break===true && this.state.session===false && this.state.time==="0"){
                        console.log("Kraj break-a. Sada ide resetovanje, pa session.");
                        this.setState({
                            time: ""+(this.state.multiplier*this.state.base*60),
                            minutes: this.state.multiplier,
                            seconds: this.state.seconds === 60 ? "00" : this.state.seconds,
                        });

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
            paused: false,
            session: false,
            break: true,
            disabled: false,
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

        let minutes = (""+this.state.minutes).length===0 ? "0"+this.state.minutes : this.state.minutes;
        let seconds = this.state.seconds===60 ? "00" : ((""+this.state.seconds).length===1 ? "0"+this.state.seconds : this.state.seconds);
        let lastSesMin = (minutes===0) ? {color: 'red',} : {};

        const decrement = this.state.disabled ? ()=>{} : this.decrement;
        const increment = this.state.disabled ? ()=>{} : this.increment;
        const timer = this.state.disabled ? ()=>{} : this.timer;

        return(
            <div className="grid-container cent">
                <h1 className="item1">Pomodoro Clock</h1>

                <div className="item2">
                    <h3>Break Length</h3>

                    <div className="arrow">
                        <i className="fa fa-arrow-down fa-2x" id="break-decrement" onClick={decrement}></i>
                    </div>

                    <div className="nums">
                        {this.state.breakLength}
                    </div>

                    <div className="arrow">
                        <i className="fa fa-arrow-up fa-2x" id="break-increment" onClick={increment}></i>
                    </div> 

                </div>

                <div className="item3">
                    <h3>Session Length</h3>

                    <div className="arrow">
                        <i className="fa fa-arrow-down fa-2x" id="multiplier-decrement" onClick={decrement}></i>
                    </div>

                    <div className="nums">
                        {this.state.multiplier}
                    </div>

                    <div className="arrow">
                        <i className="fa fa-arrow-up fa-2x" id="multiplier-increment" onClick={increment}></i>
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
                        <i className="fa fa-play-circle arrow controls" title="start" onClick={timer}></i> 
                        <i className="fa fa-pause-circle arrow controls" title="pause" onClick={this.paused}></i>
                        <i className="fa fa-refresh fa arrow controls" title="reset" onClick={this.reset}></i>
                    </div>
                </div>
                
            </div>
        );

    }

}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'));