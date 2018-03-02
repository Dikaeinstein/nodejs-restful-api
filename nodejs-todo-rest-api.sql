--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todo_items; Type: TABLE; Schema: public; Owner: dikaeinstein
--

CREATE TABLE todo_items (
    id bigint NOT NULL,
    content character varying NOT NULL,
    complete boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    todoid integer NOT NULL
);


ALTER TABLE todo_items OWNER TO dikaeinstein;

--
-- Name: todo_items_id_seq; Type: SEQUENCE; Schema: public; Owner: dikaeinstein
--

CREATE SEQUENCE todo_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todo_items_id_seq OWNER TO dikaeinstein;

--
-- Name: todo_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dikaeinstein
--

ALTER SEQUENCE todo_items_id_seq OWNED BY todo_items.id;


--
-- Name: todos; Type: TABLE; Schema: public; Owner: dikaeinstein
--

CREATE TABLE todos (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp(6) without time zone DEFAULT now() NOT NULL,
    updated_at timestamp(6) without time zone,
    user_id integer NOT NULL
);


ALTER TABLE todos OWNER TO dikaeinstein;

--
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: dikaeinstein
--

CREATE SEQUENCE todos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE todos_id_seq OWNER TO dikaeinstein;

--
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dikaeinstein
--

ALTER SEQUENCE todos_id_seq OWNED BY todos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dikaeinstein
--

CREATE TABLE users (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE users OWNER TO dikaeinstein;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dikaeinstein
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO dikaeinstein;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dikaeinstein
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: todo_items id; Type: DEFAULT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY todo_items ALTER COLUMN id SET DEFAULT nextval('todo_items_id_seq'::regclass);


--
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY todos ALTER COLUMN id SET DEFAULT nextval('todos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: todo_items todo_items_pkey; Type: CONSTRAINT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY todo_items
    ADD CONSTRAINT todo_items_pkey PRIMARY KEY (id);


--
-- Name: todos todos_pkey; Type: CONSTRAINT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY todos
    ADD CONSTRAINT todos_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: fki_todoid; Type: INDEX; Schema: public; Owner: dikaeinstein
--

CREATE INDEX fki_todoid ON todo_items USING btree (todoid);


--
-- Name: todo_items todoid; Type: FK CONSTRAINT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY todo_items
    ADD CONSTRAINT todoid FOREIGN KEY (todoid) REFERENCES todos(id) ON DELETE CASCADE;


--
-- Name: todos user_id; Type: FK CONSTRAINT; Schema: public; Owner: dikaeinstein
--

ALTER TABLE ONLY todos
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

