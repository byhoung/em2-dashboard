package controllers

import java.io.File
import java.util.Calendar
import java.util.concurrent.TimeUnit._

import models.SiteData
import org.specs2.mutable.Specification
import play.api.libs.json.Json
import play.api.libs.ws.WS
import play.api.test.{Helpers, WithServer}

class ApplicationTest extends Specification {

  implicit val timeout = akka.util.Timeout(5, SECONDS)

  "The EM2 Dashboard" should {
    "Allow post to /trillium/data" in new WithServer {
      SiteData.all.foreach { data =>
        SiteData.delete(data)
      }

      SiteData.all must beEmpty

      val file = new File(getClass.getClassLoader.getResource("resources/Trillium-115.csv").toURI)
      file must not beNull

      val calendar = Calendar.getInstance()
      calendar.set(2014, 1, 1, 0, 0, 0)

      private val lines: Iterator[String] = scala.io.Source.fromFile(file).getLines()
      val data = lines.drop(2).map { line =>
        val split: Array[String] = line.split(",")
        val currentHour: Long = split(1).toLong
        val timestamp: Long = (currentHour * 60 * 60 * 1000) + calendar.getTimeInMillis
        SiteIncomingJson(timestamp, Seq(
          SimpleInNode("ghx", split(2).toDouble, split(4).toDouble, split(3).toDouble)
        ))
      }.toSeq

      val ingestSize = 54

      data.take(ingestSize).grouped(5).toSeq.foreach { d =>
        val response = Helpers.await(
          WS.url("http://localhost:19001/trillium/data")
            .withHeaders("token" -> "AAAAB3NzaC1yc2EAAAADAQABAAABAQC4wIB4s3oODQ97rzMEdADDsbVxUvmsUSmkBy00ht/SdEzFfI4YBb5v+uN7OecdU4QUrMEce1cjku9X9WrImNJrcOrFqDlhveWOTQhf66jQbcJtfQ90ohRV44yFUfulgMg+f5uPvynf2zlFLzrZqD5jovBsK54XXUayVxkkk96Vhu6STt5EXtTsRaRQ0WVaWs5FsI8ivOA2PlGdbnBPNaVa/2Slf0CP9UnuprDjmYdGbHCbaweKYXi2R+n3KMAEVqagb1qtPCFo7nDBF1rLZEu0N39Oj7Q6Ed3iFiETkNB2cmfwrCAadvJRfJL5ElfZSlw5EDYfGH1KGj6lXa5midBr")
            .post(Json.toJson(d)))
        response.body must beEqualTo("")
        response.status must beEqualTo(202)
      }

      SiteData.all.size must beEqualTo(ingestSize)
    }
  }
}
