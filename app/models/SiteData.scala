package models

import play.api.db.DB
import anorm._
import anorm.SqlParser._
import anorm.~
import play.api.Play.current

case class SiteGHXData(ewt:     Double,
                       lwt:     Double,
                       flow:    Double,
                       maxEwt:  Option[Double] = None,
                       maxLwt:  Option[Double] = None,
                       maxFlow: Option[Double] = None)

case class SiteNodeData(ewt:     Double,
                        lwt:     Double,
                        flow:    Double,
                        maxEwt:  Option[Double] = None,
                        maxLwt:  Option[Double] = None,
                        maxFlow: Option[Double] = None)

case class SiteData(timestamp: Long,
                    siteName: String,
                    ghx: SiteGHXData,
                    nodes: Seq[SiteNodeData])

object SiteData {
  val mapper = (SqlParser.get[Long]          ("timestamp")
              ~ SqlParser.get[String]        ("sitename")
              ~ SqlParser.get[Double]        ("ghx_ewt")
              ~ SqlParser.get[Double]        ("ghx_lwt")
              ~ SqlParser.get[Double]        ("ghx_flow")
              ~ SqlParser.get[Option[Double]]("ghx_maxewt")
              ~ SqlParser.get[Option[Double]]("ghx_maxlwt")
              ~ SqlParser.get[Option[Double]]("ghx_maxflow")) map {
    case t~s~ge~gl~gf~gme~gml~gmf => SiteData(t, s, SiteGHXData(ge, gl, gf, gme, gml, gmf), Seq())
  }

  def all: Seq[SiteData] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM SiteData")
        .as(SiteData.mapper *)
    }
  }

  def get(timestamp: Long): Option[SiteData] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM SiteData WHERE timestamp = {timestamp}")
        .on('timestamp -> timestamp).as(SiteData.mapper *).headOption
    }
  }

  def insertOrUpdate(siteData: SiteData) {
    this.insertOrUpdate(Seq(siteData))
  }

  def insertOrUpdate(siteDatas: Seq[SiteData]) {
    DB.withTransaction { implicit connection =>
      siteDatas.foreach { siteData =>
        val params: Seq[(Any, ParameterValue[_])] = Seq(
          'sitename -> siteData.siteName,
          'timestamp -> siteData.timestamp,
          'ghx_ewt -> siteData.ghx.ewt,
          'ghx_lwt -> siteData.ghx.lwt,
          'ghx_flow -> siteData.ghx.flow,
          'ghx_maxewt -> siteData.ghx.maxEwt,
          'ghx_maxlwt -> siteData.ghx.maxLwt,
          'ghx_maxflow -> siteData.ghx.maxFlow
        )

        val updateStatement: String = "UPDATE SiteData SET ghx_ewt = {ghx_ewt}, ghx_lwt = {ghx_lwt}, ghx_flow = {ghx_flow}, ghx_maxewt = {ghx_maxewt}, ghx_maxlwt = {ghx_maxlwt}, ghx_maxflow = {ghx_maxflow} WHERE timestamp = {timestamp} AND sitename = {sitename}"
        val insertStatement: String = "INSERT INTO SiteData (timestamp, sitename, ghx_ewt, ghx_lwt, ghx_flow, ghx_maxewt, ghx_maxlwt, ghx_maxflow) VALUES ({timestamp}, {sitename}, {ghx_ewt}, {ghx_lwt}, {ghx_flow}, {ghx_maxewt}, {ghx_maxlwt}, {ghx_maxflow})"

        if (SQL(updateStatement).on(params: _*).executeUpdate() == 0) {
          SQL(insertStatement).on(params: _*).executeInsert()
        }
      }

      val min: Long = siteDatas.map(_.timestamp).min

      SQL("SELECT * FROM SiteData WHERE timestamp >= {min}").on('min -> min).as(SiteData.mapper *).foreach { data =>
        SQL("UPDATE SiteData SET " +
          "ghx_maxewt  = (SELECT MAX(ghx_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "ghx_maxlwt  = (SELECT MAX(ghx_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "ghx_maxflow = (SELECT MAX(ghx_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}) " +
          "WHERE timestamp = {timestamp} AND sitename = {sitename}").on('timestamp -> data.timestamp, 'sitename -> data.siteName).executeUpdate()
      }
    }
  }

  def delete(siteData: SiteData) {
    DB.withConnection { implicit connection =>
      SQL("DELETE FROM SiteData WHERE timestamp = {timestamp} AND sitename = {sitename}")
        .on('timestamp -> siteData.timestamp, 'sitename -> siteData.siteName).executeUpdate()
    }
  }
}