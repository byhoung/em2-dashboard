package models

import org.specs2.mutable.Specification
import play.api.test.WithApplication

class SiteDataTest extends Specification {
  "Site Data" should {
    "CRUD" in new WithApplication {
      val timestamp: Long = System.currentTimeMillis()

      SiteData.get(timestamp) must beNone

      val data: SiteData = SiteData(timestamp, "A Site", """{"jsonKey":"jsonValue"}""")
      SiteData.insertOrUpdate(data)
      SiteData.get(timestamp) must beEqualTo(Some(data))

      val updatedData: SiteData = data.copy(payload = """{"jsonKey2":"jsonValue2"}""")
      updatedData must not beTheSameAs data
      SiteData.insertOrUpdate(updatedData)
      SiteData.get(timestamp) must beEqualTo(Some(updatedData))

      SiteData.delete(updatedData)
      SiteData.get(timestamp) must beNone
    }
  }
}
