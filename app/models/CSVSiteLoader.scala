package models

import java.net.URI
import java.util.Calendar

trait CSVSiteLoader {
  def siteDataAtHour(hour: Double): SiteData
}

case class TrilliumSiteLoader(file: String) extends CSVSiteLoader {
  override def siteDataAtHour(hour: Double) = {
    val string: String = "resources/%s".format(file)
    val uri: URI = getClass.getClassLoader.getResource(string).toURI
    val line: String = scala.io.Source.fromFile(uri).getLines().drop(1 + hour.toInt).next()
    val split: Array[String] = line.split(",")

    val calendar = Calendar.getInstance()
    calendar.set(2014, 0, 0, 0, 0, 0)
    calendar.set(Calendar.MILLISECOND, 0)
    calendar.add(Calendar.HOUR, hour.toInt)

    SiteData(
      calendar.getTimeInMillis,
      "trillium",
      SiteGHXData(split(3).toDouble, split(5).toDouble, split(4).toDouble),
      Seq()
    )
  }
}