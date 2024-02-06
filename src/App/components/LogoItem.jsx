const LogoItem = ({ color }) => {
  const black = (
    <div className="lds-ring">
      <div
        style={{ borderColor: "black transparent transparent transparent" }}
      ></div>
      <div
        style={{ borderColor: "black transparent transparent transparent" }}
      ></div>
      <div
        style={{ borderColor: "black transparent transparent transparent" }}
      ></div>
      <div
        style={{ borderColor: "black transparent transparent transparent" }}
      ></div>
    </div>
  );

  const white = (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  if (color === "black") {
    return black;
  } else {
    return white;
  }
};

export default LogoItem;
