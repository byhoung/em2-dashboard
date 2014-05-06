package models

import play.api.db.DB
import anorm._
import anorm.SqlParser._
import anorm.~
import play.api.Play.current

case class SiteData(timestamp: Long, siteName: String, payload: String)

object SiteData {
  val mapper = long("timestamp") ~ str("sitename") ~ str("payload") map { case timestamp~siteName~payload => SiteData(timestamp, siteName, payload) }

  def all: List[SiteData] = {
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
    DB.withConnection { implicit connection =>
      if (SQL("UPDATE SiteData SET payload = {payload} WHERE timestamp = {timestamp} AND sitename = {sitename}")
        .on('sitename -> siteData.siteName, 'timestamp -> siteData.timestamp, 'payload -> siteData.payload).executeUpdate() == 0) {
        SQL("INSERT INTO SiteData (timestamp, sitename, payload) VALUES ({timestamp}, {sitename}, {payload})")
          .on('sitename -> siteData.siteName, 'timestamp -> siteData.timestamp, 'payload -> siteData.payload).executeInsert()
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