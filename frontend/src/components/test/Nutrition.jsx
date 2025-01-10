import React, { useRef, useEffect, useState } from "react";
import * as posenet from "@tensorflow-models/posenet";
import "@tensorflow/tfjs";

const YogaPoseApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poseName, setPoseName] = useState("Mountain Tadasana");
  const [timeLeft, setTimeLeft] = useState(30);
  const [poseCounter, setPoseCounter] = useState(0);
  const posesArray = ["Mountain Tadasana", "Tree", "Downward Dog", "Warrior I", "Warrior II", "Chair"];

  useEffect(() => {
    const loadPosenet = async () => {
      const net = await posenet.load();
      startPoseDetection(net);
    };

    const setupCamera = async () => {
      const video = videoRef.current;
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
        return new Promise((resolve) => {
          video.onloadedmetadata = () => resolve(video);
        });
      }
    };

    const startPoseDetection = async (net) => {
      const video = await setupCamera();
      video.play();

      const detectPose = async () => {
        const pose = await net.estimateSinglePose(video, {
          flipHorizontal: true,
        });
        drawPose(pose);
        setTimeout(detectPose, 100);
      };

      detectPose();
    };

    const drawPose = (pose) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const video = videoRef.current;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (pose) {
        pose.keypoints.forEach(({ position, score }) => {
          if (score > 0.5) {
            ctx.beginPath();
            ctx.arc(position.x, position.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          }
        });
      }
    };

    loadPosenet();
  }, []);

  const nextPose = () => {
    if (poseCounter >= posesArray.length - 1) {
      alert("Well done, you have learned all poses!");
    } else {
      setPoseCounter((prev) => prev + 1);
      setPoseName(posesArray[poseCounter + 1]);
      setTimeLeft(30);
    }
  };

  return (
    <div>
      <h1>Yoga Pose Trainer</h1>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} width="640" height="480" />
      <div>
        <h2>Current Pose: {poseName}</h2>
        <h3>Time Left: {timeLeft}s</h3>
        <button onClick={nextPose}>Next Pose</button>
      </div>
    </div>
  );
};

export default YogaPoseApp;
