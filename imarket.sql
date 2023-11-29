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
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order-product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order-product" (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE public."order-product" OWNER TO postgres;

--
-- Name: order_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_order_id_seq OWNER TO postgres;

--
-- Name: order_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_order_id_seq OWNED BY public."order".order_id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id integer NOT NULL,
    name character varying(100) NOT NULL,
    supplier_id integer,
    type_id integer,
    price numeric(12,2) NOT NULL,
    description text
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_product_id_seq OWNER TO postgres;

--
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product.product_id;


--
-- Name: product_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_type (
    type_id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.product_type OWNER TO postgres;

--
-- Name: product_type_product_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_type_product_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_type_product_type_id_seq OWNER TO postgres;

--
-- Name: product_type_product_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_type_product_type_id_seq OWNED BY public.product_type.type_id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    role_id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_role_id_seq OWNER TO postgres;

--
-- Name: role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;


--
-- Name: shopping_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_cart (
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE public.shopping_cart OWNER TO postgres;

--
-- Name: supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier (
    supplier_id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.supplier OWNER TO postgres;

--
-- Name: supplier_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supplier_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.supplier_supplier_id_seq OWNER TO postgres;

--
-- Name: supplier_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supplier_supplier_id_seq OWNED BY public.supplier.supplier_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    mid_name character varying(50),
    email character varying(50) NOT NULL,
    password_hash character varying(60) NOT NULL,
    role_id integer DEFAULT 2 NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_user_id_seq OWNER TO postgres;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;


--
-- Name: order order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN order_id SET DEFAULT nextval('public.order_order_id_seq'::regclass);


--
-- Name: product product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN product_id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- Name: product_type type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_type ALTER COLUMN type_id SET DEFAULT nextval('public.product_type_product_type_id_seq'::regclass);


--
-- Name: role role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);


--
-- Name: supplier supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier ALTER COLUMN supplier_id SET DEFAULT nextval('public.supplier_supplier_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.user_user_id_seq'::regclass);


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (order_id, user_id, date) FROM stdin;
\.


--
-- Data for Name: order-product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order-product" (order_id, product_id, amount) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (product_id, name, supplier_id, type_id, price, description) FROM stdin;
1	iPhone 13 Pro Max	1	1	99990.00	Новейший смартфон с процессором A15 Bionic и улучшенной камерой.
2	Samsung Galaxy Z Fold3	2	1	16990.00	Складной смартфон с большим внутренним экраном и S Pen поддержкой.
3	Sony A8H 65" 4K OLED Smart TV	3	4	22990.00	4K OLED телевизор с поддержкой HDR и Acoustic Surface Audio.
4	LG Gram 17" ноутбук	4	2	14990.00	Легкий и мощный ноутбук с длительным временем работы от батареи.
5	Huawei MateBook X Pro	5	2	13990.00	Тонкий ноутбук с высоким разрешением экрана и процессором Intel Core i7.
6	Dell XPS 13	6	2	11990.00	Ноутбук с ультратонким корпусом, процессором Intel Core i5 и 4K Ultra HD дисплеем.
7	HP OfficeJet Pro 9025	7	7	32990.00	Цветной принтер с возможностью двусторонней печати и автоматической подачей документов.
8	Lenovo Tab P11 Pro	8	3	49990.00	Планшет с OLED-экраном и мощным процессором Snapdragon 730G.
9	ASUS ROG Phone 5	9	1	99990.00	Игровой смартфон с высоким обновлением экрана, водяным охлаждением и мощным процессором.
10	Xiaomi Mi 11 Ultra	10	1	10990.00	Смартфон с керамическим корпусом, большим AMOLED экраном и тройной камерой высокого разрешения.
11	MacBook Pro 14"	1	2	18990.00	Мощный ноутбук с процессором M1 Pro, высококачественным дисплеем и долгим временем автономной работы.
12	Samsung QN90A 85" Neo QLED Smart TV	2	4	39990.00	Крупногабаритный телевизор с чистыми цветами и технологией OTS+ для улучшенной звуковой картины.
13	Sony Xperia 1 III	3	1	12990.00	Смартфон с профессиональной камерой, 4K OLED экраном и мощным процессором.
14	LG UltraGear 27GP950 27" 4K Gaming Monitor	4	5	89990.00	4K игровой монитор с высокой частотой обновления и поддержкой NVIDIA G-Sync.
15	Huawei Watch 3 Pro	5	6	34990.00	Умные часы с длительным временем работы и множеством фитнес-функций.
16	Dell Alienware m15 Ryzen Edition	6	2	16990.00	Игровой ноутбук с процессором AMD Ryzen и NVIDIA GeForce RTX графикой.
17	HP Sprocket Portable Photo Printer	7	7	9990.00	Карманный принтер для моментальной печати фотографий с телефона.
18	Lenovo Yoga Tab 13	8	3	59990.00	Планшет с уникальным встроенным стендом и 2K дисплеем.
19	ASUS ROG Strix XG27UQ 27" 4K Gaming Monitor	9	5	69990.00	27-дюймовый игровой монитор с DisplayHDR 400 и AMD FreeSync Premium Pro.
20	Xiaomi Mi Robot Vacuum-Mop P	10	6	29990.00	Робот-пылесос с функцией мытья пола, автоматической зарядкой и тройной системой навигации.
21	iPad Air (2022)	1	3	59990.00	Планшет с процессором M1, поддержкой Apple Pencil и доступом к более чем миллионам приложений в App Store.
22	Samsung Odyssey G9 49" Gaming Monitor	2	5	14990.00	Игровой монитор с ультрашироким изогнутым экраном, частотой обновления 240 Гц и QLED технологией.
23	Sony WF-1000XM4 Wireless Earbuds	3	6	27990.00	Беспроводные наушники с технологией шумоподавления, высоким качеством звука и длительным временем работы от батареи.
24	LG C1 55" 4K OLED Smart TV	4	4	16990.00	55-дюймовый OLED телевизор с поддержкой Dolby Vision IQ и AI Picture Pro.
25	Huawei MateStation X	5	2	12990.00	Ультратонкий настольный компьютер с процессором AMD Ryzen и интегрированным дискретным графическим процессором.
26	Dell UltraSharp U4320Q 42.5" 4K Monitor	6	5	89990.00	Монитор с ультравысоким разрешением для профессионального использования и удобной мультитаскинговой функцией Picture-by-Picture (PbP).
27	HP ENVY 6055 Wireless All-in-One Printer	7	7	12990.00	Беспроводное устройство "все-в-одном" для печати, сканирования и копирования с автоматической двусторонней печатью.
28	Lenovo Legion Y740 Gaming Laptop	8	2	17990.00	Игровой ноутбук с высокой производительностью, технологией NVIDIA GeForce и системой охлаждения Legion Coldfront.
29	ASUS ZenBook 14	9	2	99990.00	Компактный ноутбук с экраном NanoEdge и производительным процессором Intel Core i7.
30	Xiaomi Mi Smart Band 6	10	6	5990.00	Фитнес-браслет с большим AMOLED экраном, множеством трекеров активности и долгим временем работы от батареи.
31	test	\N	\N	123.00	\N
\.


--
-- Data for Name: product_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_type (type_id, name) FROM stdin;
1	Смартфоны
2	Ноутбуки
3	Планшеты
4	Телевизоры
5	Видеокамеры
6	Умные устройства
7	Принтеры и сканеры
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (role_id, name) FROM stdin;
1	Администратор
2	Покупатель
\.


--
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_cart (user_id, product_id, amount) FROM stdin;
3	1	1
3	4	123
3	20	4
\.


--
-- Data for Name: supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplier (supplier_id, name) FROM stdin;
1	Apple
2	Samsung
3	Sony
4	LG
5	Huawei
6	Dell
7	HP
8	Lenovo
9	ASUS
10	Xiaomi
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, first_name, last_name, mid_name, email, password_hash, role_id) FROM stdin;
2	Test	Testov	Testovich	tes@gmail.com	$2a$07$nLu1.YcPRsZCPqga6U9D6.H8c5qFrNCUAdr8YLNH6uV7OzvMYHvwe	2
4	\N	\N	\N	12304@gmail.com	$2a$07$icBieLsqTIQfFRtE6M7AkOoD7JOy/VSl4UE7r/FAducgKNGlVgFPq	1
3	Sergey	Chernyshov	Dmitrievich	sergche04@gmail.com	$2a$07$D1nCJNUd9AS2xhOlimK/X.9ZtfO3iWldoukFVWX/u0Q2VArh6igcu	2
6	Sergho	Chernyshov	\N	sergch4e04@gmail.com	$2a$07$HdLFusd2a/bfrBYsR103.uleLpoiq644uwt4OC5oSndTC6nVPxJVS	2
\.


--
-- Name: order_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_order_id_seq', 1, false);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_product_id_seq', 31, true);


--
-- Name: product_type_product_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_type_product_type_id_seq', 7, true);


--
-- Name: role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_role_id_seq', 2, true);


--
-- Name: supplier_supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.supplier_supplier_id_seq', 10, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_user_id_seq', 8, true);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);


--
-- Name: order-product pk_order_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order-product"
    ADD CONSTRAINT pk_order_product PRIMARY KEY (order_id, product_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- Name: product_type product_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_type
    ADD CONSTRAINT product_type_pkey PRIMARY KEY (type_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- Name: shopping_cart shopping_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (user_id, product_id);


--
-- Name: supplier supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (supplier_id);


--
-- Name: user unique_user_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_user_email UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: order-product fk_order_product_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order-product"
    ADD CONSTRAINT fk_order_product_order_id FOREIGN KEY (order_id) REFERENCES public."order"(order_id);


--
-- Name: order-product fk_order_product_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order-product"
    ADD CONSTRAINT fk_order_product_product_id FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- Name: order fk_order_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT fk_order_user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: product fk_product_supplier_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_supplier_id FOREIGN KEY (supplier_id) REFERENCES public.supplier(supplier_id);


--
-- Name: product fk_product_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_type_id FOREIGN KEY (type_id) REFERENCES public.product_type(type_id);


--
-- Name: shopping_cart fk_shopping_cart_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT fk_shopping_cart_product_id FOREIGN KEY (product_id) REFERENCES public.product(product_id);


--
-- Name: shopping_cart fk_shopping_cart_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT fk_shopping_cart_user_id FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: user fk_user_role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT fk_user_role_id FOREIGN KEY (role_id) REFERENCES public.role(role_id);


--
-- PostgreSQL database dump complete
--

