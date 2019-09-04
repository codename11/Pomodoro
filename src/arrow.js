import React from 'react';

class Arrow extends React.Component{

    render(){ 
		return (
			<div  className={this.props.klasa} style={this.props.style}>{this.props.arrow}</div>
		);  
	}
}

export default Arrow;