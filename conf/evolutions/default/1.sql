# Trillium schema

# --- !Ups

CREATE TABLE Trillium (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    hour bigint(20) NOT NULL,
    PRIMARY KEY (id)
);

# --- !Downs

DROP TABLE Trillium;