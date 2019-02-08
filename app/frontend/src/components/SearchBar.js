import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/searchbar.scss';
import { fetchPosts, fetchDepartments, fetchFaculty, searchPosts } from '../actions/index';



class SearchBar extends Component {
    dropdownClicked() {
      const dropdown = document.querySelector(".dropdown-items");
      if (dropdown.hasAttribute("style"))
      {
        dropdown.removeAttribute("style");
      }
      else
      {
        dropdown.setAttribute("style", "display: none");
      }
    }

    itemClicked(item) {
      document.querySelector(".dropdown-trigger").innerHTML = item;
      this.dropdownClicked();
    }

    handleSubmit(e) {
      e.preventDefault();

      let type = document.querySelector(".dropdown-trigger").innerHTML;
      let query = document.querySelector(".input").value;
      const data = searchPosts(type, query)();
      
      data.then(res => console.log(res)).catch(err => console.log(err));
    }

    render() {
        return(
            <div>
              <section className="section">
                <div className="container">
                  <div className="control">
                    <span className="dropdown-trigger" onClick={this.dropdownClicked}>Default</span> 
                    <ul className="box dropdown-items" style={{display: 'none'}}>
                      <li className="dropdown-item" onClick={() => this.itemClicked("Default")}>Default</li>
                      <li className="dropdown-item" onClick={() => this.itemClicked("Department")}>Department</li>
                      <li className="dropdown-item" onClick={() => this.itemClicked("Professor")}>Professor</li>
                      <li className="dropdown-item" onClick={() => this.itemClicked("Title")}>Title</li>
                    </ul> 
                  </div>
                </div>
              </section>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" className="input" id="searchbar" placeholder="Search" />
              </form>
            </div>
        )
    }
}

export default connect()(SearchBar);