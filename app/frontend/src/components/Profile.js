import React, { Component } from "react";
import { connect } from "react-redux";
import profileImg from "../assets/profile.png";
import * as actions from "../actions";
import ResumeForm from "./ResumeForm";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PostCard from './PostCard';
import Spinner from './Spinner';

class Profile extends Component {
  constructor(props) {
    super(props);

    if (this.props.match.params.cruzid === this.props.auth.cruzid) {
      this.state = {
        cruzid: this.props.match.params.cruzid,
        profileLoaded: true,
        profile: this.props.auth
      };
    } else {
      this.state = {
        cruzid: this.props.match.params.cruzid,
        profileLoaded: false,
        profile: null,
        following: false,
        isFollowDisabled: false
      };
    }

    axios
      .get("/api/students/", {
        params: {
          cruzid: this.props.match.params.cruzid
        }
      })
      .then(response => this.setState({ major: response.data.major }))
      .catch(error => console.log(error));

    if (props.match.params.cruzid !== props.auth.cruzid) {
      axios
        .get("/api/users/", {
          params: {
            cruzid: this.props.match.params.cruzid
          }
        })
        .then(response =>
          this.setState({
            profileLoaded: true,
            profile: response.data,
            isFollowDisabled: false,
            following:
              this.props.auth.following &&
              this.props.auth.following.includes(this.props.match.params.cruzid)
          })
        )
        .catch(error => console.log(error));
    }

    var request = this.props.auth.isProfessor ?
    "/api/search?type=cruzid&query=" + this.props.auth.cruzid
    : "/api/search?type=Applicants&query=" + this.props.auth._id;

    axios.get(request)
    .then(response => {
      this.setState({ posts: response.data });
    })
    .catch(err => {
      console.log(err);
    });
  }

  uploadResume(resume) {
    this.props.uploadResume(resume);
  } 

  toggleFollow = _ => {
    const following = this.state.following;
    this.setState({ isFollowDisabled: false });
    this.setState({ following: !this.state.following });

    axios
      .post("/api/follow", {
        cruzid: this.props.match.params.cruzid,
        following: following
      })
      .then(_ => this.setState({ isFollowDisabled: false }))
      .catch(error => {
        console.log(error);
        this.setState({ following: following });
      });
  };

  formatPost() {
    var posts = this.state.posts;
    return (
    <div className="flex item inner content">
        {posts.map(post => (<PostCard key={post._id} post={{
            id: post._id,
            type: post.department.type,
            name: post.title,
            professor: post.owner.name,
            tags: post.tags,
            summary: post.summary,
            department: post.department.name,
            ownerProfile: "/profile/" + post.owner.cruzid,
            applicants: this.props.auth.isProfessor ? post.applicants.map(applicant => applicant.student ? applicant.student.cruzid : "") : null
        }} />))}
    </div>)
  }

  render() {
    const myProfile = this.state.cruzid === this.props.auth.cruzid;

    if (!this.state.posts) {
      return <Spinner fullPage />;
    }

    return (
      <section className="section">
        <div className="container has-text-centered">
          <Tabs>
            <TabList>
              <Tab>Profile</Tab>
              {this.props.auth.cruzid === this.state.profile.cruzid && 
                <Tab>Research</Tab>}
            </TabList>

            <TabPanel>
              <div>
              {this.state.profileLoaded && this.state.profile && (
                <div className="hero is-light">
                  <section className="container" style={{ width: 768 }}>
                    <h1 align="center">
                      <br />
                      <div align="center">
                        <figure className="image is-128x128">
                          <img
                            className="is-rounded"
                            src={
                              this.state.profile.profile_pic
                                ? this.state.profile.profile_pic
                                : profileImg
                            }
                            alt={this.state.profile.name}
                            width={200}
                          />
                        </figure>
                      </div>
                    </h1>

                    <div className="column" align="center">
                      {!myProfile && (
                        <div>
                          <button
                            className={
                              "button is-link " +
                              (this.state.following ? "" : "is-inverted")
                            }
                            disabled={this.state.isFollowDisabled}
                            onClick={this.toggleFollow}
                          >
                            {this.state.following ? "Following" : "Follow"}
                          </button>
                          <br />
                          <br />
                        </div>
                      )}
                      <div className="box is-danger">
                        {this.state.profile != null && (
                          <p> {this.state.profile.name} </p>
                        )}
                      </div>
                      <div className="box">
                        {this.state.profile != null && (
                          <h1>
                            {" "}
                            {this.state.profile.email ? (
                              <p>{this.state.profile.email}</p>
                            ) : (
                              <p>No Email Listed</p>
                            )}{" "}
                          </h1>
                        )}
                      </div>
                    </div>

                    <div className="column" align="center">
                      <div className="box">
                        {this.state.major != null && (
                          <h1>
                            {" "}
                            {this.state.major ? (
                              <p>{this.state.major}</p>
                            ) : (
                              <p>No Major Listed</p>
                            )}{" "}
                          </h1>
                        )}
                      </div>
                    </div>

                    <div className="column" align="left">
                      <div className="box">
                        Bio:
                        {this.state.profile != null && (
                          <div>
                            {" "}
                            {this.state.profile.bio ? (
                              <p>{this.state.profile.bio}</p>
                            ) : (
                              <p>No Available Bio</p>
                            )}{" "}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="column" align="center">
                      {myProfile && this.props.auth && !this.props.auth.isProfessor && (
                        <div className="box">
                          <div>
                            <p>Upload Resume:</p>
                            <ResumeForm
                              onSubmit={data => this.uploadResume(data.file)}
                            />
                          </div>
                        </div>
                      )}
                      {this.state.profile.resume && (
                        <div>
                          <a
                            href={this.state.profile.resume}
                            className="button is-info"
                            target="_blank"
                            rel="noopener noreferrer"
                            download={this.state.profile.name + "_Resume.pdf"}
                          >
                            Download Resume
                          </a>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              )}
            </div>
            </TabPanel>
            {this.props.auth.cruzid === this.state.profile.cruzid && 
            <TabPanel>
                <section>{this.formatPost()}</section>
            </TabPanel>}
          </Tabs>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(
  mapStateToProps,
  actions
)(Profile);
