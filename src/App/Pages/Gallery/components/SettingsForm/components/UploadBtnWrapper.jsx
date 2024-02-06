const UploadBtnWrapper = ({ text, cb }) => {
  return (
    <div className="upload-btn-wrapper">
      <button className="btn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {text}
      </button>
      <input
        type="file"
        onChange={(e) => cb(e)}
        multiple
        className="form__input"
        name="form__file"
      />
    </div>
  );
};

export default UploadBtnWrapper;
