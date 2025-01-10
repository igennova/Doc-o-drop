import React, { useRef } from 'react';

const WebcamTest = () => {
  const videoRef = useRef(null);

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
    </div>
  );
};

export default WebcamTest;
