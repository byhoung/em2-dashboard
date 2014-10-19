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
      Seq(
        SiteNodeData(split(6).toDouble, split(8).toDouble, split(7).toDouble), //CP1
        SiteNodeData(split(9).toDouble, split(11).toDouble, split(10).toDouble), //BTU1
        SiteNodeData(split(12).toDouble, split(14).toDouble, split(11).toDouble), //BTU2
        SiteNodeData(split(15).toDouble, split(25).toDouble, split(16).toDouble), //BTU3
        SiteNodeData(split(26).toDouble, split(36).toDouble, split(27).toDouble), //BTU4
        SiteNodeData(split(37).toDouble, split(39).toDouble, split(38).toDouble), //HEX-1
        SiteNodeData(split(41).toDouble, split(43).toDouble, split(40).toDouble), //P-HP4
        SiteNodeData(split(44).toDouble, split(46).toDouble, split(45).toDouble) //Hybrid Switch
      )
    )
  }
}