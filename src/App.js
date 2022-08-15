import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState([]);
  const [name, setName] = useState();
  const handlerFile = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile([...file, ...allfiles]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    file.map((item, index) => download(item, index + 1));
    handleRemove();
  };

  function download(file, index) {
    var el = document.createElement("a");
    el.setAttribute("href", URL.createObjectURL(file));
    el.setAttribute("download", `${name}${index}.png`);
    el.click();
    return;
  }

  const handleRemove = () => {
    setFile([]);
  };
  return (
    <form className="App" onSubmit={handleSubmit}>
      <input
        accept="image/*"
        id="file"
        multiple
        type="file"
        onChange={handlerFile}
        className="custom-file-input"
      />
      <label htmlFor="file" className="btn-upload">
        Upload
      </label>
      <input
        type="text"
        required
        placeholder="Enter name...."
        onChange={(e) => setName(e.target.value)}
        className="name"
      />
      <button className="btn-download" type="submit">
        <span className="btn-content">Download </span>
      </button>
      {file.length > 0 && (
        <>
          <ul>
            {file.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
          <button className="remove" onClick={handleRemove}>
            <div className="text">Remove All</div> <div className="x">X</div>
          </button>
        </>
      )}
    </form>
  );
};

export default App;
