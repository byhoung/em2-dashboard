package models

import org.specs2.mutable.Specification
import play.api.test.WithApplication

class SiteDataTest extends Specification {
  "Site Data" should {
    "CRUD" in new WithApplication {
      val timestamp: Long = System.currentTimeMillis()

      SiteData.get(timestamp) must beNone

      val data: SiteData = SiteData(timestamp, "A Site", SiteGHXData(45, 50, 500), Seq())
      SiteData.insertOrUpdate(data)
      SiteData.get(timestamp) must beEqualTo(Some(data.copy(ghx = data.ghx.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500)))))

      val updatedData: SiteData = data.copy(ghx = SiteGHXData(46, 51, 499))
      updatedData must not beTheSameAs data
      SiteData.insertOrUpdate(updatedData)
      SiteData.get(timestamp) must beEqualTo(Some(updatedData.copy(ghx = updatedData.ghx.copy(maxEwt = Some(46), maxLwt = Some(51), maxFlow = Some(499)))))

      SiteData.delete(updatedData)
      SiteData.get(timestamp) must beNone
    }
    "Update GHX max values" in new WithApplication {
      val timestamp0 = System.currentTimeMillis() - 200
      val timestamp1 = timestamp0 + 100
      val timestamp2 = timestamp1 + 100

      val data0 = SiteData(timestamp0, "A Site", SiteGHXData(45, 50, 500), Seq())
      val data1 = SiteData(timestamp1, "A Site", SiteGHXData(44, 49, 498), Seq())
      val data2 = SiteData(timestamp2, "A Site", SiteGHXData(43, 48, 497), Seq())

      SiteData.get(timestamp0) must beNone
      SiteData.get(timestamp1) must beNone
      SiteData.get(timestamp2) must beNone

      SiteData.insertOrUpdate(data2)
      SiteData.get(timestamp0) must beNone
      SiteData.get(timestamp1) must beNone
      SiteData.get(timestamp2) must beEqualTo(Some(data2.copy(ghx = data2.ghx.copy(maxEwt = Some(43), maxLwt = Some(48), maxFlow = Some(497)))))

      SiteData.insertOrUpdate(data1)
      SiteData.get(timestamp0) must beNone
      SiteData.get(timestamp1) must beEqualTo(Some(data1.copy(ghx = data1.ghx.copy(maxEwt = Some(44), maxLwt = Some(49), maxFlow = Some(498)))))
      SiteData.get(timestamp2) must beEqualTo(Some(data2.copy(ghx = data2.ghx.copy(maxEwt = Some(44), maxLwt = Some(49), maxFlow = Some(498)))))

      SiteData.insertOrUpdate(data0)
      SiteData.get(timestamp0) must beEqualTo(Some(data0.copy(ghx = data0.ghx.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500)))))
      SiteData.get(timestamp1) must beEqualTo(Some(data1.copy(ghx = data1.ghx.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500)))))
      SiteData.get(timestamp2) must beEqualTo(Some(data2.copy(ghx = data2.ghx.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500)))))
    }
    "Update node max values" in new WithApplication {
      val timestamp0 = System.currentTimeMillis() - 200
      val timestamp1 = timestamp0 + 100
      val timestamp2 = timestamp1 + 100

      val node0 = SiteNodeData(45, 50, 500)
      val node1 = SiteNodeData(44, 49, 498)
      val node2 = SiteNodeData(43, 48, 497)

      val data0 = SiteData(timestamp0, "A Site", SiteGHXData(45, 50, 500, Some(45), Some(50), Some(500)), (1 to 10).map { _ => node0})
      val data1 = SiteData(timestamp1, "A Site", SiteGHXData(45, 50, 500, Some(45), Some(50), Some(500)), (1 to 10).map { _ => node1})
      val data2 = SiteData(timestamp2, "A Site", SiteGHXData(45, 50, 500, Some(45), Some(50), Some(500)), (1 to 10).map { _ => node2})

      SiteData.get(timestamp0) must beNone
      SiteData.get(timestamp1) must beNone
      SiteData.get(timestamp2) must beNone

      SiteData.insertOrUpdate(data2)
      SiteData.get(timestamp0) must beNone
      SiteData.get(timestamp1) must beNone
      SiteData.get(timestamp2) must beEqualTo(Some(data2.copy(nodes = (1 to 10).map { _ => node2.copy(maxEwt = Some(43), maxLwt = Some(48), maxFlow = Some(497))})))

      SiteData.insertOrUpdate(data1)
      SiteData.get(timestamp0) must beNone
      SiteData.get(timestamp1) must beEqualTo(Some(data1.copy(nodes = (1 to 10).map { _ => node1.copy(maxEwt = Some(44), maxLwt = Some(49), maxFlow = Some(498))})))
      SiteData.get(timestamp2) must beEqualTo(Some(data2.copy(nodes = (1 to 10).map { _ => node2.copy(maxEwt = Some(44), maxLwt = Some(49), maxFlow = Some(498))})))

      SiteData.insertOrUpdate(data0)
      SiteData.get(timestamp0) must beEqualTo(Some(data0.copy(nodes = (1 to 10).map { _ => node0.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500))})))
      SiteData.get(timestamp1) must beEqualTo(Some(data1.copy(nodes = (1 to 10).map { _ => node1.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500))})))
      SiteData.get(timestamp2) must beEqualTo(Some(data2.copy(nodes = (1 to 10).map { _ => node2.copy(maxEwt = Some(45), maxLwt = Some(50), maxFlow = Some(500))})))
    }
  }
}
