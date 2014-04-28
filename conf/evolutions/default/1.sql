# SiteData schema

# --- !Ups

CREATE TABLE SiteData (
    id       BIGSERIAL PRIMARY KEY,
    sitename TEXT      NOT NULL,
    date     BIGINT    NOT NULL,
    data     TEXT      NOT NULL
);

CREATE INDEX SiteData_sitename ON SiteData(sitename);
CREATE INDEX SiteData_date ON SiteData(date);

# --- !Downs

DROP TABLE SiteData;