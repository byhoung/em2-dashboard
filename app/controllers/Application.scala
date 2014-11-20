package controllers

import java.util.Calendar

import models._
import play.api.libs.json._
import play.api.mvc._

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

  val trilliumSiteLoader = TrilliumSiteLoader("Trillium-178.csv")

  def siteData(site: String) = Action {
    site match {
      case "trillium" =>
        val calendar = Calendar.getInstance()
        val totalSeconds = calendar.get(Calendar.SECOND) + (calendar.get(Calendar.MINUTE) * 60) + (calendar.get(Calendar.HOUR_OF_DAY) * 60 * 60)
        val hour = (totalSeconds * 0.10138888888) % 8760
        println("%d - %.0f".format(totalSeconds, hour))
        Ok(Json.toJson(Seq(trilliumSiteLoader.siteDataAtHour(hour))))
      case _ => NotFound
    }
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
    SiteData.insertOrUpdate(data.map { d =>
      val (ghxs, nodes) = d.nodes.partition(_.name.equalsIgnoreCase("ghx"))
      SiteData(d.timestamp, site, ghxs.map(g => SiteGHXData(g.ewt, g.lwt, g.flow)).head, nodes.map(n => SiteNodeData(n.ewt, n.lwt, n.flow)))
    })
    Accepted
  }
}