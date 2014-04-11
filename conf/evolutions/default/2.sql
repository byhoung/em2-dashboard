# DataProvider schema

# --- !Ups

CREATE TABLE DataProvider (
    id       BIGSERIAL PRIMARY KEY,
    name     TEXT      NOT NULL,
    token    TEXT      NOT NULL
);

CREATE INDEX DataProvider_name ON DataProvider(name);

INSERT INTO DataProvider (name, token) VALUES ('Sean Freitag', 'AAAAB3NzaC1yc2EAAAADAQABAAABAQC4wIB4s3oODQ97rzMEdADDsbVxUvmsUSmkBy00ht/SdEzFfI4YBb5v+uN7OecdU4QUrMEce1cjku9X9WrImNJrcOrFqDlhveWOTQhf66jQbcJtfQ90ohRV44yFUfulgMg+f5uPvynf2zlFLzrZqD5jovBsK54XXUayVxkkk96Vhu6STt5EXtTsRaRQ0WVaWs5FsI8ivOA2PlGdbnBPNaVa/2Slf0CP9UnuprDjmYdGbHCbaweKYXi2R+n3KMAEVqagb1qtPCFo7nDBF1rLZEu0N39Oj7Q6Ed3iFiETkNB2cmfwrCAadvJRfJL5ElfZSlw5EDYfGH1KGj6lXa5midBr');

# --- !Downs

DROP TABLE DataProvider;