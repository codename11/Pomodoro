import React from 'react';

class Item extends React.Component{

    render(){ 
		return (
			<div  className={this.props.klasa}>{this.props.arrowsAndNums}</div>
		);  
	}
}

export default Item;