(window.webpackJsonppomodoro=window.webpackJsonppomodoro||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var s,i=a(3),n=a(4),r=a(7),l=a(5),c=a(1),m=a(8),o=a(0),d=a.n(o),h=a(6),u=a.n(h),b=(a(15),a(16),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(r.a)(this,Object(l.a)(t).call(this,e))).state={breakLength:5,multiplier:25,base:1e3,time:0,minutes:25,seconds:60},a.increment=a.increment.bind(Object(c.a)(a)),a.decrement=a.decrement.bind(Object(c.a)(a)),a.timer=a.timer.bind(Object(c.a)(a)),a.reset=a.reset.bind(Object(c.a)(a)),a}return Object(m.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){this.setState({time:""+this.state.multiplier*this.state.base*60,minutes:this.state.multiplier,seconds:60===this.state.seconds?"00":this.state.seconds})}},{key:"timer",value:function(){var e=this;s=setInterval(function(){e.setState({time:""+(e.state.time-e.state.base),minutes:Math.floor((e.state.time-e.state.base)/e.state.base/60),seconds:e.state.seconds>0?e.state.seconds-1:59})},this.state.base)}},{key:"reset",value:function(){clearInterval(s),this.setState({breakLength:5,multiplier:25,base:1e3,time:""+this.state.multiplier*this.state.base*60,minutes:25,seconds:60})}},{key:"increment",value:function(e){console.log(e.target.id);var t=e.target.id;"break-increment"===t?this.setState({breakLength:this.state.breakLength+1}):"multiplier-increment"===t&&this.setState({multiplier:this.state.multiplier+1})}},{key:"decrement",value:function(e){console.log(e.target.id);var t=e.target.id;"break-decrement"===t?this.setState({breakLength:this.state.breakLength>0?this.state.breakLength-1:this.state.breakLength}):"multiplier-decrement"===t&&this.setState({multiplier:this.state.multiplier>0?this.state.multiplier-1:this.state.multiplier})}},{key:"render",value:function(){console.log(this.state);var e=0===(""+this.state.minutes).length?"0"+this.state.minutes:this.state.minutes,t=60===this.state.seconds?"00":1===(""+this.state.seconds).length?"0"+this.state.seconds:this.state.seconds;return d.a.createElement("div",{className:"grid-container cent"},d.a.createElement("h1",{className:"item1"},"Pomodoro Clock"),d.a.createElement("div",{className:"item2"},d.a.createElement("h3",null,"Break Length"),d.a.createElement("div",{className:"arrow"},d.a.createElement("i",{className:"fa fa-arrow-down fa-2x",id:"break-decrement",onClick:this.decrement})),d.a.createElement("div",{className:"nums"},this.state.breakLength),d.a.createElement("div",{className:"arrow"},d.a.createElement("i",{className:"fa fa-arrow-up fa-2x",id:"break-increment",onClick:this.increment}))),d.a.createElement("div",{className:"item3"},d.a.createElement("h3",null,"Session Length"),d.a.createElement("div",{className:"arrow"},d.a.createElement("i",{className:"fa fa-arrow-down fa-2x",id:"multiplier-decrement",onClick:this.decrement})),d.a.createElement("div",{className:"nums"},this.state.multiplier),d.a.createElement("div",{className:"arrow"},d.a.createElement("i",{className:"fa fa-arrow-up fa-2x",id:"multiplier-increment",onClick:this.increment}))),d.a.createElement("div",{className:"item4"},d.a.createElement("h3",null,"Session"),d.a.createElement("div",{className:"nums"},d.a.createElement("label",{id:"minutes"},e),":",d.a.createElement("label",{id:"seconds"},t))),d.a.createElement("div",{className:"item4"},d.a.createElement("div",null,d.a.createElement("i",{className:"fa fa-play-circle arrow controls",title:"start",onClick:this.timer}),d.a.createElement("i",{className:"fa fa-pause-circle arrow controls",title:"pause"}),d.a.createElement("i",{className:"fa fa-refresh fa arrow controls",title:"reset",onClick:this.reset}))))}}]),t}(d.a.Component));u.a.render(d.a.createElement(b,null),document.getElementById("root"))},16:function(e,t,a){},9:function(e,t,a){e.exports=a(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.6a9a34bd.chunk.js.map