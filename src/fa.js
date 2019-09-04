import React from 'react';

class Fa extends React.Component{

    render(){ 
		return (
			<i  className={this.props.klasa} id={this.props.id} onClick={this.props.onClick} title={this.props.title}></i>
		);  
	}
}

export default Fa;