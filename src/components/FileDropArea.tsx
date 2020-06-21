import React, { useState, useRef } from "react";
import classNames from "clsx";
import clsx from "clsx";

const FileDropArea = (props: any) => {
  const { getImage } = props;
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const dropAreaClasses = clsx({
    "drop-area": true,
    "js-drop-area": true,
    "padding-md": true,
    highlight: isDragOver,
  });

  const dragHandler = (
    event: React.DragEvent<HTMLDivElement>,
    cb: Function
  ) => {
    // Stops the browser from opening the file in the tab
    event.preventDefault();
    // Stops the event from bubbling higher than necessary
    event.stopPropagation();

    // @ts-ignore
    const dropAreaElem = event.target.closest(".js-drop-area");
    cb(event);
  };

  const handleDragEnter = () => {
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDragOver = () => {
    setIsDragOver(true);
  };

  const handleDrop = (e: any) => {
    setIsDragOver(false);

    const data = e.dataTransfer;
    const file = data.files[0];

    handleFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      const result = {
        name: file.name,
        size: file.size,
        type: file.type,
        src: fileReader.result,
      };
      getImage(result);
    };
  };

  return (
    <div className="card">
      <div
        className={dropAreaClasses}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <form action="#" className="drop-area__form js-drop-area-form">
          <p>Upload multiple files by clicking or dragging a file on here</p>
          <p className="w100 small">
            <em>(Supports only PNG, JPG and SVG images)</em>
          </p>
          <div className="padding-top-md">
            <input
              ref={fileInputRef}
              type="file"
              id="file"
              name="file"
              className="js-file-input"
              accept="image/png,image/jpeg,image/svg"
              onChange={handleFileInput}
            />
            <label
              htmlFor="file"
              className="primary-button drop-area__button margin-top-md small"
            >
              Select File
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileDropArea;
