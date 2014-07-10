# Initial schema

# --- !Ups

CREATE TABLE SiteData (
    timestamp     BIGINT           NOT NULL,
    sitename      VARCHAR(24)      NOT NULL,
    ghx_ewt       double precision NOT NULL,
    ghx_lwt       double precision NOT NULL,
    ghx_flow      double precision NOT NULL,
    ghx_maxewt    double precision,
    ghx_maxlwt    double precision,
    ghx_maxflow   double precision,
    node0_ewt     double precision,
    node0_lwt     double precision,
    node0_flow    double precision,
    node0_maxewt  double precision,
    node0_maxlwt  double precision,
    node0_maxflow double precision,
    PRIMARY KEY (timestamp, sitename)
);

CREATE INDEX SiteData_ghx_ewt  ON SiteData(ghx_ewt);
CREATE INDEX SiteData_ghx_lwt  ON SiteData(ghx_lwt);
CREATE INDEX SiteData_ghx_flow ON SiteData(ghx_flow);

CREATE TABLE DataProvider (
    id       BIGSERIAL PRIMARY KEY,
    name     TEXT      NOT NULL,
    token    TEXT      NOT NULL
);

CREATE INDEX DataProvider_token ON DataProvider(token);

INSERT INTO DataProvider (name, token) VALUES ('Sean Freitag', 'AAAAB3NzaC1yc2EAAAADAQABAAABAQC4wIB4s3oODQ97rzMEdADDsbVxUvmsUSmkBy00ht/SdEzFfI4YBb5v+uN7OecdU4QUrMEce1cjku9X9WrImNJrcOrFqDlhveWOTQhf66jQbcJtfQ90ohRV44yFUfulgMg+f5uPvynf2zlFLzrZqD5jovBsK54XXUayVxkkk96Vhu6STt5EXtTsRaRQ0WVaWs5FsI8ivOA2PlGdbnBPNaVa/2Slf0CP9UnuprDjmYdGbHCbaweKYXi2R+n3KMAEVqagb1qtPCFo7nDBF1rLZEu0N39Oj7Q6Ed3iFiETkNB2cmfwrCAadvJRfJL5ElfZSlw5EDYfGH1KGj6lXa5midBr');

# --- !Downs

DROP TABLE DataProvider;
DROP TABLE SiteData;