import React, { Component } from "react";
import { connect } from "react-redux";
import profileImg from "../assets/profile.png";
import Popup from "reactjs-popup";
import ResumeForm from './ResumeForm';
import * as actions from '../actions';

class Profile extends Component {
  editProfile() {
    return <p>Hello</p>;
  }

  uploadResume(resume) {
    this.props.uploadResume(resume);
  }

  render() {
    return (
      <div className="hero is-light">
        <section className="container" style={{ width: 768 }}>
          <h1 align="center">
            <br />
            <img className="is-rounded" src={this.props.auth.profile_pic ? this.props.auth.profile_pic : profileImg} alt={this.props.auth.name} width={200} />
            <br />
            <br />
          </h1>

          <div className="column" align="center">
            <div className="box" style={{ background: "#2EEF8F" }}>
              {this.props.auth.name}
            </div>

            <div className="box" style={{ background: "#2EEF8F" }}>
              {this.props.auth.email}
            </div>
          </div>

          <div className="column" align="center">
            <div className="box" style={{ background: "#17864F" }}>
              {this.props.auth.major}
            </div>
          </div>

          <div className="column" align="left">
            <div className="box">
              Bio:{" "}
              {this.props.auth.bio ? (
                <p>{this.props.auth.bio}</p>
              ) : (
                <p>No Available Bio</p>
              )}
            </div>
          </div>

          <div className="column">
            <div className="box">
              <p>Upload Resume:</p>
              <ResumeForm onSubmit={data => this.uploadResume(data.file)} />
              <br />
              <br />
              <p>Current Resume:</p>
              <p>{this.props.auth.resume}</p>
            </div>
          </div>

          <div className="column">
            {/* <Popup
              trigger={
                <p className="button" align="center">
                  Edit Profile
                </p>
              }
              modal="true"
              lockScroll="false"
            >
              <div>
                <p>Edit Profile:</p>
                <p>Name:</p>
                <input />
                <p>Email:</p>
                <input />
                <p>Major:</p>
                <input />
              </div>
            </Popup> */}
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ profile, auth }) {
  return { profile, auth };
}

export default connect(mapStateToProps, actions)(Profile);
