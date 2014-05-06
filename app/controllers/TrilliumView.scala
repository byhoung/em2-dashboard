package controllers

import play.api.libs.json._
import play.api.mvc.Controller

case class TrilliumJson(hour: Int,
                        date: String,
                        currentValues: Map[String, Double],
                        maxValues:     Map[String, Double])

object TrilliumJson {
  implicit val format = Json.format[TrilliumJson]
}

object TrilliumView {
  def json: JsValue = Json.parse("[]")
}
