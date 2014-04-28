package models

import org.specs2.mutable.Specification
import play.api.db.DB
import anorm._
import play.api.Play.current
import play.api.test.WithApplication

class DataProviderTest extends Specification {
  "A Data Provider" should {
    "Validate" in new WithApplication {
      DB.withConnection { implicit connection =>
        SQL("INSERT INTO DataProvider (name, token) VALUES ('Test', 'Token');").executeUpdate()
      }

      DataProvider.dataProviderForToken("Token") must beSome(DataProvider(2, "Test"))
    }
  }
}
