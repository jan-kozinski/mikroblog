import React, { Component } from "react";
import { fetchPosts } from "../app-state/actions/postActions";
import { connect } from "react-redux";

const Paginator = ({ prevPage, nextPage, fetchPosts }) => {
  let currentPage = 1;
  if (nextPage.page) currentPage = nextPage.page - 1;
  else if (prevPage.page) currentPage = prevPage.page + 1;

  const changePage = (page) => {
    window.history.pushState({}, `Mikroblog - page ${page}`, `/page/${page}`);
    fetchPosts(page);
    window.scrollTo(0, 0);
  };
  return (
    <div className="post flex flex-row">
      {prevPage ? (
        <div className="btn w-1/2" onClick={() => changePage(prevPage.page)}>
          Prev page ({prevPage.page})
        </div>
      ) : (
        <div className="btn-disabled w-1/2">Prev page (x)</div>
      )}

      <div style={{ margin: "0 2rem" }}>
        <nobr>Current page: {currentPage}</nobr>
      </div>

      {nextPage ? (
        <div className="btn w-1/2" onClick={() => changePage(nextPage.page)}>
          Next page ({nextPage.page})
        </div>
      ) : (
        <div className="btn-disabled w-1/2">Next page (x)</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  prevPage: state.entities.prevPage,
  nextPage: state.entities.nextPage,
});

export default connect(mapStateToProps, { fetchPosts })(Paginator);
