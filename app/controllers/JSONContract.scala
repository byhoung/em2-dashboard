package controllers

import play.api.libs.json._

case class SimpleInNode (name: String, ewt: Double, lwt: Double, flow: Double)
case class SimpleOutNode(name: String, ewt: Double, lwt: Double, flow: Double, maxEwt: Double, maxLwt: Double, maxFlow: Double)

case class GHXOutNode(ewt: Double, lwt: Double, flow: Double, maxEwt: Double, maxLwt: Double, maxFlow: Double, stack: Double) {
  val name = "ghx"
}

case class SiteIncomingJson(timestamp: Long, nodes: Seq[SimpleInNode])
case class SiteOutgoingJson(timestamp: Long, ghx: GHXOutNode, nodes: Seq[SimpleOutNode])

object SimpleInNode {
  implicit val format = Json.format[SimpleInNode]
}

object SimpleOutNode {
  implicit val format = Json.format[SimpleOutNode]
}

object GHXOutNode {
  implicit val format = Json.format[GHXOutNode]
}

object SiteOutgoingJson {
  implicit val format = Json.format[SiteOutgoingJson]
}

object SiteIncomingJson {
  implicit val format = Json.format[SiteIncomingJson]
}