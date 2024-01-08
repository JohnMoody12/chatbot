import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "right",
        gap: "8px",
      }}
    >
      <Link to={"/"}>
        <img
          src="openaiclear.png"
          alt="openai"
          width={"100px"}
          height={"100px"}
          className="image-inverted"
        />
      </Link>
    </div>
  );
};

export default Logo;
