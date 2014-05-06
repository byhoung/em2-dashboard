package models

import play.api.db.DB
import anorm._
import anorm.SqlParser._
import anorm.~
import scala.Some
import play.api.Play.current

case class SiteData(id: Option[Long], siteName: String, date: Long, json: String) {

}

object SiteData {
  val mapper = long("id") ~ str("sitename") ~ long("date") ~ str("data") map { case id~siteName~date~data => SiteData(Some(id), siteName, date, data) }

  def all: List[SiteData] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM SiteData")
        .as(SiteData.mapper *)
    }
  }

  def get(id: Long): Option[SiteData] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM SiteData WHERE id = {id}")
        .on('id -> id).as(SiteData.mapper *).headOption
    }
  }

  def insertOrUpdate(siteData: SiteData): SiteData = {
    DB.withConnection { implicit connection =>
      siteData.id match {
        case None =>
          val id = SQL("INSERT INTO SiteData (sitename, date, data) VALUES ({sitename}, {date}, {data})")
            .on('sitename -> siteData.siteName, 'date -> siteData.date, 'data -> siteData.json).executeInsert[Option[Long]]()
          siteData.copy(id = id)
        case Some(id) =>
          SQL("UPDATE SiteData SET sitename = {sitename}, date = {date}, data = {data} WHERE id = {id}")
            .on('sitename -> siteData.siteName, 'date -> siteData.date, 'data -> siteData.json, 'id -> siteData.id).executeUpdate()
          siteData
      }
    }
  }

  def delete(id: Long) {
    DB.withConnection { implicit connection =>
      SQL("DELETE FROM SiteData WHERE id = {id}")
        .on('id -> id).executeUpdate()
    }
  }
}