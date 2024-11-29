'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './BMICalculator.module.css'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBMI] = useState(0)
  const [result, setResult] = useState('')
  const [normalWeightRange, setNormalWeightRange] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault()
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    
    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = weightNum / ((heightNum / 100) ** 2)
      setBMI(bmiValue)
      let resultText = `Your BMI is ${bmiValue.toFixed(2)}.`
      
      if (bmiValue < 18.5) {
        resultText += ' You are underweight.'
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        resultText += ' You have a normal weight.'
      } else if (bmiValue >= 25 && bmiValue < 30) {
        resultText += ' You are overweight.'
      } else {
        resultText += ' You are obese.'
      }
      
      setResult(resultText)

      // Calculate normal weight range
      const minNormalWeight = 18.5 * ((heightNum / 100) ** 2)
      const maxNormalWeight = 24.9 * ((heightNum / 100) ** 2)
      setNormalWeightRange(`Normal weight range for your height: ${minNormalWeight.toFixed(1)} - ${maxNormalWeight.toFixed(1)} kg`)
    } else {
      setResult('Please enter valid values for weight and height.')
      setNormalWeightRange('')
    }
  }

  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth
        canvasRef.current.height = 200 // Fixed height
        if (bmi > 0) {
          drawBmiChart(bmi, parseFloat(height), parseFloat(weight))
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [bmi, height, weight])

  const drawBmiChart = (bmi: number, height: number, weight: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Define BMI categories
    const categories = [
      { label: 'Underweight', max: 18.5, color: '#ADD8E6' },
      { label: 'Normal', max: 25, color: '#90EE90' },
      { label: 'Overweight', max: 30, color: '#FFD700' },
      { label: 'Obese', max: 40, color: '#FF6347' }
    ]

    // Normalize the BMI to the chart width
    const minBmi = 10
    const maxBmi = 40
    const bmiScale = canvasWidth / (maxBmi - minBmi)

    // Draw the categories
    let startX = 0
    categories.forEach(category => {
      const categoryWidth = (category.max - minBmi) * bmiScale - startX
      ctx.fillStyle = category.color
      ctx.fillRect(startX, 0, categoryWidth, canvasHeight - 40) // Leave space for labels

      // Draw category labels
      ctx.fillStyle = '#000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(category.label, startX + categoryWidth / 2, canvasHeight - 25)
      ctx.fillText(`BMI ${category.max}`, startX + categoryWidth / 2, 15)

      startX += categoryWidth
    })

    // Draw the BMI marker
    const bmiX = (bmi - minBmi) * bmiScale
    ctx.beginPath()
    ctx.moveTo(bmiX, 0)
    ctx.lineTo(bmiX, canvasHeight - 40)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw the current weight label
    ctx.fillStyle = '#000'
    ctx.font = '14px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Current: ${weight.toFixed(2)} kg`, bmiX + 5, canvasHeight - 5)
  }

  return (
    <div className={styles.bmiCalculator}>
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          aria-describedby="weightHelp"
        />
        <small id="weightHelp" className={styles.helpText}>Enter your weight in kilograms</small>

        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          aria-describedby="heightHelp"
        />
        <small id="heightHelp" className={styles.helpText}>Enter your height in centimeters</small>

        <button type="submit">Calculate BMI</button>
      </form>
      <div id="result" className={styles.result} aria-live="polite">{result}</div>
      <div id="normalWeightRange" className={styles.normalWeightRange} aria-live="polite">{normalWeightRange}</div>
      <div ref={containerRef} className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.bmiChart} aria-label="BMI Chart"></canvas>
      </div>
    </div>
  )
}

