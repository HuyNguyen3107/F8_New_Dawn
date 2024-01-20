--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(100) NOT NULL,
    status boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, status, created_at, updated_at) FROM stdin;
1	Ta Hoang An	hoanganit19@gmail.com\n	$2b$10$jXjabTNmpS6IlfrWHCc9b.IH0QuFlKWCV86Mrrr2/tObkPFafAB.2	f	2024-01-18 21:10:41.960252+07	2024-01-18 21:10:41.960252+07
3	Nguyen Minh Nhat Duong	nguyenduong@gmail.com	$2b$10$xk3fo2DJbExtWurCBsOeT.LUKsZ0DlCETfdzSW7KuUD5YcQC5c71C	f	2024-01-18 21:10:41.960252+07	2024-01-18 21:10:41.960252+07
4	Nguyen Manh Huy	huyne@gmail.com\n	$2b$10$t7sS5zXbDH5ZmOn4jTCdhuvz9pCGU7AwVsCCqnKIi2X7Y42fpaWoG	f	2024-01-18 21:10:41.960252+07	2024-01-18 21:10:41.960252+07
5	Le Duc Nam	nambe@gmail.com	$2b$10$vTuFoP/3gIZwmLSxjGPruOfFSiliN0UZZN7QZQpxH56W4xnr0a91W\n	f	2024-01-18 21:10:41.960252+07	2024-01-18 21:10:41.960252+07
6	Dang Ngoc Khai	abertkhai@gmail.com	$2b$10$UhYtxLzPYSxcWL.aZhkZv.dzD8PW9y2CK0A6Qvj9tZKBPxhQ9FJVa	f	2024-01-18 21:10:41.960252+07	2024-01-18 21:10:41.960252+07
7	NGUYEN MANH HUY	levi2k3ds@gmail.com	$2b$10$8qyk/h.JlfZUlU3s.O5Yf.c0SXBEjuX93TKOgyKhV/CkOqt0WN5Hm	f	2024-01-19 18:02:20.978+07	2024-01-19 18:02:20.978+07
8	NGUYEN MANH HUY	john444@mail.com	$2b$10$UCghwjnUSHXCB53HduuVl.23H7Y6YiuC4fj5y1Aj4nTnhyD/4kxcy	f	2024-01-20 09:57:17.285+07	2024-01-20 09:57:17.285+07
2	Luu Anh Quan	anhquan2211@gmail.com	$2b$10$BiQyehdO/AiGkM397W0JmuakdFgHC16sP6wmcI7twKj1H.fJTnXl2	f	2024-01-18 21:10:41.960252+07	2024-01-20 13:58:55.51+07
9	Do Tuan Minh	minhptit@gmail.com	$2b$10$0W.Dx0oPatM8ZkFnpdesGe6C8KcyjKgEDDiX8NorPv1CTcGS9WImC	f	2024-01-20 13:59:44.047+07	2024-01-20 14:00:01.93+07
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_id_primary; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_primary PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

