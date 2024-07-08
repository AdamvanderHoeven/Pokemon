import { Link } from "react-router-dom";
import React from "react";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-dound-title">404 not found</h1>
      <Link to="/" className="not-found-link">
        Home from Link
      </Link>
    </div>
  );
}
