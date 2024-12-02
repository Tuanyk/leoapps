'use client'

import { motion } from 'framer-motion'

interface DiceAnimationProps {
  rolling: boolean
  count: number
}

export default function DiceAnimation({ rolling, count }: DiceAnimationProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold"
          animate={rolling ? {
            rotateX: [0, 360, 720, 1080, 1440],
            rotateY: [0, 360, 720, 1080, 1440],
            scale: [1, 1.2, 1, 1.2, 1],
          } : {}}
          transition={{ duration: 2, ease: "easeInOut", delay: index * 0.1 }}
        >
          {rolling ? '?' : ''}
        </motion.div>
      ))}
    </div>
  )
}

