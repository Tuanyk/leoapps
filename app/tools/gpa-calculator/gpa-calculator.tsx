'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Course = {
  name: string
  grade: string
  credits: number
}

const gradePoints: { [key: string]: number } = {
  'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
}

const defaultCourses: Course[] = [
  { name: 'Introduction to Computer Science', grade: 'A', credits: 3 },
  { name: 'Calculus I', grade: 'B+', credits: 4 },
  { name: 'English Composition', grade: 'A-', credits: 3 },
  { name: 'General Chemistry', grade: 'B', credits: 4 },
]

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>(defaultCourses)
  const [gpa, setGPA] = useState<number | null>(null)

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', credits: 0 }])
  }

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index))
  }

  const updateCourse = (index: number, field: keyof Course, value: string | number) => {
    const updatedCourses = courses.map((course, i) => {
      if (i === index) {
        return { ...course, [field]: value }
      }
      return course
    })
    setCourses(updatedCourses)
  }

  const calculateGPA = () => {
    let totalPoints = 0
    let totalCredits = 0

    courses.forEach(course => {
      if (course.grade && course.credits) {
        totalPoints += gradePoints[course.grade] * course.credits
        totalCredits += course.credits
      }
    })

    if (totalCredits > 0) {
      setGPA(Number((totalPoints / totalCredits).toFixed(2)))
    } else {
      setGPA(null)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>GPA Calculator</CardTitle>
        <CardDescription>Enter your courses, grades, and credit hours to calculate your GPA. We've pre-filled some example courses for you.</CardDescription>
      </CardHeader>
      <CardContent>
        {courses.map((course, index) => (
          <div key={index} className="flex items-end space-x-4 mb-4">
            <div className="flex-1">
              <Label htmlFor={`course-${index}`}>Course</Label>
              <Input
                id={`course-${index}`}
                value={course.name}
                onChange={(e) => updateCourse(index, 'name', e.target.value)}
                placeholder="Course name"
              />
            </div>
            <div className="w-24">
              <Label htmlFor={`grade-${index}`}>Grade</Label>
              <Select
                value={course.grade}
                onValueChange={(value) => updateCourse(index, 'grade', value)}
              >
                <SelectTrigger id={`grade-${index}`}>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gradePoints).map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Label htmlFor={`credits-${index}`}>Credits</Label>
              <Input
                id={`credits-${index}`}
                type="number"
                value={course.credits || ''}
                onChange={(e) => updateCourse(index, 'credits', Number(e.target.value))}
                placeholder="Credits"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeCourse(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <Button onClick={addCourse} variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Course
          </Button>
          <Button onClick={calculateGPA}>Calculate GPA</Button>
        </div>
        {gpa !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Your GPA</h3>
            <p className="text-3xl font-bold">{gpa}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

