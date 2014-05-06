package controllers

import play.api.mvc._
import play.api.libs.json._
import models.DataProvider
import java.net.URL

object Application extends Controller {

  def index = Action {
    Redirect(routes.Application.indexSite("trillium"))
  }

  def indexSite(site: String) = Action {
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
    site match {
      case "trillium" => Ok(TrilliumView.json)
      case _          => NotFound
    }
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

  def postSiteData(site: String) = authenticatedJson { data: Seq[PostSiteData] =>
    site match {
      case "trillium" => Ok
    }
  }
}