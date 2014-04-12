package controllers

import play.api.mvc._
import play.api.libs.json._
import models.DataProvider

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("Trillium"))
  }

  val dumbJson =
    """
      |{
      |	"1" : {
      |		"t1": {
      |			"t1": "50.8",
      |			"f1": "570",
      |			"peakf1": ""
      |		}
      |	},
      |	"2" : {
      |		"t1": {
      |			"t1": "51.28",
      |			"f1": "570",
      |			"peakf1": ""
      |		}
      |	},
      |	"3" : {
      |		"t1": {
      |			"t1": "51.65",
      |			"f1": "783.68",
      |			"peakf1": ""
      |		}
      |	},
      |	"4" : {
      |		"t1": {
      |			"t1": "49.14",
      |			"f1": "1035.19",
      |			"peakf1": ""
      |		}
      |	},
      |	"5" : {
      |		"t1": {
      |			"t1": "49",
      |			"f1": "1178.24",
      |			"peakf1": ""
      |		}
      |	},
      |	"6" : {
      |		"t1": {
      |			"t1": "47.15",
      |			"f1": "1229.65",
      |			"peakf1": ""
      |		}
      |	},
      |	"7" : {
      |		"t1": {
      |			"t1": "46.99",
      |			"f1": "1234.67",
      |			"peakf1": ""
      |		}
      |	}
      |}
    """.stripMargin

  def siteData(site: String) = Action {
    Ok(Json.parse(dumbJson))
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