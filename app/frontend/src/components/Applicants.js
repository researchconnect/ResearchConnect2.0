import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as actions from "../actions";
import qs from "query-string";
import axios from 'axios';
import Spinner from './Spinner';
import ApplicantCard from './ApplicantCard';

class Applicants extends Component {


  async componentDidMount() {
    const args = qs.parse(this.props.location.search);
    const id = args.id ? args.id : "";

    let post = await axios.get("/api/research_posts/", {
      params: {
        id: id,
        fill: true
      }
    });

    this.state.post = post.data;
    this.forceUpdate();
  }

  formatApplicant() {
    var applicants = this.state.post.applicants;
    return (
      <div className="flex-container">
        {applicants.map(applicant => (<ApplicantCard onSubmit={this.onSubmit} key={applicant._id} applicant={{
          id: applicant._id,
          status: applicant.status,
          student: applicant.student,
          cruzid: applicant.student.cruzid,
          ownerProfile: "/profile/" + applicant.student.cruzid,
        }} />))}
      </div>)
  }

  onSubmit(applicationID, accept) {
    axios.post('/api/apply', {
      id: applicationID,
      status: accept
    });
    for (let i = 0; i < this.state.post.applicants.length; i++) {
      if (this.state.post.applicants[i]._id === applicationID) {
        var post = this.state.post;
        post.applicants[i].status = accept ? "accepted" : "denied";
        this.setState({
          post: post
        });
      }
    }
    this.forceUpdate();
  }

  render() {
    if (this.state.post !== null) {
      if (this.props.auth.cruzid !== this.state.post.owner.cruzid) {
        return <p>Permission denied</p>;
      }

      const data = this.state.post.applicants;

      if (data === null || data.length === 0)
        return (<div className="has-text-centered"><br /><br />No Applicants</div>);

      // const listItems = data.map((d) => {
      //   if (d.status === 'pending') {
      //     return (
      //       <li key={d.student.cruzid}>
      //         <Link className="link" to={"/profile/" + d.student.cruzid}>{d.student.cruzid}</Link><br />
      //         <button className="accept" onClick={() => this.onSubmit(d._id, true)}>Accept</button><br />
      //         <button className="decline" onClick={() => this.onSubmit(d._id, false)}>Decline</button>
      //       </li>
      //     );
      //   } else {
      //     return (
      //       <li key={d.student.cruzid}>
      //         <Link className="link" to={"/profile/" + d.student.cruzid}>{d.student.cruzid + " - " + d.status}</Link>
      //       </li>
      //     );
      //   }
      // });

      return (
        // <div>
        // {listItems}
        // </div>
        <section className="section">
          <div className="App">
          </div>

          {this.formatApplicant()}

        </section>
      );
    } else {
      return <Spinner fullPage />;
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(Applicants);
