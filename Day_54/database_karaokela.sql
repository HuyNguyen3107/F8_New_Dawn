Database: database_03_manhhuy

DROP DATABASE IF EXISTS database_03_manhhuy;

CREATE DATABASE database_03_manhhuy
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE "PHONG" (
  "MaPhong" varchar(50) PRIMARY KEY,
  "LoaiPhong" varchar(100) NOT NULL,
  "SoKhachToiDa" int NOT NULL,
  "GiaPhong" float NOT NULL,
  "MoTa" text,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "KHACH_HANG" (
  "MaKH" varchar(50) PRIMARY KEY,
  "TenKH" varchar(100) NOT NULL,
  "DiaChi" varchar(200) NOT NULL,
  "SoDT" varchar(15) UNIQUE NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "DAT_PHONG" (
  "MaDatPhong" varchar(50) PRIMARY KEY,
  "MaPhong" varchar(50) NOT NULL,
  "MaKH" varchar(50) NOT NULL,
  "NgayDat" date NOT NULL,
  "GioBatDau" timetz NOT NULL,
  "GioKetThuc" timetz NOT NULL,
  "TienDatCoc" float NOT NULL,
  "GhiChu" text,
  "TrangThaiDat" varchar(50) NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

CREATE TABLE "CHI_TIET_SU_DUNG_DV" (
  "MaDatPhong" varchar(50),
  "MaDV" varchar(50),
  "SoLuong" int NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  PRIMARY KEY ("MaDatPhong", "MaDV")
);

CREATE TABLE "DICH_VU_DI_KEM" (
  "MaDV" varchar(50) PRIMARY KEY,
  "TenDV" varchar(100) NOT NULL,
  "DonViTinh" varchar(20) NOT NULL,
  "DonGia" float NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now())
);

ALTER TABLE "DAT_PHONG" ADD FOREIGN KEY ("MaPhong") REFERENCES "PHONG" ("MaPhong");

ALTER TABLE "DAT_PHONG" ADD FOREIGN KEY ("MaKH") REFERENCES "KHACH_HANG" ("MaKH");

ALTER TABLE "CHI_TIET_SU_DUNG_DV" ADD FOREIGN KEY ("MaDatPhong") REFERENCES "DAT_PHONG" ("MaDatPhong");

ALTER TABLE "CHI_TIET_SU_DUNG_DV" ADD FOREIGN KEY ("MaDV") REFERENCES "DICH_VU_DI_KEM" ("MaDV");

INSERT INTO "PHONG" ("MaPhong", "LoaiPhong", "SoKhachToiDa", "GiaPhong") 
VALUES ('P0001', 'Loai 1', 20, 60000);

INSERT INTO "PHONG" ("MaPhong", "LoaiPhong", "SoKhachToiDa", "GiaPhong") 
VALUES ('P0002', 'Loai 1', 25, 80000);

INSERT INTO "PHONG" ("MaPhong", "LoaiPhong", "SoKhachToiDa", "GiaPhong")
VALUES ('P0003', 'Loai 2', 15, 50000);

INSERT INTO "PHONG" ("MaPhong", "LoaiPhong", "SoKhachToiDa", "GiaPhong")
VALUES ('P0004', 'Loai 3', 20, 50000);

INSERT INTO "KHACH_HANG" ("MaKH", "TenKH", "DiaChi", "SoDT")
VALUES ('KH0001', 'Nguyen Van A', 'Hoa xuan', '1111111111');

INSERT INTO "KHACH_HANG" ("MaKH", "TenKH", "DiaChi", "SoDT")
VALUES ('KH0002', 'Nguyen Van B', 'Hoa hai', '1111111112');

INSERT INTO "KHACH_HANG" ("MaKH", "TenKH", "DiaChi", "SoDT")
VALUES ('KH0003', 'Phan Van A', 'Cam le', '11111111113');

INSERT INTO "KHACH_HANG" ("MaKH", "TenKH", "DiaChi", "SoDT")
VALUES ('KH0004', 'Phan Van B', 'Hoa xuan', '1111111114');

INSERT INTO "DICH_VU_DI_KEM" ("MaDV", "TenDV", "DonViTinh", "DonGia")
VALUES  ('DV001', 'Beer', 'lon', 10000),
		('DV002', 'Nuoc ngot', 'lon', 8000),
		('DV003', 'Trai cay', 'dia', 35000),
		('DV004', 'Khan uot', 'cai', 2000);

INSERT INTO "DAT_PHONG" ("MaDatPhong", "MaPhong", "MaKH", "NgayDat", "GioBatDau", "GioKetThuc", "TienDatCoc", "TrangThaiDat")
VALUES	('DP0001', 'P0001', 'KH0002', TO_DATE('26/03/2018','DD/MM/YYYY'), '11:00', '13:30', 100000 , 'Da dat'),
		('DP0002', 'P0001', 'KH0003', TO_DATE('27/03/2018','DD/MM/YYYY'), '17:15', '19:15', 50000 , 'Da huy'),
		('DP0003', 'P0002', 'KH0002', TO_DATE('26/03/2018','DD/MM/YYYY'), '20:30', '22:15', 100000 , 'Da dat'),
		('DP0004', 'P0003', 'KH0001', TO_DATE('01/04/2018','DD/MM/YYYY'), '19:30', '21:15', 200000 , 'Da dat');

INSERT INTO "CHI_TIET_SU_DUNG_DV" ("MaDatPhong", "MaDV", "SoLuong")
VALUES ('DP0001', 'DV001', 20),
	   ('DP0001', 'DV003', 3),
	   ('DP0001', 'DV002', 10),
	   ('DP0002', 'DV002', 10),
	   ('DP0002', 'DV003', 1),
	   ('DP0003', 'DV003', 2),
	   ('DP0003', 'DV004', 10);


SELECT "DAT_PHONG"."MaDatPhong", "DAT_PHONG"."MaPhong", 
"PHONG"."LoaiPhong", "PHONG"."GiaPhong", 
"KHACH_HANG"."TenKH", "DAT_PHONG"."NgayDat",
("PHONG"."GiaPhong" * 
 ((
 ((EXTRACT(HOUR FROM "DAT_PHONG"."GioKetThuc") * 60) + EXTRACT(MINUTE FROM "DAT_PHONG"."GioKetThuc")) -  
 ((EXTRACT(HOUR FROM "DAT_PHONG"."GioBatDau") * 60) + EXTRACT(MINUTE FROM "DAT_PHONG"."GioBatDau"))
 ) / 60)
) AS "TongTienHat",
(CASE 
	WHEN SUM("CHI_TIET_SU_DUNG_DV"."SoLuong" * "DICH_VU_DI_KEM"."DonGia") IS NULL THEN 0 
	ELSE SUM("CHI_TIET_SU_DUNG_DV"."SoLuong" * "DICH_VU_DI_KEM"."DonGia") 
END) AS "TongTienSuDungDichVu ",
("PHONG"."GiaPhong" * 
 ((
 ((EXTRACT(HOUR FROM "DAT_PHONG"."GioKetThuc") * 60) + EXTRACT(MINUTE FROM "DAT_PHONG"."GioKetThuc")) -  
 ((EXTRACT(HOUR FROM "DAT_PHONG"."GioBatDau") * 60) + EXTRACT(MINUTE FROM "DAT_PHONG"."GioBatDau"))
 ) / 60)
) + (CASE 
	WHEN SUM("CHI_TIET_SU_DUNG_DV"."SoLuong" * "DICH_VU_DI_KEM"."DonGia") IS NULL THEN 0 
	ELSE SUM("CHI_TIET_SU_DUNG_DV"."SoLuong" * "DICH_VU_DI_KEM"."DonGia") 
END) AS "TongTienThanhToan"
FROM "PHONG"
INNER JOIN "DAT_PHONG"
ON "PHONG"."MaPhong" = "DAT_PHONG"."MaPhong"
INNER JOIN "KHACH_HANG"
ON "KHACH_HANG"."MaKH" = "DAT_PHONG"."MaKH"
LEFT JOIN "CHI_TIET_SU_DUNG_DV"
ON "CHI_TIET_SU_DUNG_DV"."MaDatPhong" = "DAT_PHONG"."MaDatPhong"
LEFT JOIN "DICH_VU_DI_KEM"
ON "DICH_VU_DI_KEM"."MaDV" = "CHI_TIET_SU_DUNG_DV"."MaDV"
GROUP BY "DAT_PHONG"."MaDatPhong", "DAT_PHONG"."MaPhong", 
"PHONG"."LoaiPhong", "PHONG"."GiaPhong", 
"KHACH_HANG"."TenKH", "DAT_PHONG"."NgayDat"


SELECT "KHACH_HANG"."MaKH", "KHACH_HANG"."TenKH", "KHACH_HANG"."DiaChi", "KHACH_HANG"."SoDT"
FROM "KHACH_HANG"
INNER JOIN "DAT_PHONG"
ON "KHACH_HANG"."MaKH" = "DAT_PHONG"."MaKH"
GROUP BY "KHACH_HANG"."MaKH"
HAVING "KHACH_HANG"."DiaChi" = 'Hoa xuan'


SELECT "PHONG"."MaPhong", "PHONG"."LoaiPhong", "PHONG"."SoKhachToiDa", "PHONG"."GiaPhong",
COUNT("DAT_PHONG"."MaPhong") AS "SoLanDat"
FROM "PHONG"
INNER JOIN "DAT_PHONG"
ON "PHONG"."MaPhong" = "DAT_PHONG"."MaPhong"
WHERE "DAT_PHONG"."TrangThaiDat" = 'Da dat'
GROUP BY "PHONG"."MaPhong", "PHONG"."LoaiPhong", "PHONG"."SoKhachToiDa", "PHONG"."GiaPhong"
HAVING COUNT("DAT_PHONG"."MaPhong") > 2 



