"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TourStep {
  target: string
  title: string
  content: string
  position?: "top" | "bottom" | "left" | "right"
}

interface GuidedTourProps {
  steps: TourStep[]
  isActive: boolean
  onComplete: () => void
  onSkip: () => void
}

export function GuidedTour({ steps, isActive, onComplete, onSkip }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement
      setTargetElement(element)

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        element.style.position = "relative"
        element.style.zIndex = "1001"
      }
    }
  }, [currentStep, isActive, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip()
  }

  if (!isActive || !steps[currentStep] || !targetElement) {
    return null
  }

  const step = steps[currentStep]
  const rect = targetElement.getBoundingClientRect()

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const position = step.position || "bottom"
    const offset = 20

    switch (position) {
      case "top":
        return {
          top: rect.top - offset,
          left: rect.left + rect.width / 2,
          transform: "translate(-50%, -100%)",
        }
      case "bottom":
        return {
          top: rect.bottom + offset,
          left: rect.left + rect.width / 2,
          transform: "translate(-50%, 0)",
        }
      case "left":
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - offset,
          transform: "translate(-100%, -50%)",
        }
      case "right":
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + offset,
          transform: "translate(0, -50%)",
        }
      default:
        return {
          top: rect.bottom + offset,
          left: rect.left + rect.width / 2,
          transform: "translate(-50%, 0)",
        }
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-1000" />

      {/* Highlight */}
      <div
        className="fixed border-4 border-primary rounded-lg z-1001 pointer-events-none animate-pulse-glow"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
        }}
      />

      {/* Tooltip */}
      <Card className="fixed z-1002 w-80 p-4 shadow-xl" style={getTooltipPosition()}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-foreground">{step.title}</h3>
            <div className="text-xs text-muted-foreground mt-1">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSkip} className="h-6 w-6 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{step.content}</p>

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleSkip} className="text-muted-foreground">
            Skip Tour
          </Button>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            )}
            <Button size="sm" onClick={handleNext} className="bg-primary hover:bg-primary/90">
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
