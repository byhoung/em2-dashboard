package controllers

import play.api.mvc._
import play.api.libs.json._
import models.DataProvider

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Trillium"))
  }

  case class SimpleJson(hour: Int,
                        date: String,
                        currentValues: Map[String, Double],
                        maxValues:     Map[String, Double])

  object SimpleJson {
    implicit val format = Json.format[SimpleJson]
  }

  def siteData(site: String) = Action {
    Ok(Json.toJson(Seq(SimpleJson(
      1,
      "Jan. 1, 2014",
      Map(
        "t1"  -> 50.74,
        "t2"  -> 50.74,
        "t3"  -> 50.74,
        "t4"  -> 50.74,
        "t4a" -> 50.74,
        "t5"  -> 50.74,
        "t6"  -> 50.74,
        "t7"  -> 50.74,
        "t8"  -> 50.74,
        "t9"  -> 50.74,
        "f1"  -> 50.74,
        "f2"  -> 50.74,
        "f3"  -> 50.74,
        "f4"  -> 50.74
      ),
      Map(
        "t1"  -> 50.74,
        "t2"  -> 50.74,
        "t3"  -> 50.74,
        "t4"  -> 50.74,
        "t4a" -> 50.74,
        "t5"  -> 50.74,
        "t6"  -> 50.74,
        "t7"  -> 50.74,
        "t8"  -> 50.74,
        "t9"  -> 50.74,
        "f1"  -> 50.74,
        "f2"  -> 50.74,
        "f3"  -> 50.74,
        "f4"  -> 50.74
      )
    ))))
  }

  case class PostSiteData(timestamp: Option[Long])

  object PostSiteData {
    implicit val format = Json.format[PostSiteData]
  }

  def authenticated[A](block: DataProvider => Result)(implicit request: Request[A]) = {
    request.headers.get("token").flatMap { token =>
      DataProvider.dataProviderForToken(token).map { provider =>
        block(provider)
      }
    }.getOrElse(Forbidden)
  }

  def authenticatedJson[A, B](block: A => Result)(implicit rds : play.api.libs.json.Reads[A]) = {
    Action(BodyParsers.parse.json) { implicit request =>
      authenticated { provider =>
        request.body.validate[A].fold(
          errors => {
            BadRequest(JsError.toFlatJson(errors))
          },
          json => {
            block(json)
          }
        )
      }
    }
  }

  def postSiteData(site: String) = authenticatedJson {
    data: Seq[PostSiteData] => Ok
  }
}