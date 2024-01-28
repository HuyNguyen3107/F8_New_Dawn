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
-- Name: devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.devices (
    id integer NOT NULL,
    browser character varying(100) NOT NULL,
    operating_system character varying(1000) NOT NULL,
    device_type character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    status boolean DEFAULT false,
    user_agent character varying(5000) NOT NULL
);


ALTER TABLE public.devices OWNER TO postgres;

--
-- Name: devices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.devices ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.devices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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
-- Name: users_devices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_devices (
    id integer NOT NULL,
    user_id integer NOT NULL,
    device_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users_devices OWNER TO postgres;

--
-- Name: users_devices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_devices ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_devices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


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
-- Data for Name: devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.devices (id, browser, operating_system, device_type, created_at, updated_at, status, user_agent) FROM stdin;
7	Chrome	Windows	desktop	2024-01-27 18:13:37.736+07	2024-01-27 23:17:40.759+07	f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
9	Opera	Windows	desktop	2024-01-27 22:18:44.787+07	2024-01-27 23:17:40.76+07	f	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0
\.


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
11	Mindmap Flow	mindmap@gmail.com	$2b$10$Q0MKlmlbp.Y3AwVuzqOyBOSVy6orHeUFj1cPdl1IF1OZ3wJSz2EIe	f	2024-01-27 22:53:16.537+07	2024-01-27 22:53:16.537+07
2	Luu Anh Quan	anhquan2211@gmail.com	$2b$10$OV.I8tnuiqM7GJWlkQy5DO31Kl1DdDY8G5woIPddyHAqlEXAkj.b.	t	2024-01-18 21:10:41.960252+07	2024-01-27 23:17:40.753+07
9	Do Tuan Minh	minhptit@gmail.com	$2b$10$0W.Dx0oPatM8ZkFnpdesGe6C8KcyjKgEDDiX8NorPv1CTcGS9WImC	f	2024-01-20 13:59:44.047+07	2024-01-20 14:00:01.93+07
10	NGUYEN HUY	asdsad123@gmail.com	$2b$10$9PVe.Mj0OJtZklkWMcWM9OE1U77o.JOsb6ou2JCSQd1mmbzA4EBWC	f	2024-01-27 18:00:14.604+07	2024-01-27 18:00:14.604+07
\.


--
-- Data for Name: users_devices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_devices (id, user_id, device_id, created_at, updated_at) FROM stdin;
1	2	7	2024-01-27 18:13:37.748+07	2024-01-27 18:13:37.748+07
3	2	9	2024-01-27 22:18:44.801+07	2024-01-27 22:18:44.801+07
\.


--
-- Name: devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.devices_id_seq', 9, true);


--
-- Name: users_devices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_devices_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: devices devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.devices
    ADD CONSTRAINT devices_pkey PRIMARY KEY (id);


--
-- Name: users_devices users_devices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_devices
    ADD CONSTRAINT users_devices_pkey PRIMARY KEY (id);


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
-- Name: users_devices users_devices_device_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_devices
    ADD CONSTRAINT users_devices_device_id_foreign FOREIGN KEY (device_id) REFERENCES public.devices(id) NOT VALID;


--
-- Name: users_devices users_devices_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_devices
    ADD CONSTRAINT users_devices_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

