package controllers

import play.api.mvc._
import play.api.libs.json._
import models.{SiteData, DataProvider}
import java.net.URL

object Application extends Controller {

  def index = Action {
    Redirect(routes.Application.indexSite("trillium"))
  }

  def indexSite(site: String) = Action {
    Ok(views.html.index("Trillium"))
  }

  case class PostSiteData(timestamp: Long, payload: String)

  object PostSiteData {
    implicit val format = Json.format[PostSiteData]
  }

  def siteData(site: String) = Action {
    NotFound
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

  def postSiteData(site: String) = authenticatedJson { data: Seq[SiteIncomingJson] =>
//    SiteData.insertOrUpdate(data.map { d => SiteData(d.timestamp, site, Json.to) } )
    Accepted
  }
}