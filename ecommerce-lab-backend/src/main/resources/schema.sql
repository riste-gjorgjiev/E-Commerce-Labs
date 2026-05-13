CREATE TABLE IF NOT EXISTS countries (
                                         id        BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         name      VARCHAR(100) NOT NULL UNIQUE,
    continent VARCHAR(50)  NOT NULL
    );

CREATE TABLE IF NOT EXISTS authors (
                                       id         BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    name       VARCHAR(100) NOT NULL,
    surname    VARCHAR(100) NOT NULL,
    country_id BIGINT NOT NULL REFERENCES countries(id)
    );

CREATE TABLE IF NOT EXISTS books (
                                      id               BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      created_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP    NOT NULL DEFAULT NOW(),
    name             VARCHAR(255) NOT NULL,
    category         VARCHAR(50)  NOT NULL,
    author_id        BIGINT       NOT NULL REFERENCES authors(id),
    state            VARCHAR(10)  NOT NULL,
    available_copies INTEGER      NOT NULL CHECK (available_copies >= 0)
    );

CREATE TABLE IF NOT EXISTS shop_users (
                                         id       BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         username VARCHAR(150) NOT NULL UNIQUE,
                                         password VARCHAR(255) NOT NULL,
                                         role     VARCHAR(50)  NOT NULL
    );
