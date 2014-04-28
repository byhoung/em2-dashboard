package models

import org.specs2.mutable.Specification
import play.api.test.WithApplication

class SiteDataTest extends Specification {
  "Site Data" should {
    "CRUD" in new WithApplication {
      SiteData.get(1) must beNone

      val data: SiteData = SiteData(None, "A Site", System.currentTimeMillis(), """{"jsonKey":"jsonValue"}""")
      val insertedData: SiteData = data.copy(id = Some(1))
      SiteData.insertOrUpdate(data) must beEqualTo(insertedData)
      SiteData.get(1) must beEqualTo(Some(insertedData))

      val updatedData: SiteData = insertedData.copy(siteName = "A Site 2")
      updatedData must not beTheSameAs insertedData
      SiteData.insertOrUpdate(updatedData) must beEqualTo(updatedData)
      SiteData.get(1) must beEqualTo(Some(updatedData))

      SiteData.delete(1)
      SiteData.get(1) must beNone
    }
  }
}
