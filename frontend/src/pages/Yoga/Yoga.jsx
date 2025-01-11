
import * as poseDetection from '@tensorflow-models/pose-detection'
import * as tf from '@tensorflow/tfjs'
import React, { useRef, useState, useEffect } from 'react'
import '@tensorflow/tfjs-backend-webgl'
import { count } from '../../utils/music'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Camera, BarChart3 } from 'lucide-react'
import { poseImages } from '../../utils/pose_images'
import { POINTS, keypointConnections } from '../../utils/data'
import { drawPoint, drawSegment } from '../../utils/helper'

let skeletonColor = 'rgb(56, 189, 248)'
let poseList = ['Tree', 'Chair', 'Cobra', 'Warrior', 'Dog', 'Shoulderstand', 'Triangle']
let flag = false
let interval

export default function Yoga() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [startingTime, setStartingTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [poseTime, setPoseTime] = useState(0)
  const [bestPerform, setBestPerform] = useState(0)
  const [currentPose, setCurrentPose] = useState('Tree')
  const [isStartPose, setIsStartPose] = useState(false)
  const [accuracy, setAccuracy] = useState(0)
  const [sessions, setSessions] = useState(25)
  const [hours, setHours] = useState(12)
  const [poses, setPoses] = useState(15)

  // ... Keep all the existing ML functions unchanged ...
  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Triangle: 5,
    Tree: 6,
    Warrior: 7,
  }

  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1)
    let right = tf.gather(landmarks, right_bodypart, 1)
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5))
    return center
  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    let shoulders_center = get_center_point(landmarks, POINTS.LEFT_SHOULDER, POINTS.RIGHT_SHOULDER)
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center))
    let pose_center_new = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center_new = tf.expandDims(pose_center_new, 1)
    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2])
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0)
    let max_dist = tf.max(tf.norm(d, 'euclidean', 0))
    let pose_size = tf.maximum(tf.mul(torso_size, torso_size_multiplier), max_dist)
    return pose_size
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(landmarks, POINTS.LEFT_HIP, POINTS.RIGHT_HIP)
    pose_center = tf.expandDims(pose_center, 1)
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2])
    landmarks = tf.sub(landmarks, pose_center)
    let pose_size = get_pose_size(landmarks)
    landmarks = tf.div(landmarks, pose_size)
    return landmarks
  }

  function landmarks_to_embedding(landmarks) {
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0))
    let embedding = tf.reshape(landmarks, [1, 34])
    return embedding
  }

  const runMovenet = async () => {
    const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER }
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig)
    const poseClassifier = await tf.loadLayersModel('https://models.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    const countAudio = new Audio(count)
    countAudio.loop = true
    interval = setInterval(() => {
      detectPose(detector, poseClassifier, countAudio)
    }, 100)
  }

  const detectPose = async (detector, poseClassifier, countAudio) => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      let notDetected = 0
      const video = videoRef.current
      const pose = await detector.estimatePoses(video)
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      try {
        const keypoints = pose[0].keypoints
        let input = keypoints.map((keypoint) => {
          if (keypoint.score > 0.4) {
            if (!(keypoint.name === 'left_eye' || keypoint.name === 'right_eye')) {
              drawPoint(ctx, keypoint.x, keypoint.y, 8, skeletonColor)
              let connections = keypointConnections[keypoint.name]
              try {
                connections.forEach((connection) => {
                  let conName = connection.toUpperCase()
                  drawSegment(
                    ctx,
                    [keypoint.x, keypoint.y],
                    [keypoints[POINTS[conName]].x, keypoints[POINTS[conName]].y],
                    skeletonColor
                  )
                })
              } catch (err) { }
            }
          } else {
            notDetected += 1
          }
          return [keypoint.x, keypoint.y]
        })
        if (notDetected > 4) {
          skeletonColor = 'rgb(56, 189, 248)'
          return
        }
        const processedInput = landmarks_to_embedding(input)
        const classification = poseClassifier.predict(processedInput)

        classification.array().then((data) => {
          const classNo = CLASS_NO[currentPose]
          setAccuracy(Math.round(data[0][classNo] * 100))
          if (data[0][classNo] > 0.97) {
            if (!flag) {
              countAudio.play()
              setStartingTime(new Date(Date()).getTime())
              flag = true
            }
            setCurrentTime(new Date(Date()).getTime())
            skeletonColor = 'rgb(34, 197, 94)'
          } else {
            flag = false
            skeletonColor = 'rgb(56, 189, 248)'
            countAudio.pause()
            countAudio.currentTime = 0
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  function startYoga() {
    setIsStartPose(true)
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        runMovenet()
      })
      .catch((err) => console.error('Error accessing webcam: ', err))
  }

  function stopPose() {
    setIsStartPose(false)
    clearInterval(interval)
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }
  }

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000
    if (flag) {
      setPoseTime(timeDiff)
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff)
    }
  }, [currentTime])

  useEffect(() => {
    setCurrentTime(0)
    setPoseTime(0)
    setBestPerform(0)
  }, [currentPose])

  if (isStartPose) {
    return (
      <div className="h-screen w-screen overflow-auto bg-gray-900 text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto h-full">
          <div className='flex justify-between items-center mb-8'>
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">AI-Powered Yoga Training</h1>
              <p className="text-sky-400 text-xl">Just Like Having a Personal Instructor</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={stopPose}
              className=" bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Stop Session
            </motion.button>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-8 h-[calc(100%-100px)]">
            <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="space-y-6">

              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Accuracy</span>
                      <span>{accuracy}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-sky-400"
                        animate={{ width: `${accuracy}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <div className="text-sky-400 mb-1">Pose Time</div>
                      <div className="text-2xl font-bold">{poseTime.toFixed(1)}s</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <div className="text-sky-400 mb-1">Best Time</div>
                      <div className="text-2xl font-bold">{bestPerform.toFixed(1)}s</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Current Pose</h3>
                <div className="aspect-square relative bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={poseImages[currentPose]}
                    alt={currentPose}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen overflow-auto bg-gray-900 text-white p-4 md:p-8 ">
      <div className="max-w-4xl mx-auto h-full mb-24">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">AI-Powered Yoga Training</h1>
          <p className="text-sky-400 text-xl">Just Like Having a Personal Instructor</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-sky-400/10 rounded-lg flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-gray-400">Advanced AI monitors and corrects your yoga poses in real-time.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-sky-400/10 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Routines</h3>
            <p className="text-gray-400">Custom yoga sequences adapted to your skill level and goals.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-sky-400/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-400">Detailed analytics and progress reports to keep you motivated.</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-sky-400 mb-2">{sessions}</div>
            <div className="text-gray-400">Sessions</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-sky-400 mb-2">{hours}</div>
            <div className="text-gray-400">Hours</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-sky-400 mb-2">{poses}</div>
            <div className="text-gray-400">Poses</div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <select
            value={currentPose}
            onChange={(e) => setCurrentPose(e.target.value)}
            className="w-full max-w-md bg-gray-800 text-white py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {poseList.map((pose) => (
              <option key={pose} value={pose}>
                {pose} Pose
              </option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startYoga}
            className="w-full max-w-md bg-sky-500 hover:bg-sky-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
          >
            Start Your AI Yoga Journey
          </motion.button>
        </div>
      </div>
    </div>
  )
}