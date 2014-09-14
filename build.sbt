name := "em2-dashboard"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

packageArchetype.java_server

maintainer in Linux := "Sean Freitag <sean@gneoxsolutions.com>"

packageSummary in Linux := "Braun Intertec Geothermal's Client Dashboards"

packageDescription := "Used to publically display live geothermal HVAC performance data."

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws,
  "postgresql" % "postgresql" % "9.1-901-1.jdbc4"
)     
