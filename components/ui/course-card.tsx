import type { Course } from "@/lib/domain/models/course"
import { BookOpen, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-300"
      case "intermediate":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="h-3 bg-gradient-to-r from-secondary to-accent" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {course.iconUrl ? (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                <Image
                  src={course.iconUrl || "/placeholder.svg"}
                  alt={course.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary-100 text-secondary-600 flex items-center justify-center font-bold">
                {course.name.charAt(0)}
              </div>
            )}
            <CardTitle>{course.name}</CardTitle>
          </div>
          <Badge className={`${getLevelColor(course.level)} capitalize`}>{course.level}</Badge>
        </div>
        <CardDescription className="text-sm">
          {course.isCurriculumAligned && course.curriculumGrade
            ? `Aligned with ${course.curriculumGrade} curriculum`
            : "Self-paced course"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 line-clamp-3">{course.description}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{course.lessonCount} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.estimatedHours} hours</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/courses/${course.id}`} className="w-full">
          <Button variant="outline" className="w-full group">
            Start Learning
            <BookOpen className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

