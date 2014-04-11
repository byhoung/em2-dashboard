name := "em2-dashboard"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  "org.postgresql" % "postgresql" % "9.3-1101-jdbc41"
)     

play.Project.playScalaSettings
