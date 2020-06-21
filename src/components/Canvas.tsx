import React, { useRef, useEffect } from "react";

const Canvas = (props: any) => {
  const { image, text } = props;
  const canvasHeight = 720;
  const canvasWidth = 640;

  const canvasRef = useRef(null);
  const canvasCtx = useRef(null);

  const drawImage = () => {
    const ctx = canvasCtx.current;
    const img = new Image();
    img.onload = function() {
      const aspectRatio = img.width / img.height;
      let imgWidth = img.height * aspectRatio;
      let imgHeight = img.width / aspectRatio;

      if (imgWidth > canvasWidth) {
        imgWidth = canvasWidth;
        imgHeight = imgWidth / aspectRatio;
        if (imgHeight > canvasHeight) {
          console.log(imgHeight);
          // @ts-ignore
          canvasRef.current.height = imgHeight + 128;
        }
      }
      // @ts-ignore
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      // @ts-ignore
      ctx.font = "24px Arial";
      // @ts-ignore
      canvasCtx.current.fillStyle = "black";
      // @ts-ignore
      ctx.fillText(text, 16, imgHeight + 64, canvasWidth - 16);
    };
    img.src = image.src;
  };

  const downloadImage = () => {
    const anchor = document.createElement("a");
    // @ts-ignore
    const dataUrl = canvasRef.current.toDataURL("image/png");
    anchor.href = dataUrl;
    // @ts-ignore
    anchor.download = true;
    anchor.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    // @ts-ignore
    canvasCtx.current = canvas.getContext("2d");
    // @ts-ignore
    canvasCtx.current.fillStyle = "white";

    // @ts-ignore
    canvasCtx.current.fillRect(
      0,
      0,
      // @ts-ignore
      canvasRef.current.width,
      // @ts-ignore
      canvasRef.current.height
    );
    if (image && text) {
      drawImage();
    }
  }, [image, text]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
      <div className="margin-bottom-md">
        <button onClick={downloadImage} className="primary-button">
          Download image
        </button>
      </div>
    </>
  );
};

export default Canvas;
