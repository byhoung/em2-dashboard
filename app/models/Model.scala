package models

import anorm._
import play.api.db._
import anorm.SqlParser._
import play.api.Play.current

case class DataProvider(id: Long, name: String)

object DataProvider {
  val mapper = long("id") ~ str("name") map { case id~name => DataProvider(id, name) }

  def dataProviderForToken(apiKey: String): Option[DataProvider] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM DataProvider WHERE token = {token}")
        .on('token -> apiKey)
        .as(DataProvider.mapper *).headOption
    }
  }
}
