import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import Item from "./item.js";
import Arrow from "./arrow.js";
import Fa from "./fa.js";

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
        this.myRef = React.createRef();
        this.clearTimer = null;
    }

    componentDidMount(){
        
        this.setState({
            time: ""+(this.state.multiplier*this.state.base*60),
            minutes: this.state.multiplier,
            seconds: this.state.seconds === 60 ? "00" : this.state.seconds ,
        });
        
    }

    paused(){

        /*this.setState(prevState => ({
            paused: !prevState.paused
        }));*/
        
        this.setState({
            paused: !this.state.paused
        });
        
    }

    timer(){
        
        this.paused();

        if(this.state.paused === false){

            if(this.state.minutes!==0 && this.state.seconds!==0){

                this.clearTimer = setInterval(() => {

                    if(this.state.session===false){
                        console.log("Sada ide session.");
                        
                        this.setState({
                            time: ""+(this.state.time-this.state.base),
                            minutes: this.state.minutes > 0 ? Math.floor(((this.state.time-this.state.base)/(this.state.base))/60) : this.state.minutes,
                            seconds: this.state.seconds > 0 ? this.state.seconds-1 : 59,
                            session: (this.state.minutes===0 && this.state.seconds===1) ? true : false,
                            break: (this.state.minutes===0 && this.state.seconds===1) ? false : true,
                        });

                        if(this.state.minutes===0 && this.state.seconds===0){
                            this.myRef.current.play();
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

                        if(this.state.minutes===0 && this.state.seconds===0){
                            this.myRef.current.play();
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

                }, this.state.base);

            }

        }
        else{
            
            clearInterval(this.clearTimer);

        }

    }

    reset(){
        this.myRef.current.pause();
        this.myRef.current.currentTime = 0;
        clearInterval(this.clearTimer);
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
                breakLength: this.state.breakLength <60 ? this.state.breakLength+1 : this.state.breakLength,
            });

        }
        else if(myId==="session-increment"){

            this.setState({
                multiplier: this.state.multiplier < 60 ? this.state.multiplier+1 : this.state.multiplier,
                time: this.state.time !== "60" ? ""+((this.state.multiplier+1)*this.state.base*60) : this.state.time,
                minutes: this.state.minutes < 60 ? this.state.multiplier+1 : this.state.minutes,
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
        else if(myId==="session-decrement" && this.state.multiplier > 1 && this.state.time > 1 && this.state.minutes > 1){
            
            this.setState({
                multiplier: this.state.multiplier > 1 ? this.state.multiplier-1 : this.state.multiplier,
                time: this.state.time > 1 ? (""+((this.state.multiplier-1)*this.state.base*60)) : this.state.time,
                minutes: this.state.minutes > 1 ? this.state.multiplier-1: this.state.minutes,
            });

        }

    }

    render(){
        console.log(this.state);
        console.log(this.state.paused);

        let minutes = (""+this.state.minutes).length===1 ? "0"+this.state.minutes : this.state.minutes;
        let seconds = this.state.seconds===60 ? "00" : ((""+this.state.seconds).length===1 ? "0"+this.state.seconds : this.state.seconds);
        let lastSesMin = (minutes==="00") ? {color: 'red',} : {};

        const decrement = this.state.disabled ? ()=>{} : this.decrement;
        const increment = this.state.disabled ? ()=>{} : this.increment;

        const item2Head = <h3 id="break-label">Break Length</h3>;
        const fa1 = <Fa klasa={"fa fa-arrow-down fa-2x"} id={"break-decrement"} onClick={decrement}/>;
        const fa2 = <Fa klasa={"fa fa-arrow-up fa-2x"} id={"break-increment"} onClick={increment}/>;
        const arr1 = [<Arrow klasa={"arrow"} key={0} arrow={item2Head}/>, <br key={1}/>, <Arrow klasa={"arrow"} key={2} arrow={fa1}/>, <Arrow id={"break-length"} klasa={"nums"} key={3} arrow={this.state.breakLength}/> , <Arrow key={4} klasa={"arrow"} arrow={fa2}/>];
        
        const item3Head = <h3 id="session-label">Session Length</h3>;
        const fa3 = <Fa klasa={"fa fa-arrow-down fa-2x"} id={"session-decrement"} onClick={decrement}/>;
        const fa4 = <Fa klasa={"fa fa-arrow-up fa-2x"} id={"session-increment"} onClick={increment}/>;
        const arr2 = [<Arrow klasa={"arrow"} key={0} arrow={item3Head}/>, <br key={1}/>, <Arrow klasa={"arrow"} key={2} arrow={fa3}/>, <Arrow klasa={"nums"} id={"session-length"} key={3} arrow={this.state.multiplier}/> , <Arrow key={4} klasa={"arrow"} arrow={fa4}/>];
        
        const countdownLabel = (this.state.session===false &&  this.state.break===true) ? "Session" : "Break";
        const item4Head = <h3 key={0} id={"timer-label"}>{countdownLabel}</h3>;
        const nums2 = <div key={1} className="nums" style={lastSesMin} id={"time-left"}><label id="minutes">{minutes}</label>:<label id="seconds">{seconds}</label></div>;
        const arr3 = [item4Head, nums2];

        const fa5 = <Fa key={0} klasa={"fa fa-play arrow controls"} title={"start-pause"}/>;
        const fa6 = <Fa key={1} klasa={"fa fa-pause arrow controls"} title={"start-pause"}/>;
        const fa7 = <Fa key={2} klasa={"fa fa-refresh arrow controls"} id="reset" title={"reset"} onClick={this.reset}/>;
        const startPause = <div id="start_stop" key={4} onClick={this.timer}>{fa5}{fa6}</div>;
        const arr4 = [startPause, fa7];

        return(
            <div className="grid-container cent">
                
                <Item klasa={"item1"} arrowsAndNums={"Pomodoro Clock"}/>
                
                <Item klasa={"item2"} arrowsAndNums={arr1}/>

                <Item klasa={"item3"} arrowsAndNums={arr2}/>

                <Item klasa={"item4"} arrowsAndNums={arr3}/>

                <Item klasa={"item4"} arrowsAndNums={arr4}/>
                <audio ref={this.myRef} id="beep" src="http://soundbible.com/grab.php?id=2158&type=wav"></audio>
            </div>
        );

    }

}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'));