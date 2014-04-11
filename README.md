# EM2 Dashboard

### Setup
1. Download and install [Play Framework](http://www.playframework.com/download)
2. Execute `play run` in the working directory
3. Go to [http://localhost:9000](http://localhost:9000)

### Database Configuration
Add the following environment variables:

- `DATABASE_URL=jdbc:h2:mem:play;MODE=PostgreSQL`
- `DATABASE_DRIVER=org.h2.Driver`

### Helpful Links
- [Using the Play CLI](http://www.playframework.com/documentation/2.2.x/Build)
- [Routing Requests](http://www.playframework.com/documentation/2.2.x/ScalaRouting)
- [Where and what to do with static assets](http://www.playframework.com/documentation/2.2.x/Assets)