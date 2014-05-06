package controllers

import play.api.libs.json._

case class TrilliumJson(hour: Int,
                        date: String,
                        currentValues: Map[String, Double],
                        maxValues:     Map[String, Double])

object TrilliumJson {
  implicit val format = Json.format[TrilliumJson]
}

object TrilliumView {
  def json: JsValue = Json.toJson(Seq(TrilliumJson(1, "2013-04-17", Map(), Map())))
}
