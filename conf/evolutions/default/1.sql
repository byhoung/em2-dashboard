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
    node1_ewt     double precision,
    node1_lwt     double precision,
    node1_flow    double precision,
    node1_maxewt  double precision,
    node1_maxlwt  double precision,
    node1_maxflow double precision,
    node2_ewt     double precision,
    node2_lwt     double precision,
    node2_flow    double precision,
    node2_maxewt  double precision,
    node2_maxlwt  double precision,
    node2_maxflow double precision,
    node3_ewt     double precision,
    node3_lwt     double precision,
    node3_flow    double precision,
    node3_maxewt  double precision,
    node3_maxlwt  double precision,
    node3_maxflow double precision,
    node4_ewt     double precision,
    node4_lwt     double precision,
    node4_flow    double precision,
    node4_maxewt  double precision,
    node4_maxlwt  double precision,
    node4_maxflow double precision,
    node5_ewt     double precision,
    node5_lwt     double precision,
    node5_flow    double precision,
    node5_maxewt  double precision,
    node5_maxlwt  double precision,
    node5_maxflow double precision,
    node6_ewt     double precision,
    node6_lwt     double precision,
    node6_flow    double precision,
    node6_maxewt  double precision,
    node6_maxlwt  double precision,
    node6_maxflow double precision,
    node7_ewt     double precision,
    node7_lwt     double precision,
    node7_flow    double precision,
    node7_maxewt  double precision,
    node7_maxlwt  double precision,
    node7_maxflow double precision,
    node8_ewt     double precision,
    node8_lwt     double precision,
    node8_flow    double precision,
    node8_maxewt  double precision,
    node8_maxlwt  double precision,
    node8_maxflow double precision,
    node9_ewt     double precision,
    node9_lwt     double precision,
    node9_flow    double precision,
    node9_maxewt  double precision,
    node9_maxlwt  double precision,
    node9_maxflow double precision,
    PRIMARY KEY (timestamp, sitename)
);

CREATE INDEX SiteData_ghx_ewt    ON SiteData(ghx_ewt);
CREATE INDEX SiteData_ghx_lwt    ON SiteData(ghx_lwt);
CREATE INDEX SiteData_ghx_flow   ON SiteData(ghx_flow);
CREATE INDEX SiteData_node0_ewt  ON SiteData(node0_ewt);
CREATE INDEX SiteData_node0_lwt  ON SiteData(node0_lwt);
CREATE INDEX SiteData_node0_flow ON SiteData(node0_flow);
CREATE INDEX SiteData_node1_ewt  ON SiteData(node1_ewt);
CREATE INDEX SiteData_node1_lwt  ON SiteData(node1_lwt);
CREATE INDEX SiteData_node1_flow ON SiteData(node1_flow);
CREATE INDEX SiteData_node2_ewt  ON SiteData(node2_ewt);
CREATE INDEX SiteData_node2_lwt  ON SiteData(node2_lwt);
CREATE INDEX SiteData_node2_flow ON SiteData(node2_flow);
CREATE INDEX SiteData_node3_ewt  ON SiteData(node3_ewt);
CREATE INDEX SiteData_node3_lwt  ON SiteData(node3_lwt);
CREATE INDEX SiteData_node3_flow ON SiteData(node3_flow);
CREATE INDEX SiteData_node4_ewt  ON SiteData(node4_ewt);
CREATE INDEX SiteData_node4_lwt  ON SiteData(node4_lwt);
CREATE INDEX SiteData_node4_flow ON SiteData(node4_flow);
CREATE INDEX SiteData_node5_ewt  ON SiteData(node5_ewt);
CREATE INDEX SiteData_node5_lwt  ON SiteData(node5_lwt);
CREATE INDEX SiteData_node5_flow ON SiteData(node5_flow);
CREATE INDEX SiteData_node6_ewt  ON SiteData(node6_ewt);
CREATE INDEX SiteData_node6_lwt  ON SiteData(node6_lwt);
CREATE INDEX SiteData_node6_flow ON SiteData(node6_flow);
CREATE INDEX SiteData_node7_ewt  ON SiteData(node7_ewt);
CREATE INDEX SiteData_node7_lwt  ON SiteData(node7_lwt);
CREATE INDEX SiteData_node7_flow ON SiteData(node7_flow);
CREATE INDEX SiteData_node8_ewt  ON SiteData(node8_ewt);
CREATE INDEX SiteData_node8_lwt  ON SiteData(node8_lwt);
CREATE INDEX SiteData_node8_flow ON SiteData(node8_flow);
CREATE INDEX SiteData_node9_ewt  ON SiteData(node9_ewt);
CREATE INDEX SiteData_node9_lwt  ON SiteData(node9_lwt);
CREATE INDEX SiteData_node9_flow ON SiteData(node9_flow);

CREATE TABLE DataProvider (
    id       BIGSERIAL    PRIMARY KEY,
    name     VARCHAR(255) NOT NULL,
    token    VARCHAR(372) NOT NULL
);

CREATE INDEX DataProvider_token ON DataProvider(token);

INSERT INTO DataProvider (name, token) VALUES ('Sean Freitag', 'AAAAB3NzaC1yc2EAAAADAQABAAABAQC4wIB4s3oODQ97rzMEdADDsbVxUvmsUSmkBy00ht/SdEzFfI4YBb5v+uN7OecdU4QUrMEce1cjku9X9WrImNJrcOrFqDlhveWOTQhf66jQbcJtfQ90ohRV44yFUfulgMg+f5uPvynf2zlFLzrZqD5jovBsK54XXUayVxkkk96Vhu6STt5EXtTsRaRQ0WVaWs5FsI8ivOA2PlGdbnBPNaVa/2Slf0CP9UnuprDjmYdGbHCbaweKYXi2R+n3KMAEVqagb1qtPCFo7nDBF1rLZEu0N39Oj7Q6Ed3iFiETkNB2cmfwrCAadvJRfJL5ElfZSlw5EDYfGH1KGj6lXa5midBr');

# --- !Downs

DROP TABLE DataProvider;
DROP TABLE SiteData;