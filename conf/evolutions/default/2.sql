# Event schema

# --- !Ups

CREATE TABLE Event (
    id       BIGSERIAL                PRIMARY KEY,
    date     TIMESTAMP WITH TIME ZONE NOT NULL,
    type     TEXT                     NOT NULL,
    payload  BYTEA                    NOT NULL
);

CREATE INDEX Event_date ON Event(date);
CREATE INDEX Event_type ON Event(type);

# --- !Downs

DROP TABLE Event;