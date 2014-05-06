# SiteData schema

# --- !Ups

CREATE TABLE SiteData (
    timestamp BIGINT    NOT NULL,
    sitename  TEXT      NOT NULL,
    payload   TEXT      NOT NULL,
    PRIMARY KEY (timestamp, sitename)
);

# --- !Downs

DROP TABLE SiteData;