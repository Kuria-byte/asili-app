import { MainNav } from "@/components/navigation/main-nav"
import { CourseCard } from "@/components/ui/course-card"
import { container } from "@/lib/di/container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default async function CoursesPage() {
  const languages = await container.languageService.getAllLanguages()
  const allCourses = await Promise.all(
    languages.map(async (language) => {
      const courses = await container.courseService.getCoursesByLanguage(language.id)
      return { language, courses }
    }),
  )

  // Flatten all courses for the "All Courses" tab
  const flattenedCourses = allCourses.flatMap((item) => item.courses)

  // Get courses by level
  const beginnerCourses = flattenedCourses.filter((course) => course.level === "beginner")
  const intermediateCourses = flattenedCourses.filter((course) => course.level === "intermediate")
  const advancedCourses = flattenedCourses.filter((course) => course.level === "advanced")

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="bg-neutral-50 py-12 dark:bg-neutral-900/50">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Explore Courses</h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              Discover our structured learning paths designed to take you from beginner to fluent speaker. Choose a
              course to start your language journey.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="w-full max-w-xs">
                <Label htmlFor="language-filter" className="mb-2 block">
                  Filter by Language
                </Label>
                <Select>
                  <SelectTrigger id="language-filter">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((language) => (
                      <SelectItem key={language.id} value={language.id}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {flattenedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="beginner" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {beginnerCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="intermediate" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {intermediateCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {advancedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-12 space-y-8">
              {allCourses.map(
                ({ language, courses }) =>
                  courses.length > 0 && (
                    <div key={language.id}>
                      <h2 className="mb-6 text-2xl font-bold">{language.name} Courses</h2>
                      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asili. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

