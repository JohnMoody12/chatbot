import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Link
        to={"/"}
        style={{ textDecoration: "none" }}
      >
        <img
          src="openai.png"
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontweight: "800",
          textShadow: "2px 2px 20px #000",
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "20px" }}>MERN</span>
        <span>-GPT</span>
      </Typography>
    </div>
  );
};

export default Logo;
