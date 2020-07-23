import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../app-state/actions/postActions";

export class Wall extends Component {
  static propTypes = {
    //posts: PropTypes.array.isRequired,
    //fetchPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return <div>dlaczegooo</div>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { error: state.error };
}

export default connect(mapStateToProps, { fetchPosts })(Wall);
