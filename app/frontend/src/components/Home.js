import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        return(
            <section className="section">
             {this.props.auth ? this.props.auth.isProfessor ? 'You are a professor' : 'You are a student' : 'Data is loading'}
            </section>
        )
    }
}

function mapStateToProps({auth}){
    return { auth };
}

export default connect(mapStateToProps)(Home);