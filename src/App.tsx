import React, { useState } from "react";
import "./scss/app.scss";
import FileDropArea from "./components/FileDropArea";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Canvas from "./components/Canvas";

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const getImage = (image: any) => {
    setImage(image);
  };

  const handleTextFormSubmit = (e: any) => {
    e.preventDefault();
    setText(e.target["text"].value);
  };

  return (
    <div className="grid-container">
      <Header />
      <div className="flex justify-center">
        <div className="md:cell-10 lg:cell-8">
          <div className="margin-bottom-md">
            <div className="margin-bottom-xs">
              <FileDropArea getImage={getImage} />
              {image && <p className="color-success">Image Loaded!!!</p>}
            </div>
            <div className="flex justify-center">
              <form className="form" onSubmit={handleTextFormSubmit}>
                <label>
                  <p>Add text here</p>
                  <input name="text" />
                </label>
                <div className="margin-top-sm">
                  <button className="primary-button" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {image && text && (
            <div className="preview-area js-preview">
              <Canvas image={image} text={text} />
            </div>
          )}
        </div>
      </div>
      <div className="modal js-modal hidden"></div>
      <Footer />
    </div>
  );
}

export default App;
