import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import Item from "./item.js";
import Arrow from "./arrow.js";
import Fa from "./fa.js";

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

        const item2Head = <h3>Break Length</h3>;
        const fa1 = <Fa klasa={"fa fa-arrow-down fa-2x"} id={"break-decrement"} onClick={decrement}/>;
        const fa2 = <Fa klasa={"fa fa-arrow-up fa-2x"} id={"break-increment"} onClick={increment}/>;
        const arr1 = [<Arrow klasa={"arrow"} key={0} arrow={item2Head}/>, <Arrow klasa={"arrow"} key={1} arrow={fa1}/>, <Arrow klasa={"nums"} key={2} arrow={this.state.breakLength}/> , <Arrow key={3} klasa={"arrow"} arrow={fa2}/>];
        
        const item3Head = <h3>Session Length</h3>;
        const fa3 = <Fa klasa={"fa fa-arrow-down fa-2x"} id={"multiplier-decrement"} onClick={decrement}/>;
        const fa4 = <Fa klasa={"fa fa-arrow-up fa-2x"} id={"multiplier-increment"} onClick={increment}/>;
        const arr2 = [<Arrow klasa={"arrow"} key={0} arrow={item3Head}/>, <Arrow klasa={"arrow"} key={1} arrow={fa3}/>, <Arrow klasa={"nums"} key={2} arrow={this.state.multiplier}/> , <Arrow key={3} klasa={"arrow"} arrow={fa4}/>];
        
        const item4Head = <h3 key={0}>Session</h3>;
        const nums2 = <div key={1} className="nums" style={lastSesMin}><label id="minutes">{minutes}</label>:<label id="seconds">{seconds}</label></div>;
        const arr3 = [item4Head, nums2];

        const fa5 = <Fa key={0} klasa={"fa fa-play-circle arrow controls"} title={"start"} onClick={timer}/>;
        const fa6 = <Fa key={1} klasa={"fa fa-pause-circle arrow controls"} title={"pause"} onClick={this.paused}/>;
        const fa7 = <Fa key={2} klasa={"fa fa-play-circle arrow controls"} title={"reset"} onClick={this.reset}/>;
        const arr4 = [fa5, fa6, fa7];

        return(
            <div className="grid-container cent">
                
                <Item klasa={"item1"} arrowsAndNums={"Pomodoro Clock"}/>
                
                <Item klasa={"item2"} arrowsAndNums={arr1}/>

                <Item klasa={"item3"} arrowsAndNums={arr2}/>

                <Item klasa={"item4"} arrowsAndNums={arr3}/>

                <Item klasa={"item4"} arrowsAndNums={arr4}/>
                
            </div>
        );

    }

}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'));