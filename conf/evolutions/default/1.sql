# SiteData schema

# --- !Ups

CREATE TABLE SiteData (
    id       BIGSERIAL PRIMARY KEY,
    sitename TEXT      NOT NULL,
    mockdata BOOLEAN   NOT NULL,
    date     TIMESTAMP NOT NULL
);

CREATE INDEX SiteData_sitename ON SiteData(sitename);
CREATE INDEX SiteData_date ON SiteData(date);
CREATE INDEX SiteData_mockdata ON SiteData(mockdata);

# --- !Downs

DROP TABLE SiteData;