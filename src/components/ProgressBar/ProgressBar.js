import React from 'react'

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div style={{ backgroundColor: "#F0F1F5" }} className="w-full rounded-full h-5">
      <div
        className="h-5 rounded-full transition-all duration-300"
        style={{ backgroundColor: "#050D30", width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar