package models

import java.util.Calendar

import org.specs2.mutable.Specification

class CSVSiteLoaderTest extends Specification {
  "A Trillium Site Loader" should {
    "load the modeled output in hour 1" in {
      val hour: Int = 1

      val calendar = Calendar.getInstance()
      calendar.set(2014, 0, 0, 0, 0, 0)
      calendar.set(Calendar.MILLISECOND, 0)
      calendar.add(Calendar.HOUR, hour.toInt)

      val expectedData: SiteData = SiteData(
        calendar.getTimeInMillis,
        "trillium",
        SiteGHXData(52.40, 52.40, 570.00),
        Seq()
      )
      TrilliumSiteLoader("Trillium-178.csv").siteDataAtHour(hour) must beEqualTo(expectedData)
    }

    "load the modeled output in hour 15" in {
      val hour: Int = 15

      val calendar = Calendar.getInstance()
      calendar.set(2014, 0, 0, 0, 0, 0)
      calendar.set(Calendar.MILLISECOND, 0)
      calendar.add(Calendar.HOUR, hour.toInt)

      val expectedData: SiteData = SiteData(
        calendar.getTimeInMillis,
        "trillium",
        SiteGHXData(76.02, 68.67, 1025.72),
        Seq()
      )
      TrilliumSiteLoader("Trillium-178.csv").siteDataAtHour(hour) must beEqualTo(expectedData)
    }

    "load the modeled output in hour 8760" in {
      val hour: Int = 8760

      val calendar = Calendar.getInstance()
      calendar.set(2014, 0, 0, 0, 0, 0)
      calendar.set(Calendar.MILLISECOND, 0)
      calendar.add(Calendar.HOUR, hour.toInt)

      val expectedData: SiteData = SiteData(
        calendar.getTimeInMillis,
        "trillium",
        SiteGHXData(95.57, 82.18, 570.00),
        Seq()
      )
      TrilliumSiteLoader("Trillium-178.csv").siteDataAtHour(hour) must beEqualTo(expectedData)
    }
  }
}
