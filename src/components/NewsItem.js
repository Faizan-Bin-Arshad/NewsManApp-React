import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="container my-3">
      <div className="card" style={{ height: "30rem" }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', right: '0', position: 'absolute' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl}
          style={{ height: "10rem" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author} on {date}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            style={{ position: "absolute", top: "27rem", left: "7.5rem" }}
            className="btn btn-sm btn-primary"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
