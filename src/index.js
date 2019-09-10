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
            sessionTime: 25*1000*60,//Var that holds session time for calculation.
            sessionLength: 25*1000*60,//Var that holds session time whose purpose is to be refenced value for previous when/if changed(if needed).
            breakTime: 5*1000*60,//Same as before previous one, but for break.
            breakLength: 5*1000*60,//Same as before previous one, but for break.
            switch: false,//Var that is used for switching between session and break. false->session, true->break.
            paused: true,//Var that is used to regulate pause. When it's true, pause is active, false pause gets disengaged.
            timestamp: [],//Timestamp for activities.
        };
        this.increment = this.increment.bind(this);//Function that increments stuff depending of element clicked. 
        this.decrement = this.decrement.bind(this);//Function that decrements stuff depending of element clicked. 
        this.timer = this.timer.bind(this);//Function that executes timing events.
        this.reset = this.reset.bind(this);//Resets pomodoro to initial values in state.
        this.paused = this.paused.bind(this);//Pauses/unpauses pomodoro.
        this.myRef = React.createRef();//A ref for alarm sound play.
        this.clearTimer = null;//A variable that holds setInterval event needed for execution of timer.

    }

    componentDidMount(){

        /*To be sure even if not needed, that stuff besides state, have been set to their initial values.
        In this case, sount should stop play and be rewound, interval cleared, 
        and variable that holds it, nullified.*/
        this.myRef.current.pause();
        this.myRef.current.currentTime = 0;
        clearInterval(this.clearTimer);
        this.clearTimer = null;
        
    }

    paused(callback){
        /*By default, pomodoro is paused. That even means even before activation, 
        state variable paused who is responsible for it is set to true. 
        So practically before activation===paused===true. This also apllies to sound ref and timer.
        Timestamp is timestamp of activity.*/
        this.myRef.current.pause();
        this.myRef.current.currentTime = 0;
        clearInterval(this.clearTimer);
        this.clearTimer = null;

        this.setState(prevState => ({
            paused: !prevState.paused,
            timestamp: [...this.state.timestamp, Date.now()],
        }), callback);
        
    }

    reset(){
        /*When it resest is hit, it resets state variables 
        and others mentioned to it's initial values.*/
        this.myRef.current.pause();
        this.myRef.current.currentTime = 0;
        clearInterval(this.clearTimer);
        this.clearTimer = null;

        this.setState({
            sessionTime: 25*1000*60,
            sessionLength: 25*1000*60,
            breakTime: 5*1000*60,
            breakLength: 5*1000*60,
            switch: false,
            paused: true,
            timestamp: [],
        });

    }

    timer(){
        /*Timer that regulates timing events and by defaults check first if it's paused,
        i.e. is state variable paused set to false. If it is, then it proceeds with timing events,
        if is not, then stops timing event and timestamps activity.*/
        this.paused(()=>{
            /*As i said before, inside a timer first is called paused() method which flicks
            state paused to opposite boolean.*/
            if(this.state.paused === false){
            /*By default paused is true and with first click paused becomes false, and as a callback of it, 
            timing events get executed.*/
                this.clearTimer = setInterval(() => {//Variable that holds timing event.
                    
                    if(this.state.sessionTime > 0 && this.state.switch===false){
                        /*Session time is active when var holds value above zero and switch is false.
                        It gets executed until value reaches zero i.e. from variable, due to timing set
                        to 1000ms, is subtracted 1000ms. When it reaches zero, it stops subtracting.*/
                        this.setState({
                            sessionTime: this.state.sessionTime > 0 ? this.state.sessionTime-1000 : this.state.sessionTime,
                            timestamp: [...this.state.timestamp, Date.now()]
                        });

                    }

                    if(this.state.sessionTime === 0 && this.state.switch===false){
                        /*When timer for session reaches zero, it should switch to break. 
                        Since because that zero(00:00) isn't shown, it has been added setTimeout event that delays
                        execution of setting state for one second(1000ms), so that 00:00 stays for exactly 
                        one second as other numbers/time.*/
                        setTimeout(()=>{ 

                            this.setState({
                                switch: true,
                                timestamp: [...this.state.timestamp, Date.now()]
                            }); 

                        }, 1000);
  
                    }

                    if(this.state.breakTime > 0 && this.state.switch===true){
                        /*It is same as from session, but this is for break.*/
                        this.setState({
                            breakTime: this.state.breakTime > 0 ? this.state.breakTime-1000 : this.state.breakTime,
                            timestamp: [...this.state.timestamp, Date.now()]
                        });

                    }

                    if(this.state.breakTime === 0 && this.state.switch===true){
                        /*Also setTimeout as previous, but this one is for break.*/
                        setTimeout(()=>{ 

                            this.setState({
                                switch: false,
                                sessionTime: this.state.sessionLength,
                                breakTime: this.state.breakLength,
                                timestamp: [...this.state.timestamp, Date.now()]
                            }); 

                        }, 1000);
                        
                    }
                    
                }, 1000);

            }
            else{
                //Redundancy for paused. Not sure if need, it stayed from previous code revision, now afrad to remove it :(
                this.myRef.current.pause();
                this.myRef.current.currentTime = 0;
                clearInterval(this.clearTimer);
                this.clearTimer = null;
    
            }

        });

    }

    increment(e){
        /*Increment function that as a parameter catches event, who is then used to identify 
        element by catching it's id. Depending of id, different logic is implement.*/
        let myId = e.target.id;

        if(myId==="break-increment" && this.state.paused===true && this.state.breakTime===this.state.breakLength){
            /*This condition is executed when there is no previous execution i.e. 
            for initial execution or when it's paused. Fo example: When initial execution, 
            breakTime that is used for calculation and it's breakLength that is used for reference 
            are both same value. That ain't the case when it's paused in the middle of timing event, 
            only at start. Max values is 60min..*/
            this.setState({
                breakTime: this.state.breakTime < (60*1000*60) ? this.state.breakTime+(60*1000) : this.state.breakTime,
                breakLength: this.state.breakLength < (60*1000*60) ? this.state.breakLength+(60*1000) : this.state.breakLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }
        else if(myId==="break-increment" && this.state.paused===true && this.state.breakTime!==this.state.breakLength){
            /*This condition is executed when it's paused and breakTime and breakLength 
            aren't the same values, i.e. when timer is already activated, then paused, then incremented.
            Then reference value is used who is incremented and set as new value.*/
            this.setState({
                breakTime: this.state.breakTime < (60*1000*60) ? this.state.breakLength+(60*1000) : this.state.breakTime,
                breakLength: this.state.breakLength < (60*1000*60) ? this.state.breakLength+(60*1000) : this.state.breakLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }
        
        if(myId==="session-increment" && this.state.paused===true && this.state.sessionTime===this.state.sessionLength){
            /*Same as break, but for session.*/
            this.setState({
                sessionTime: this.state.sessionTime < (60*1000*60) ? this.state.sessionTime+(60*1000) : this.state.sessionTime,
                sessionLength: this.state.sessionLength < (60*1000*60) ? this.state.sessionLength+(60*1000) : this.state.sessionLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }
        else if(myId==="session-increment" && this.state.paused===true && this.state.sessionTime!==this.state.sessionLength){
        /*Same as break, but for session.*/
            this.setState({
                sessionTime: this.state.sessionTime < (60*1000*60) ? this.state.sessionLength+(60*1000) : this.state.sessionTime,
                sessionLength: this.state.sessionLength < (60*1000*60) ? this.state.sessionLength+(60*1000) : this.state.sessionLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }

    }

    decrement(e){
        /*Decrement method, same as in previous method, applies here.*/
        let myId = e.target.id;

        if(myId==="break-decrement" && this.state.paused===true && this.state.breakTime===this.state.breakLength){
            
            this.setState({
                breakTime: this.state.breakTime > (60*1000) ? this.state.breakTime-(60*1000) : this.state.breakTime,
                breakLength: this.state.breakLength > (60*1000) ? this.state.breakLength-(60*1000) : this.state.breakLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }
        else if(myId==="break-decrement" && this.state.paused===true && this.state.breakTime!==this.state.breakLength){

            this.setState({
                breakTime: this.state.breakTime > (60*1000) ? this.state.breakLength-(60*1000) : this.state.breakTime,
                breakLength: this.state.breakLength > (60*1000) ? this.state.breakLength-(60*1000) : this.state.breakLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }

        if(myId==="session-decrement" && this.state.paused===true && this.state.sessionTime===this.state.sessionLength){
            
            this.setState({
                sessionTime: this.state.sessionTime > (60*1000) ? this.state.sessionTime-(60*1000) : this.state.sessionTime,
                sessionLength: this.state.sessionLength > (60*1000) ? this.state.sessionLength-(60*1000) : this.state.sessionLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }
        else if(myId==="session-decrement" && this.state.paused===true && this.state.sessionTime!==this.state.sessionLength){
            
            this.setState({
                sessionTime: this.state.sessionTime > (60*1000) ? this.state.sessionLength-(60*1000) : this.state.sessionTime,
                sessionLength: this.state.sessionLength > (60*1000) ? this.state.sessionLength-(60*1000) : this.state.sessionLength,
                timestamp: [...this.state.timestamp, Date.now()]
            });

        }

    }

    render(){
        console.log(this.state);
        
        const  sessionLength = this.state.sessionLength/(60*1000);//It displays sessionLength calculated in mins.
        const sessionTime = this.state.sessionTime;//Assigment
        const  breakLength = this.state.breakLength/(60*1000);//Same as sessionLength, but for breakLength.
        const breakTime = this.state.breakTime;//Assigment

        /*Toggles between time displayed, if it's false, session goes, if it's true, break ensues.*/
        const timer = (this.state.switch===false) ? sessionTime : breakTime;

        let minutes = Math.floor(timer/1000/60);//Calculates elapsed time but only takes mins.
        minutes = (""+minutes).length===1 ? "0"+minutes : minutes;//Addition cls for mins, checks if mins are one digit by turning it into string that now beasues length, if length is 1(single digit), if it is, then adds zero in front of it.

        let seconds = (timer/1000)%60;//Same as mins, but for seconds.
        seconds = (""+seconds).length===1 ? "0"+seconds : seconds;//Same as mins, but for seconds.

        let time = minutes+":"+seconds;//Ties both mins and seconds values suitable for display with : like on digital clocks.

        if(time==="00:00"){//When time var have said value sound gets played.
    
            this.myRef.current.play();
            
        }

        console.log(time);

        /*Checks if timer is below 60sec(60000ms), if it is, var that holds label
        and var that holds timer red, otherwise is blue. I added blue because my poor eyesight.*/
        const lastSesMin = (timer<(60*1000)) ? {color: 'red',} : {color: 'blue',};

        /*Increment and decrement should be executed when timer is active. Only when it's paused
        or before activation. If it's active, an empty anonymous function is being called that 
        executes and returns nothing.*/
        const decrement = this.clearTimer ? ()=>{} : this.decrement;
        const increment = this.clearTimer ? ()=>{} : this.increment;

        /*Depending if switch is false/true, string value is added. That values is used in a label
        that indicates if active timer is from session or from break.*/
        const countdownLabel = (this.state.switch===false) ? "Session" : "Break";

        //Begin: JSX elements with their props.
        const item2Head = <h3 id="break-label">Break Length</h3>;
        const fa1 = <Fa klasa={"fa fa-arrow-down fa-2x"} id={"break-decrement"} onClick={decrement}/>;
        const fa2 = <Fa klasa={"fa fa-arrow-up fa-2x"} id={"break-increment"} onClick={increment}/>;
        const arr1 = [<Arrow klasa={"arrow"} key={0} arrow={item2Head}/>, <br key={1}/>, <Arrow klasa={"arrow"} key={2} arrow={fa1}/>, <Arrow id={"break-length"} klasa={"nums"} key={3} arrow={breakLength}/> , <Arrow key={4} klasa={"arrow"} arrow={fa2}/>];
        
        const item3Head = <h3 id="session-label">Session Length</h3>;
        const fa3 = <Fa klasa={"fa fa-arrow-down fa-2x"} id={"session-decrement"} onClick={decrement}/>;
        const fa4 = <Fa klasa={"fa fa-arrow-up fa-2x"} id={"session-increment"} onClick={increment}/>;
        const arr2 = [<Arrow klasa={"arrow"} key={0} arrow={item3Head}/>, <br key={1}/>, <Arrow klasa={"arrow"} key={2} arrow={fa3}/>, <Arrow klasa={"nums"} id={"session-length"} key={3} arrow={sessionLength}/> , <Arrow key={4} klasa={"arrow"} arrow={fa4}/>];

        const item4Head = <h3 key={0} id={"timer-label"} style={lastSesMin}>{countdownLabel}</h3>;
        const nums2 = <div key={1} className="nums" style={lastSesMin} id={"time-left"}>{time}</div>;
        const arr3 = [item4Head, nums2];

        const fa5 = <Fa key={0} klasa={"fa fa-play arrow controls"} title={"start-pause"}/>;
        const fa6 = <Fa key={1} klasa={"fa fa-pause arrow controls"} title={"start-pause"}/>;
        const fa7 = <Fa key={2} klasa={"fa fa-refresh arrow controls"} id="reset" title={"reset"} onClick={this.reset}/>;
        const startPause = <div id="start_stop" key={4} onClick={this.timer}>{fa5}{fa6}</div>;
        const arr4 = [startPause, fa7];
        //End: JSX elements with their props.
        
        return(
            <div className="grid-container cent">
                
                <Item klasa={"item1"} arrowsAndNums={"Pomodoro Clock"}/>
                
                <Item klasa={"item2"} arrowsAndNums={arr1}/>

                <Item klasa={"item3"} arrowsAndNums={arr2}/>

                <Item klasa={"item4"} arrowsAndNums={arr3}/>

                <Item klasa={"item4"} arrowsAndNums={arr4}/>
                <audio preload="auto" ref={this.myRef} id="beep" src="http://soundbible.com/grab.php?id=2158&type=wav"></audio>
            </div>
        );

    }

}

ReactDOM.render(<Pomodoro/>, document.getElementById('root'));