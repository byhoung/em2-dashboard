# SiteData schema

# --- !Ups

CREATE TABLE SiteData (
    id BIGSERIAL PRIMARY KEY,
    sitename TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX SiteData_sitename ON SiteData(sitename);
CREATE INDEX SiteData_date ON SiteData(date);

# --- !Downs

DROP TABLE SiteData;