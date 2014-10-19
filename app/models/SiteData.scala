package models

import anorm.{~, _}
import play.api.Play.current
import play.api.db.DB
import play.api.libs.json.Json

case class SiteGHXData(ewt:     Double,
                       lwt:     Double,
                       flow:    Double,
                       maxEwt:  Option[Double] = None,
                       maxLwt:  Option[Double] = None,
                       maxFlow: Option[Double] = None)

object SiteGHXData {
  implicit val format = Json.format[SiteGHXData]
}

case class SiteNodeData(ewt:     Double,
                        lwt:     Double,
                        flow:    Double,
                        maxEwt:  Option[Double] = None,
                        maxLwt:  Option[Double] = None,
                        maxFlow: Option[Double] = None)

object SiteNodeData {
  implicit val format = Json.format[SiteNodeData]
}

case class SiteData(timestamp: Long,
                    siteName: String,
                    ghx: SiteGHXData,
                    nodes: Seq[SiteNodeData]) {
  assert(nodes.size <= 10, "%s currently only supports 10 additional nodes and %d were provided".format(getClass.getName, nodes.size))
}

object SiteData {
  implicit val format = Json.format[SiteData]

  val mapper = (
    SqlParser.get[Long]          ("timestamp")
  ~ SqlParser.get[String]        ("sitename")
  ~ SqlParser.get[Double]        ("ghx_ewt")
  ~ SqlParser.get[Double]        ("ghx_lwt")
  ~ SqlParser.get[Double]        ("ghx_flow")
  ~ SqlParser.get[Option[Double]]("ghx_maxewt")
  ~ SqlParser.get[Option[Double]]("ghx_maxlwt")
  ~ SqlParser.get[Option[Double]]("ghx_maxflow")
  ~ SqlParser.get[Option[Double]]("node0_ewt")
  ~ SqlParser.get[Option[Double]]("node0_lwt")
  ~ SqlParser.get[Option[Double]]("node0_flow")
  ~ SqlParser.get[Option[Double]]("node0_maxewt")
  ~ SqlParser.get[Option[Double]]("node0_maxlwt")
  ~ SqlParser.get[Option[Double]]("node0_maxflow")
  ~ SqlParser.get[Option[Double]]("node1_ewt")
  ~ SqlParser.get[Option[Double]]("node1_lwt")
  ~ SqlParser.get[Option[Double]]("node1_flow")
  ~ SqlParser.get[Option[Double]]("node1_maxewt")
  ~ SqlParser.get[Option[Double]]("node1_maxlwt")
  ~ SqlParser.get[Option[Double]]("node1_maxflow")
  ~ SqlParser.get[Option[Double]]("node2_ewt")
  ~ SqlParser.get[Option[Double]]("node2_lwt")
  ~ SqlParser.get[Option[Double]]("node2_flow")
  ~ SqlParser.get[Option[Double]]("node2_maxewt")
  ~ SqlParser.get[Option[Double]]("node2_maxlwt")
  ~ SqlParser.get[Option[Double]]("node2_maxflow")
  ~ SqlParser.get[Option[Double]]("node3_ewt")
  ~ SqlParser.get[Option[Double]]("node3_lwt")
  ~ SqlParser.get[Option[Double]]("node3_flow")
  ~ SqlParser.get[Option[Double]]("node3_maxewt")
  ~ SqlParser.get[Option[Double]]("node3_maxlwt")
  ~ SqlParser.get[Option[Double]]("node3_maxflow")
  ~ SqlParser.get[Option[Double]]("node4_ewt")
  ~ SqlParser.get[Option[Double]]("node4_lwt")
  ~ SqlParser.get[Option[Double]]("node4_flow")
  ~ SqlParser.get[Option[Double]]("node4_maxewt")
  ~ SqlParser.get[Option[Double]]("node4_maxlwt")
  ~ SqlParser.get[Option[Double]]("node4_maxflow")
  ~ SqlParser.get[Option[Double]]("node5_ewt")
  ~ SqlParser.get[Option[Double]]("node5_lwt")
  ~ SqlParser.get[Option[Double]]("node5_flow")
  ~ SqlParser.get[Option[Double]]("node5_maxewt")
  ~ SqlParser.get[Option[Double]]("node5_maxlwt")
  ~ SqlParser.get[Option[Double]]("node5_maxflow")
  ~ SqlParser.get[Option[Double]]("node6_ewt")
  ~ SqlParser.get[Option[Double]]("node6_lwt")
  ~ SqlParser.get[Option[Double]]("node6_flow")
  ~ SqlParser.get[Option[Double]]("node6_maxewt")
  ~ SqlParser.get[Option[Double]]("node6_maxlwt")
  ~ SqlParser.get[Option[Double]]("node6_maxflow")
  ~ SqlParser.get[Option[Double]]("node7_ewt")
  ~ SqlParser.get[Option[Double]]("node7_lwt")
  ~ SqlParser.get[Option[Double]]("node7_flow")
  ~ SqlParser.get[Option[Double]]("node7_maxewt")
  ~ SqlParser.get[Option[Double]]("node7_maxlwt")
  ~ SqlParser.get[Option[Double]]("node7_maxflow")
  ~ SqlParser.get[Option[Double]]("node8_ewt")
  ~ SqlParser.get[Option[Double]]("node8_lwt")
  ~ SqlParser.get[Option[Double]]("node8_flow")
  ~ SqlParser.get[Option[Double]]("node8_maxewt")
  ~ SqlParser.get[Option[Double]]("node8_maxlwt")
  ~ SqlParser.get[Option[Double]]("node8_maxflow")
  ~ SqlParser.get[Option[Double]]("node9_ewt")
  ~ SqlParser.get[Option[Double]]("node9_lwt")
  ~ SqlParser.get[Option[Double]]("node9_flow")
  ~ SqlParser.get[Option[Double]]("node9_maxewt")
  ~ SqlParser.get[Option[Double]]("node9_maxlwt")
  ~ SqlParser.get[Option[Double]]("node9_maxflow")
    ) map {
    case t~s~ge~gl~gf~gme~gml~gmf~ne0~nl0~nf0~nme0~nml0~nmf0~ne1~nl1~nf1~nme1~nml1~nmf1~ne2~nl2~nf2~nme2~nml2~nmf2~ne3~nl3~nf3~nme3~nml3~nmf3~ne4~nl4~nf4~nme4~nml4~nmf4~ne5~nl5~nf5~nme5~nml5~nmf5~ne6~nl6~nf6~nme6~nml6~nmf6~ne7~nl7~nf7~nme7~nml7~nmf7~ne8~nl8~nf8~nme8~nml8~nmf8~ne9~nl9~nf9~nme9~nml9~nmf9 => 
      var nodes: Seq[SiteNodeData] = Seq[SiteNodeData]() 
      
      if (ne0.isDefined && nl0.isDefined && nf0.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne0.get, nl0.get, nf0.get, nme0, nml0, nmf0))
      if (ne1.isDefined && nl1.isDefined && nf1.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne1.get, nl1.get, nf1.get, nme1, nml1, nmf1))
      if (ne2.isDefined && nl2.isDefined && nf2.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne2.get, nl2.get, nf2.get, nme2, nml2, nmf2))
      if (ne3.isDefined && nl3.isDefined && nf3.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne3.get, nl3.get, nf3.get, nme3, nml3, nmf3))
      if (ne4.isDefined && nl4.isDefined && nf4.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne4.get, nl4.get, nf4.get, nme4, nml4, nmf4))
      if (ne5.isDefined && nl5.isDefined && nf5.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne5.get, nl5.get, nf5.get, nme5, nml5, nmf5))
      if (ne6.isDefined && nl6.isDefined && nf6.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne6.get, nl6.get, nf6.get, nme6, nml6, nmf6))
      if (ne7.isDefined && nl7.isDefined && nf7.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne7.get, nl7.get, nf7.get, nme7, nml7, nmf7))
      if (ne8.isDefined && nl8.isDefined && nf8.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne8.get, nl8.get, nf8.get, nme8, nml8, nmf8))
      if (ne9.isDefined && nl9.isDefined && nf9.isDefined)
        nodes = nodes ++ Seq(SiteNodeData(ne9.get, nl9.get, nf9.get, nme9, nml9, nmf9))
      
      SiteData(t, s, SiteGHXData(ge, gl, gf, gme, gml, gmf), nodes) 
  }

  def all: Seq[SiteData] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM SiteData")
        .as(SiteData.mapper *)
    }
  }

  def get(timestamp: Long): Option[SiteData] = {
    DB.withConnection { implicit connection =>
      SQL("SELECT * FROM SiteData WHERE timestamp = {timestamp}")
        .on('timestamp -> timestamp).as(SiteData.mapper *).headOption
    }
  }

  def insertOrUpdate(siteData: SiteData) {
    this.insertOrUpdate(Seq(siteData))
  }

  def insertOrUpdate(siteDatas: Seq[SiteData]) {
    DB.withTransaction { implicit connection =>
      siteDatas.foreach { siteData =>
        val nodes: Seq[Some[SiteNodeData]] = siteData.nodes.map(Some(_))
        val params = Seq[NamedParameter](
          'sitename -> siteData.siteName,
          'timestamp -> siteData.timestamp,
          'ghx_ewt -> siteData.ghx.ewt,
          'ghx_lwt -> siteData.ghx.lwt,
          'ghx_flow -> siteData.ghx.flow,
          'node0_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](0, {case i: Int => None}).map(_.ewt),
          'node0_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](0, {case i: Int => None}).map(_.lwt),
          'node0_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](0, {case i: Int => None}).map(_.flow),
          'node1_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](1, {case i: Int => None}).map(_.ewt),
          'node1_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](1, {case i: Int => None}).map(_.lwt),
          'node1_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](1, {case i: Int => None}).map(_.flow),
          'node2_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](2, {case i: Int => None}).map(_.ewt),
          'node2_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](2, {case i: Int => None}).map(_.lwt),
          'node2_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](2, {case i: Int => None}).map(_.flow),
          'node3_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](3, {case i: Int => None}).map(_.ewt),
          'node3_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](3, {case i: Int => None}).map(_.lwt),
          'node3_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](3, {case i: Int => None}).map(_.flow),
          'node4_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](4, {case i: Int => None}).map(_.ewt),
          'node4_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](4, {case i: Int => None}).map(_.lwt),
          'node4_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](4, {case i: Int => None}).map(_.flow),
          'node5_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](5, {case i: Int => None}).map(_.ewt),
          'node5_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](5, {case i: Int => None}).map(_.lwt),
          'node5_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](5, {case i: Int => None}).map(_.flow),
          'node6_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](6, {case i: Int => None}).map(_.ewt),
          'node6_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](6, {case i: Int => None}).map(_.lwt),
          'node6_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](6, {case i: Int => None}).map(_.flow),
          'node7_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](7, {case i: Int => None}).map(_.ewt),
          'node7_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](7, {case i: Int => None}).map(_.lwt),
          'node7_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](7, {case i: Int => None}).map(_.flow),
          'node8_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](8, {case i: Int => None}).map(_.ewt),
          'node8_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](8, {case i: Int => None}).map(_.lwt),
          'node8_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](8, {case i: Int => None}).map(_.flow),
          'node9_ewt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](9, {case i: Int => None}).map(_.ewt),
          'node9_lwt  -> nodes.applyOrElse[Int, Option[SiteNodeData]](9, {case i: Int => None}).map(_.lwt),
          'node9_flow -> nodes.applyOrElse[Int, Option[SiteNodeData]](9, {case i: Int => None}).map(_.flow)
        )

        val updateStatement: String = "UPDATE SiteData SET " +
          "ghx_ewt = {ghx_ewt}, " +
          "ghx_lwt = {ghx_lwt}, " +
          "ghx_flow = {ghx_flow}, " +
          "node0_ewt  = {node0_ewt}, " +
          "node0_lwt  = {node0_lwt}, " +
          "node0_flow = {node0_flow}, " +
          "node1_ewt  = {node1_ewt}, " +
          "node1_lwt  = {node1_lwt}, " +
          "node1_flow = {node1_flow}, " +
          "node2_ewt  = {node2_ewt}, " +
          "node2_lwt  = {node2_lwt}, " +
          "node2_flow = {node2_flow}, " +
          "node3_ewt  = {node3_ewt}, " +
          "node3_lwt  = {node3_lwt}, " +
          "node3_flow = {node3_flow}, " +
          "node4_ewt  = {node4_ewt}, " +
          "node4_lwt  = {node4_lwt}, " +
          "node4_flow = {node4_flow}, " +
          "node5_ewt  = {node5_ewt}, " +
          "node5_lwt  = {node5_lwt}, " +
          "node5_flow = {node5_flow}, " +
          "node6_ewt  = {node6_ewt}, " +
          "node6_lwt  = {node6_lwt}, " +
          "node6_flow = {node6_flow}, " +
          "node7_ewt  = {node7_ewt}, " +
          "node7_lwt  = {node7_lwt}, " +
          "node7_flow = {node7_flow}, " +
          "node8_ewt  = {node8_ewt}, " +
          "node8_lwt  = {node8_lwt}, " +
          "node8_flow = {node8_flow}, " +
          "node9_ewt  = {node9_ewt}, " +
          "node9_lwt  = {node9_lwt}, " +
          "node9_flow = {node9_flow} " +
          "WHERE timestamp = {timestamp} AND sitename = {sitename}"

        val insertStatement: String = "INSERT INTO SiteData (" +
          "timestamp, " +
          "sitename, " +
          "ghx_ewt, " +
          "ghx_lwt, " +
          "ghx_flow, " +
          "node0_ewt, " +
          "node0_lwt, " +
          "node0_flow, " +
          "node1_ewt, " +
          "node1_lwt, " +
          "node1_flow, " +
          "node2_ewt, " +
          "node2_lwt, " +
          "node2_flow, " +
          "node3_ewt, " +
          "node3_lwt, " +
          "node3_flow, " +
          "node4_ewt, " +
          "node4_lwt, " +
          "node4_flow, " +
          "node5_ewt, " +
          "node5_lwt, " +
          "node5_flow, " +
          "node6_ewt, " +
          "node6_lwt, " +
          "node6_flow, " +
          "node7_ewt, " +
          "node7_lwt, " +
          "node7_flow, " +
          "node8_ewt, " +
          "node8_lwt, " +
          "node8_flow, " +
          "node9_ewt, " +
          "node9_lwt, " +
          "node9_flow " +
          ") " +
          "VALUES (" +
          "{timestamp}, " +
          "{sitename}, " +
          "{ghx_ewt}, " +
          "{ghx_lwt}, " +
          "{ghx_flow}, " +
          "{node0_ewt}, " +
          "{node0_lwt}, " +
          "{node0_flow}, " +
          "{node1_ewt}, " +
          "{node1_lwt}, " +
          "{node1_flow}, " +
          "{node2_ewt}, " +
          "{node2_lwt}, " +
          "{node2_flow}, " +
          "{node3_ewt}, " +
          "{node3_lwt}, " +
          "{node3_flow}, " +
          "{node4_ewt}, " +
          "{node4_lwt}, " +
          "{node4_flow}, " +
          "{node5_ewt}, " +
          "{node5_lwt}, " +
          "{node5_flow}, " +
          "{node6_ewt}, " +
          "{node6_lwt}, " +
          "{node6_flow}, " +
          "{node7_ewt}, " +
          "{node7_lwt}, " +
          "{node7_flow}, " +
          "{node8_ewt}, " +
          "{node8_lwt}, " +
          "{node8_flow}, " +
          "{node9_ewt}, " +
          "{node9_lwt}, " +
          "{node9_flow} " +
          ")"

        if (SQL(updateStatement).on(params: _*).executeUpdate() == 0) {
          SQL(insertStatement).on(params: _*).executeInsert()
        }
      }

      val min: Long = siteDatas.map(_.timestamp).min

      SQL("SELECT * FROM SiteData WHERE timestamp >= {min}").on('min -> min).as(SiteData.mapper *).foreach { data =>
        SQL("UPDATE SiteData SET " +
          "ghx_maxewt    = (SELECT MAX(ghx_ewt)    FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "ghx_maxlwt    = (SELECT MAX(ghx_lwt)    FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "ghx_maxflow   = (SELECT MAX(ghx_flow)   FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node0_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node0_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node0_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node1_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node1_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node1_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node2_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node2_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node2_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node3_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node3_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node3_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node4_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node4_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node4_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node5_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node5_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node5_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node6_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node6_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node6_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node7_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node7_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node7_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node8_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node8_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node8_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node9_maxewt  = (SELECT MAX(node0_ewt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node9_maxlwt  = (SELECT MAX(node0_lwt)  FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename}), " +
          "node9_maxflow = (SELECT MAX(node0_flow) FROM SiteData WHERE timestamp <= {timestamp} AND sitename = {sitename})  " +
          "WHERE timestamp = {timestamp} AND sitename = {sitename}").on('timestamp -> data.timestamp, 'sitename -> data.siteName).executeUpdate()
      }
    }
  }

  def delete(siteData: SiteData) {
    DB.withConnection { implicit connection =>
      SQL("DELETE FROM SiteData WHERE timestamp = {timestamp} AND sitename = {sitename}")
        .on('timestamp -> siteData.timestamp, 'sitename -> siteData.siteName).executeUpdate()
    }
  }
}