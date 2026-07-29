//Dữ liệu gốc
export const data = {
  // Event bao gồm id từ 1 đến 75
  events: {
    //----x----Khai trương -> đang dừng ở các brand lẻ., mai đến chuỗi CAN-
    "khai-truong-phoc-cafe": {
      id: 35,
      slug: "khai-truong-phoc-cafe",
      title: "Khai trương - Phộc Cafe",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri", "thiet-ke-menu", "in-an"], // Tầng 2 (Icon con)
      date: "15.05.2024",
      tags: ["DayNe", "Phộc Cafe", "Võ Sư Lộc", "khai trương", "trang trí", "thiết kế menu", "in ấn menu"],
      contactInfo: {
        address: "199 Lê Trọng Tấn, Phường Sơn Kỳ, Quận Tân Phú, TP. HCM.",
        brandName: "Chú Hề Đây Nè!",
        link: "https://byvn.net/Fsec",
      },
      files: ["thumb-s1-40.webp", "khaitruong-phoccafe-3.webp", "khaitruong-phoccafe-2.webp", "khaitruong-phoccafe-1.webp"],
    },
    "khai-truong-hy-cafe": {
      id: 34,
      slug: "khai-truong-hy-cafe",
      title: "Khai trương - Hy Cafe",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri"], // Tầng 2 (Icon con)
      date: "20.05.2024",
      tags: ["DayNe", "Hy Cafe", "khai trương", "trang trí"],
      contactInfo: {
        address: "47-49 Vĩnh Hội, Phường 4, Quận 4, TP. HCM.",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-18.webp", "khaitruong-hycafe-1.webp"],
    },
    "khai-truong-puna": {
      id: 33,
      slug: "khai-truong-puna",
      title: "Khai trương - PUNA - Nail Studio",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri"], // Tầng 2 (Icon con)
      date: "07.06.2024",
      tags: ["DayNe", "PUNA - Nail Studio", "khai trương", "trang trí"],
      contactInfo: {
        address: "76/97 Lê Văn Phan, Phường Phú Thọ Hòa, Quận Tân Phú,  TP. HCM.",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-41.webp", "khaitruong-puna-1.webp"],
    },
    "khai-truong-tll-cars": {
      id: 32,
      slug: "khai-truong-tll-cars",
      title: "Khai trương - Công ty TNHH TM DV TLL CARS",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri"], // Tầng 2 (Icon con)
      date: "07.06.2024",
      tags: ["DayNe", "TLL CARS", "HELIOZ", "khai trương", "trang trí", "MC", "setup"],
      contactInfo: {
        address: "289 Bình Lợi, Phường 13, Quận Bình Thạnh, TP. HCM.",
        brandName: "Chú Hề Đây Nè!",
        owner: "Công ty TNHH TM DV TLL CARS",
      },
      files: ["thumb-s1-50.webp", "khaitruong-tllcars-2.webp", "khaitruong-tllcars-1.webp"],
    },
    "khai-truong-korea-mart": {
      id: 31,
      slug: "khai-truong-korea-mart",
      title: "Khai trương - Xin chào KOREA MART",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri"], // Tầng 2 (Icon con)
      date: "10.06.2024",
      tags: ["DayNe", "XinChaoKoreaMart", "khai trương", "trang trí"],
      contactInfo: {
        address: "Cantavil Quận 2 - số 1 Song Hành, Phường An Phú, TP. Thủ Đức (Quận 2 cũ) ",
        brandName: "Chú Hề Đây Nè!",
        owner: "Xin chào Korea Mart!",
      },
      files: ["thumb-s1-27.webp", "khaitruong-koreamart-1.webp"],
    },
    "khai-truong-mcake": {
      id: 31,
      slug: "khai-truong-mcake",
      title: "Khai trương - MCAKE",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri"], // Tầng 2 (Icon con)
      date: "24.09.2024",
      tags: ["DayNe", "MCAKE", "BalloonParty", "khai trương", "trang trí"],
      contactInfo: {
        address: "SI.08 BLOCK A2, c/c Q7 RIVERSIDE SỐ 4 Đào Trí - P. Phú Thuận - Quận 7 - TP. HCM.",
        brandName: "Chú Hề Đây Nè!",
        owner: "MCAKE",
      },
      files: [
        "thumb-s1-37.webp",
        "khaitruong-mcake-1.webp",
        "khaitruong-mcake-2.webp",
        "khaitruong-mcake-3.webp",
        "khaitruong-mcake-4.webp",
        "khaitruong-mcake-5.webp",
        "khaitruong-mcake-6.webp",
        "khaitruong-mcake-7.webp",
        "khaitruong-mcake-8.webp",
        "khaitruong-mcake-9.webp",
        "khaitruong-mcake-10.webp",
      ],
    },
    "khai-truong-ryri-chi-nhanh-2": {
      id: 30,
      slug: "khai-truong-ryri-chi-nhanh-2",
      title: "Khai trương - Beauty House RYRI chi nhánh 2",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["khai-truong", "trang-tri"], // Tầng 2 (Icon con)
      date: "25.09.2024",
      tags: ["DayNe", "RYRI", "khai trương", "trang trí"],
      contactInfo: {
        address: "47 Đường 39 - P. Tân Quy - Quận 7 - TP. HCM.",
        brandName: "Beauty House RYRI",
      },
      files: ["thumb-s1-42.webp", "khaitruong-ryri-2.webp", "khai-truong-ryri-1.webp"],
    },
    //----x----Tiệc cưới
    "wedding-tran-huynh-minh-uyen": {
      id: 36,
      slug: "wedding-tran-huynh-minh-uyen",
      title: "Trần Huỳnh ❤️ Minh Uyên",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "wedding", // Tầng 2 (Icon con)
      date: "04.07.2026",
      contactInfo: {
        // address: "Nhà hàng Ái Huê",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-51.webp", "wedding-04072026-2.webp", "wedding-04072026-4.webp", "wedding-04072026-1.webp", "wedding-04072026-3.webp"],
    },
    //----x----Mừng thọ
    "mung-tho-cu-ba-phan-thi-so": {
      id: 12,
      slug: "mung-tho-cu-ba-phan-thi-so",
      title: "Mừng thọ - cụ bà Phan Thị Sơ",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "mung-tho", // Tầng 2 (Icon con)
      date: "26.08.2023",
      contactInfo: {
        address: "Nhà hàng Ái Huê",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-9.webp",
        "mungtho-cubalethiso-0.webp",
        "mungtho-cubalethiso-17.webp",
        "mungtho-cubalethiso-12.webp",
        "mungtho-cubalethiso-3.webp",
        "mungtho-cubalethiso-5.webp",
        "mungtho-cubalethiso-11.webp",
        "mungtho-cubalethiso-4.webp",
        "mungtho-cubalethiso-6.webp",
        "mungtho-cubalethiso-7.webp",
        "mungtho-cubalethiso-8.webp",
        "mungtho-cubalethiso-9.webp",
        "mungtho-cubalethiso-10.webp",
        "mungtho-cubalethiso-13.webp",
        "mungtho-cubalethiso-14.webp",
        "mungtho-cubalethiso-15.webp",
        "mungtho-cubalethiso-16.webp",
        "mungtho-cubalethiso-18.webp",
        "mungtho-cubalethiso-19.webp",
        "mungtho-cubalethiso-20.webp",
      ],
    },
    //----x----Thiện nguyện
    "70-nam-ngay-thay-thuoc": {
      id: 29,
      slug: "70-nam-ngay-thay-thuoc",
      title: "Thiện nguyện - 70 năm ngày Thầy thuốc",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["le-hoi", "thien-nguyen"], // Tầng 2 (Icon con)
      date: "27.02.2025",
      tags: ["DayNe", "Đồng Tu", "Ballon Party", "Thiện Nguyện"],
      contactInfo: {
        address: "Trường THCS Nguyễn Văn Linh - Ấp 2, Bình Chánh",
        owner: "Công ty TNHH Quảng cáo Phúc Design",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-5.webp",
        "thiennguyen-ngaythaythuoc-1.webp",
        "thiennguyen-ngaythaythuoc-2.webp",
        "thiennguyen-ngaythaythuoc-3.webp",
        "thiennguyen-ngaythaythuoc-4.webp",
        "thiennguyen-ngaythaythuoc-5.webp",
        "thiennguyen-ngaythaythuoc-6.webp",
        "thiennguyen-ngaythaythuoc-7.webp",
        "thiennguyen-ngaythaythuoc-8.webp",
        "thiennguyen-ngaythaythuoc-9.webp",
        "thiennguyen-ngaythaythuoc-10.webp",
        "thiennguyen-ngaythaythuoc-11.webp",
        "thiennguyen-ngaythaythuoc-12.webp",
      ],
    },
    "thien-nguyen-thuong-nhieu-bien-oi": {
      id: 18,
      slug: "thien-nguyen-thuong-nhieu-bien-oi",
      title: "Thiện nguyện - chủ đề Biển ơi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["le-hoi", "thien-nguyen"], // Tầng 2 (Icon con)
      date: "31.05.2026",
      contactInfo: {
        address: "Bệnh viện Nhi Đồng 2",
        owner: "Thương Nhiều",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-4.webp",
        "thiennguyen-thuongnhieu6-1.webp",
        "thiennguyen-thuongnhieu6-2.webp",
        "thiennguyen-thuongnhieu6-4.webp",
        "thiennguyen-thuongnhieu6-5.webp",
        "thiennguyen-thuongnhieu6-5.webp",
        "thiennguyen-thuongnhieu6-6.webp",
        "thiennguyen-thuongnhieu6-7.webp",
        "thiennguyen-thuongnhieu6-8.webp",
        "thiennguyen-thuongnhieu6-9.webp",
        "thiennguyen-thuongnhieu6-10.webp",
      ],
    },
    "nha-luu-tru-0-dong": {
      id: 9,
      slug: "nha-luu-tru-0-dong",
      title: "Trung thu - Nhà lưu trú 0 đồng",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "thien-nguyen", // Tầng 2 (Icon con)
      date: "15.09.2023",
      contactInfo: {
        address: "Nhà Lưu trú 0 Đồng - Thủ Đức",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-7.webp",
        "thiennguyen-nhaluutru0dong-1.webp",
        "thiennguyen-nhaluutru0dong-2.webp",
        "thiennguyen-nhaluutru0dong-3.webp",
        "thiennguyen-nhaluutru0dong-4.webp",
        "thiennguyen-nhaluutru0dong-5.webp",
        "thiennguyen-nhaluutru0dong-6.webp",
        "thiennguyen-nhaluutru0dong-7.webp",
        "thiennguyen-nhaluutru0dong-9.webp",
        "thiennguyen-nhaluutru0dong-10.webp",
        "thiennguyen-nhaluutru0dong-11.webp",
        "thiennguyen-nhaluutru0dong-12.webp",
        "thiennguyen-nhaluutru0dong-13.webp",
        "thiennguyen-nhaluutru0dong-14.webp",
      ],
    },
    "mai-am-huynh-de-nhu-nghia": {
      id: 10,
      slug: "mai-am-huynh-de-nhu-nghia",
      title: "Trung thu - Mái ấm Huynh Đệ Như Nghĩa",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "thien-nguyen", // Tầng 2 (Icon con)
      date: "10.09.2023",
      contactInfo: {
        address: "Mái ấm Huynh Đệ Như Nghĩa",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-8.webp",
        "thiennguyen-maiamhuynhdenhunghia-1.webp",
        "thiennguyen-maiamhuynhdenhunghia-2.webp",
        "thiennguyen-maiamhuynhdenhunghia-3.webp",
        "thiennguyen-maiamhuynhdenhunghia-4.webp",
      ],
    },
    "lop-hoc-tinh-thuong-c4-pham-hung": {
      id: 11,
      slug: "lop-hoc-tinh-thuong-c4-pham-hung",
      title: "Trung thu - Lớp học tình thương - C4 Phạm Hùng, Quận 8",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "thien-nguyen", // Tầng 2 (Icon con)
      date: "213.10.2023",
      contactInfo: {
        address: "Sân bóng C4 Phạm Hùng",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-6.webp",
        "thiennguyen-lophoctinhthuong-0.webp",
        "thiennguyen-lophoctinhthuong-2.webp",
        "thiennguyen-lophoctinhthuong-3.webp",
        "thiennguyen-lophoctinhthuong-4.webp",
        "thiennguyen-lophoctinhthuong-1.webp",
      ],
    },
    //----x----YEP
    "year-end-party-cong-ty-luong-ha": {
      id: 19,
      slug: "year-end-party-cong-ty-luong-ha",
      title: "Year End Party công ty Luật Lưỡng Hà",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "yep", // Tầng 2 (Icon con)
      date: "21.01.2024",
      tags: ["DayNe", "LuongHa", "YearOneParty"],
      contactInfo: {
        address: "Hoa viên 102 - 39/79C Đ. Số 102, Tăng Nhơn Phú, Hồ Chí Minh",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "yep-congtyluongha-5.webp",
        "yep-congtyluongha-4.webp",
        "yep-congtyluongha-3.webp",
        "yep-congtyluongha-2.webp",
        "yep-congtyluongha-1.webp",
      ],
    },
    //----x----Thôi nôi
    "thoi-noi-hoang-anh-hoang-quan": {
      id: 20,
      slug: "thoi-noi-hoang-anh-hoang-quan",
      title: "Thôi nôi Hoàng Anh & Hoàng Quân",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "thoi-noi", // Tầng 2 (Icon con)
      date: "10.12.2024",
      contactInfo: {
        // address: "Nhà hàng 7 Kỳ Quan",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-1.webp",
        "thoinoi-hoanganh-hoangquan-1.webp",
        "thoinoi-hoanganh-hoangquan-2.webp",
        "thoinoi-hoanganh-hoangquan-3.webp",
        "thoinoi-hoanganh-hoangquan-4.webp",
        "thoinoi-hoanganh-hoangquan-5.webp",
        "thoinoi-hoanganh-hoangquan-6.webp",
        "thoinoi-hoanganh-hoangquan-7.webp",
        "thoinoi-hoanganh-hoangquan-8.webp",
        "thoinoi-hoanganh-hoangquan-9.webp",
        "thoinoi-hoanganh-hoangquan-10.webp",
      ],
    },
    //----x----Đầy tháng
    "day-thang-be-tue-nghi": {
      id: 22,
      slug: "day-thang-be-tue-nghi",
      title: "Đầy tháng bé Tuệ Nghi (Xí Muội)",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "fullmonth", // Tầng 2 (Icon con)
      date: "14.05.2025",
      contactInfo: {
        // address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-s1-52.webp",
        "fullmonth-betuenghi-9.webp",
        "fullmonth-betuenghi-2.webp",
        "fullmonth-betuenghi-3.webp",
        "fullmonth-betuenghi-4.webp",
        "fullmonth-betuenghi-5.webp",
        "fullmonth-betuenghi-6.webp",
        "fullmonth-betuenghi-1.webp",
        "fullmonth-betuenghi-8.webp",
        "fullmonth-betuenghi-7.webp",
      ],
    },
    //----x----Sinh nhật
    "sinh-nhat-be-bao-chau": {
      id: 75,
      slug: "sinh-nhat-be-bao-chau",
      title: "Sinh nhật bé Bảo Châu",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "09.05.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Domino Tên Lửa",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-56.webp"],
    },
    "sinh-nhat-be-bao-ngoc": {
      id: 74,
      slug: "sinh-nhat-be-bao-ngoc",
      title: "Sinh nhật bé Bảo Ngọc",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "25.01.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-55.webp"],
    },
    "sinh-nhat-be-kien-quoc": {
      id: 73,
      slug: "sinh-nhat-be-kien-quoc",
      title: "Sinh nhật bé Kiến Quốc",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "24.12.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Nhà hàng Văn Quảng",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-54.webp"],
    },
    "sinh-nhat-be-aviv": {
      id: 72,
      slug: "sinh-nhat-be-aviv",
      title: "Sinh nhật bé Aviv",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "21.11.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "CASA GRANDE",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-53.webp"],
    },
    "sinh-nhat-be-phan-y": {
      id: 71,
      slug: "sinh-nhat-be-phan-y",
      title: "Sinh nhật bé Phan Ý",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "06.02.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "McDonald's SCVivo City",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-49.webp"],
    },
    "sinh-nhat-be-thien-nghi": {
      id: 70,
      slug: "sinh-nhat-be-thien-nghi",
      title: "Sinh nhật bé Thiên Nghi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "01.06.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "McDonald's Điện Biên Phủ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-48.webp"],
    },
    "sinh-nhat-be-dac-huy": {
      id: 69,
      slug: "sinh-nhat-be-dac-huy",
      title: "Sinh nhật bé Đắc Huy",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "09.05.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Popeyes Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-47.webp"],
    },
    "sinh-nhat-be-gia-linh": {
      id: 68,
      slug: "sinh-nhat-be-gia-linh",
      title: "Sinh nhật bé Gia Linh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "22.02.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Bình Long",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-46.webp"],
    },
    "sinh-nhat-be-vu-minh-ngoc": {
      id: 67,
      slug: "sinh-nhat-be-minh-ngoc",
      title: "Sinh nhật bé Minh Ngọc",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "10.05.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "KFC Tỉnh Lộ 10",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-45.webp"],
    },
    "sinh-nhat-be-vu-kha-nhu": {
      id: 66,
      slug: "sinh-nhat-be-kha-nhu",
      title: "Sinh nhật bé Khả Như",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "20.12.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Company Phạm Hùng",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-44.webp"],
    },
    "sinh-nhat-be-vu-hoang-anh": {
      id: 65,
      slug: "sinh-nhat-be-vu-hoang-anh",
      title: "Sinh nhật bé Vũ Hoàng Anh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "21.03.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Domino Lê Văn Sỹ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-43.webp"],
    },
    "sinh-nhat-be-bao-nam": {
      id: 64,
      slug: "sinh-nhat-be-bao-nam",
      title: "Sinh nhật bé Bảo Nam",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "09.05.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-39.webp"],
    },
    "sinh-nhat-be-skylar": {
      id: 63,
      slug: "sinh-nhat-be-skylar",
      title: "Sinh nhật bé Skylar",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "12.04.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Texas Phan Văn Trị",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-36.webp"],
    },
    "sinh-nhat-be-bao-tran": {
      id: 63,
      slug: "sinh-nhat-be-bao-tran",
      title: "Sinh nhật bé Bảo Trân",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "16.11.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-35.webp"],
    },
    "sinh-nhat-be-nhat-khai": {
      id: 62,
      slug: "sinh-nhat-be-nhat-khai",
      title: "Sinh nhật bé Nhật Khải",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "18.01.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-34.webp"],
    },
    "sinh-nhat-be-minh-quan": {
      id: 61,
      slug: "sinh-nhat-be-minh-quan",
      title: "Sinh nhật bé Minh Quân",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "09.02.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-33.webp"],
    },
    "sinh-nhat-be-kha-nhi": {
      id: 60,
      slug: "sinh-nhat-be-kha-nhi",
      title: "Sinh nhật bé Khả Nhi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "05.02.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Domino Lê Văn Sỹ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-32.webp"],
    },
    "sinh-nhat-be-minh-chau": {
      id: 59,
      slug: "sinh-nhat-be-minh-chau",
      title: "Sinh nhật bé Gia Như",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "25.10.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "McDonald's Phan Xích Long",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-31.webp"],
    },
    "sinh-nhat-be-gia-nhu": {
      id: 58,
      slug: "sinh-nhat-be-gia-nhu",
      title: "Sinh nhật bé Gia Như",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "01.11.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-30.webp"],
    },
    "sinh-nhat-be-nam-phong": {
      id: 57,
      slug: "sinh-nhat-be-nam-phong",
      title: "Sinh nhật bé Nam Phong",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "13.03.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "McDonald's Điện Biên Phủ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-29.webp"],
    },
    "sinh-nhat-be-phuc-anh": {
      id: 56,
      slug: "sinh-nhat-be-phuc-anh",
      title: "Sinh nhật bé Phúc Ánh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "21.05.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Phạm Văn Chiêu",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-28.webp"],
    },
    "sinh-nhat-be-bao-duyen": {
      id: 55,
      slug: "sinh-nhat-be-bao-duyen",
      title: "Sinh nhật bé Bảo Duyên",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "11.10.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-26.webp"],
    },
    "sinh-nhat-be-kha-kha": {
      id: 54,
      slug: "sinh-nhat-be-kha-kha",
      title: "Sinh nhật bé Khả Khả",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "17.01.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-25.webp"],
    },
    "sinh-nhat-be-lan-chi": {
      id: 53,
      slug: "sinh-nhat-be-lan-chi",
      title: "Sinh nhật bé Lan Chi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "23.05.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-24.webp"],
    },
    "sinh-nhat-be-minh-duy": {
      id: 52,
      slug: "sinh-nhat-be-minh-duy",
      title: "Sinh nhật bé Minh Duy",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "14.01.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Domino Phan Văn Trị",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-23.webp"],
    },
    "sinh-nhat-be-ngoc-van": {
      id: 51,
      slug: "sinh-nhat-be-ngoc-van",
      title: "Sinh nhật bé Ngọc Vân",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "07.12.2024",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Domino Lê Văn Sỹ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-22.webp"],
    },
    "sinh-nhat-be-kha-nhi": {
      id: 50,
      slug: "sinh-nhat-be-kha-nhi",
      title: "Sinh nhật bé Khả Nhi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "05.02.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Domino Lê Văn Sỹ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-21.webp"],
    },
    "sinh-nhat-be-trong-hao": {
      id: 49,
      slug: "sinh-nhat-be-trong-hao",
      title: "Sinh nhật bé Trọng Hào",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "21.01.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Company Bàu Cát",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-20.webp"],
    },
    "sinh-nhat-be-gia-han": {
      id: 48,
      slug: "sinh-nhat-be-gia-han",
      title: "Sinh nhật bé Gia Hân",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "25.10.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Texas Phan Xích Long",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-19.webp"],
    },
    "sinh-nhat-be-huy-hoang": {
      id: 47,
      slug: "sinh-nhat-be-huy-hoang",
      title: "Sinh nhật bé Huy Hoàng",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "28.02.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-16.webp"],
    },
    "sinh-nhat-be-minh-triet": {
      id: 46,
      slug: "sinh-nhat-be-minh-triet",
      title: "Sinh nhật bé Minh Triết",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "10.01.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-15.webp"],
    },
    "sinh-nhat-be-thanh-duc": {
      id: 45,
      slug: "sinh-nhat-be-thanh-duc",
      title: "Sinh nhật bé Thành Đức",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "23.02.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Bình Long",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-14.webp"],
    },
    "sinh-nhat-tu-anh-chi-hao": {
      id: 44,
      slug: "sinh-nhat-tu-anh-chi-hao",
      title: "Sinh nhật bé Tú Anh & Chí Hào",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "20.06.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lê Đại Hành",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-13.webp"],
    },
    "sinh-nhat-be-khoi-nguyen": {
      id: 43,
      slug: "sinh-nhat-be-khoi-nguyen",
      title: "Sinh nhật bé Khôi Nguyên",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "12.10.2024",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Popeyes CN1",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-12.webp"],
    },
    "sinh-nhat-be-hani": {
      id: 42,
      slug: "sinh-nhat-be-hani",
      title: "Sinh nhật bé Hani",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "26.04.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Pizza Company Bàu Cát",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-11.webp"],
    },
    "sinh-nhat-be-thanh-tra": {
      id: 41,
      slug: "sinh-nhat-be-thanh-tra",
      title: "Sinh nhật bé Thanh Trà",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "26.04.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Lý Chính Thắng",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-10.webp"],
    },
    "sinh-nhat-be-phuong-anh": {
      id: 40,
      slug: "sinh-nhat-be-phuong-anh",
      title: "Sinh nhật bé Phương Anh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "08.02.2025",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Lotteria Bình Long",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-3.webp"],
    },
    "sinh-nhat-be-alice": {
      id: 39,
      slug: "sinh-nhat-be-alice",
      title: "Sinh nhật bé Alice",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "28.12.2024",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "McDonald's SCVivo City",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-s1-2.webp"],
    },
    "sinh-nhat-boi-ben-sony": {
      id: 38,
      slug: "sinh-nhat-boi-ben-sony",
      title: "Sinh nhật Bối - Ben - Sony",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat"], // Tầng 2 (Icon con)
      date: "16.07.2026",
      tags: ["ChuHeDayNe"],
      contactInfo: {
        address: "Làng nướng Nam Bộ",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["sinhnhat-boibensony-3.webp", "sinhnhat-boibensony-2.webp", "sinhnhat-boibensony-1.webp"],
    },
    "sinh-nhat-nhan-vien-caladon": {
      id: 26,
      slug: "sinh-nhat-nhan-vien-caladon",
      title: "Sinh nhật nhân viên Celadon - Tháng 1-2-3-4-5",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["sinh-nhat", "brand"], // Tầng 2 (Icon con)
      date: "08.05.2025",
      tags: [
        "PhucDesign",
        "PhucDecor",
        "GamudaLand",
        "GemsLand",
        "DamianWork",
        "Celadon",
        "Sinhnhatnhanvien",
        "HonDatRestaurant",
        "NhahangHonDat",
        "NhahangquanTanPhu",
      ],
      contactInfo: {
        address: "Hòn Đất Garden - 140 Tân Sơn Nhì, phường Tân Sơn Nhì, Quận Tân Phú, TP.HCM",
        brandName: "Chú Hề Đây Nè!",
        owner: "Clip Flycam >>",
        link: "https://www.facebook.com/share/v/1EX3oUmurL/",
      },
      files: ["thumb-celadon-1.webp", "sinhnhat-celadon-1.webp"],
    },
    "sinh-nhat-be-yen-chi-6-tuoi": {
      id: 23,
      slug: "sinh-nhat-be-yen-chi-6-tuoi",
      title: "Sinh nhật bé Yến Chi - 6 tuổi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "08.07.2026",
      contactInfo: {
        address: "Lotteria Lý Chính Thắng - 250B Lý Chính Thắng, Nhiêu Lộc, Hồ Chí Minh",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-yenchi-1.webp", "sinhnhat-beyechi-2.webp", "sinhnhat-beyechi-3.webp", "sinhnhat-beyechi-1.webp", "sinhnhat-beyechi-4.webp"],
    },
    "sinh-nhat-be-nha-doanh": {
      id: 13,
      slug: "sinh-nhat-be-nha-doanh",
      title: "Sinh nhật bé Nhã Doanh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "14.11.2023",
      contactInfo: {
        address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["thumb-nhadoanh-1.webp", "sinhnhat_benhadoanh.jpg"],
    },
    "sinh-nhat-be-mai-lam-vi-hung": {
      id: 14,
      slug: "sinh-nhat-be-mai-lam-vi-hung",
      title: "Sinh nhật bé Mai Lâm & Vĩ Hùng",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "26.11.2023",
      contactInfo: {
        address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-mailamvihung-1.webp",
        "sinhnhat-mailam-vihung-1.webp",
        "sinhnhat-mailam-vihung-2.webp",
        "sinhnhat-mailam-vihung-3.webp",
        "sinhnhat-mailam-vihung-4.webp",
        "sinhnhat-mailam-vihung-5.webp",
        "sinhnhat-mailam-vihung-6.webp",
        "sinhnhat-mailam-vihung-7.webp",
        "sinhnhat-mailam-vihung-8.webp",
        "sinhnhat-mailam-vihung-9.webp",
        "sinhnhat-mailam-vihung-10.webp",
        "sinhnhat-mailam-vihung-11.webp",
        "sinhnhat-mailam-vihung-12.webp",
        "sinhnhat-mailam-vihung-13.webp",
        "sinhnhat-mailam-vihung-14.webp",
        "sinhnhat-mailam-vihung-15.webp",
        "sinhnhat-mailam-vihung-16.webp",
        "sinhnhat-mailam-vihung-17.webp",
        "sinhnhat-mailam-vihung-18.webp",
        "sinhnhat-mailam-vihung-19.webp",
        "sinhnhat-mailam-vihung-20.webp",
      ],
    },
    "sinh-nhat-be-hien-long": {
      id: 1,
      slug: "sinh-nhat-be-hien-long",
      title: "Sinh nhật bé Hiển Long",
      category: "su-kien", // Dùng để lọc và quyết định label
      subCategory: "sinh-nhat", // Dùng để lọc ở subTab
      date: "28.01.2024", // Định dạng chuẩn YYYY-MM-DD để dễ sắp xếp/lọc
      files: [
        "thumb-hienlong-1.webp",
        "sinhnhat-beLong-1.jpg",
        "sinhnhat-beLong-2.jpg",
        "sinhnhat-beLong-3.jpg",
        "sinhnhat-beLong-4.jpg",
        "sinhnhat-beLong-5.jpg",
        "sinhnhat-beLong-6.jpg",
        "sinhnhat-beLong-7.jpg",
        "sinhnhat-beLong-8.jpg",
        "sinhnhat-beLong-9.jpg",
        "sinhnhat-beLong-10.jpg",
        "sinhnhat-beLong-11.jpg",
        "sinhnhat-beLong-12.jpg",
        "sinhnhat-beLong-13.jpg",
        "sinhnhat-beLong-14.jpg",
        "sinhnhat-beLong-15.jpg",
        "sinhnhat-beLong-16.jpg",
        "sinhnhat-beLong-17.jpg",
        "sinhnhat-beLong-18.jpg",
        "sinhnhat-beLong-19.jpg",
        "sinhnhat-beLong-20.jpg",
      ],
      contactInfo: {
        address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
    },
    "sinh-nhat-be-bao-mi": {
      id: 2,
      slug: "sinh-nhat-be-bao-mi",
      title: "Sinh nhật bé Bảo Mi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "13.10.2023",
      files: [
        "thumb-baomi-1.webp",
        "sinhnhat-bebaomi-2.jpg",
        "sinhnhat-bebaomi-3.jpg",
        "sinhnhat-bebaomi-4.jpg",
        "sinhnhat-bebaomi-5.jpg",
        "sinhnhat-bebaomi-6.jpg",
        "sinhnhat-bebaomi-7.jpg",
        "sinhnhat-bebaomi-8.jpg",
        "sinhnhat-bebaomi-9.jpg",
        "sinhnhat-bebaomi-10.jpg",
        "sinhnhat-bebaomi-1.jpg",
      ],
      contactInfo: {
        address: "KFC Tân Hòa Đông",
        brandName: "Chú Hề Đây Nè!",
      },
    },
    "sinh-nhat-be-bao-tran": {
      id: 3,
      slug: "sinh-nhat-be-bao-tran",
      title: "Sinh nhật bé Bảo Trân",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "02.11.2023",
      files: [
        "thumb-baotran-1.webp",
        "sinhnhat-beBaoTran-5.jpg",
        "sinhnhat-beBaoTran-2.jpg",
        "sinhnhat-beBaoTran-3.jpg",
        "sinhnhat-beBaoTran-4.jpg",
        "sinhnhat-beBaoTran-1.jpg",
        "sinhnhat-beBaoTran-6.jpg",
        "sinhnhat-beBaoTran-7.jpg",
      ],
      contactInfo: {
        address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
    },
    "sinh-nhat-be-nhat-anh": {
      id: 4,
      slug: "sinh-nhat-be-nhat-anh",
      title: "Sinh nhật bé Nhật Anh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "03.11.2023",
      files: [
        "thumb-nhatanh-1.webp",
        "sinhnhat-beNhatAnh-1.jpg",
        "sinhnhat-beNhatAnh-2.jpg",
        "sinhnhat-beNhatAnh-3.jpg",
        "sinhnhat-beNhatAnh-4.jpg",
        "sinhnhat-beNhatAnh-1.jpg",
        "sinhnhat-beNhatAnh-6.jpg",
        "sinhnhat-beNhatAnh-7.jpg",
        "sinhnhat-beNhatAnh-8.jpg",
        "sinhnhat-beNhatAnh-9.jpg",
      ],
      contactInfo: {
        address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
    },
    "sinh-nhat-be-thien-kim": {
      id: 5,
      slug: "sinh-nhat-be-thien-kim",
      title: "Sinh nhật bé Thiên Kim",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "04.11.2023",
      files: [
        "thumb-thienkim-1.webp",
        "sinhnhat-bethienkim-1.jpg",
        "sinhnhat-bethienkim-26.jpg",
        "sinhnhat-bethienkim-3.jpg",
        "sinhnhat-bethienkim-4.jpg",
        "sinhnhat-bethienkim-1.jpg",
        "sinhnhat-bethienkim-6.jpg",
        "sinhnhat-bethienkim-7.jpg",
        "sinhnhat-bethienkim-8.jpg",
        "sinhnhat-bethienkim-2.jpg",
        "sinhnhat-bethienkim-9.jpg",
        "sinhnhat-bethienkim-10.jpg",
        "sinhnhat-bethienkim-11.jpg",
        "sinhnhat-bethienkim-12.jpg",
        "sinhnhat-bethienkim-13.jpg",
        "sinhnhat-bethienkim-14.jpg",
        "sinhnhat-bethienkim-15.jpg",
        "sinhnhat-bethienkim-16.jpg",
        "sinhnhat-bethienkim-17.jpg",
        "sinhnhat-bethienkim-18.jpg",
        "sinhnhat-bethienkim-19.jpg",
        "sinhnhat-bethienkim-20.jpg",
        "sinhnhat-bethienkim-21.jpg",
        "sinhnhat-bethienkim-22.jpg",
        "sinhnhat-bethienkim-23.jpg",
        "sinhnhat-bethienkim-24.jpg",
        "sinhnhat-bethienkim-25.jpg",
        "sinhnhat-bethienkim-27.jpg",
        "sinhnhat-bethienkim-28.jpg",
        "sinhnhat-bethienkim-29.jpg",
        "sinhnhat-bethienkim-30.jpg",
      ],
      contactInfo: {
        address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
    },
    "sinh-nhat-mr-minh-quyen": {
      id: 6,
      slug: "sinh-nhat-mr-minh-quyen",
      title: "Sinh nhật Mr. Minh Quyền",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "sinh-nhat", // Tầng 2 (Icon con)
      date: "18.08.2023",
      contactInfo: {
        address: "Nhà hàng Lẩu Tôm",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "thumb-minhquyen-1.webp",
        "sinhnhat-Mr.Quyen-21.jpg",
        "sinhnhat-Mr.Quyen-2.jpg",
        "sinhnhat-Mr.Quyen-1.jpg",
        "sinhnhat-Mr.Quyen-3.jpg",
        "sinhnhat-Mr.Quyen-4.jpg",
        "sinhnhat-Mr.Quyen-1.jpg",
        "sinhnhat-Mr.Quyen-6.jpg",
        "sinhnhat-Mr.Quyen-7.jpg",
        "sinhnhat-Mr.Quyen-8.jpg",
        "sinhnhat-Mr.Quyen-2.jpg",
        "sinhnhat-Mr.Quyen-9.jpg",
        "sinhnhat-Mr.Quyen-10.jpg",
        "sinhnhat-Mr.Quyen-11.jpg",
        "sinhnhat-Mr.Quyen-12.jpg",
        "sinhnhat-Mr.Quyen-13.jpg",
        "sinhnhat-Mr.Quyen-14.jpg",
        "sinhnhat-Mr.Quyen-15.jpg",
        "sinhnhat-Mr.Quyen-16.jpg",
        "sinhnhat-Mr.Quyen-17.jpg",
        "sinhnhat-Mr.Quyen-18.jpg",
        "sinhnhat-Mr.Quyen-19.jpg",
        "sinhnhat-Mr.Quyen-20.jpg",
        "sinhnhat-Mr.Quyen-22.jpg",
        "sinhnhat-Mr.Quyen-23.jpg",
      ],
    },
    //----x----Lễ hội
    "le-hoi-kem-2026": {
      id: 37,
      slug: "le-hoi-kem-2026",
      title: "Lễ hội Kem 2026 cùng Jelly Cool",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["le-hoi", "brand"], // Tầng 2 (Icon con)
      date: "17.07.2026",
      contactInfo: {
        address: "Lotte Mart Nam Sài Gòn",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "Jelycool-170726-13.webp",
        "Jelycool-170726-8.webp",
        "Jelycool-170726-10.webp",
        "Jelycool-170726-1.webp",
        "Jelycool-170726-2.webp",
        "Jelycool-170726-3.webp",
        "Jelycool-170726-4.webp",
        "Jelycool-170726-5.webp",
        "Jelycool-170726-6.webp",
        "Jelycool-170726-7.webp",
        "Jelycool-170726-9.webp",
        "Jelycool-170726-11.webp",
        "Jelycool-170726-12.webp",
        "Jelycool-170726-14.webp",
        "Jelycool-170726-15.webp",
      ],
    },
    "hoi-trai-tong-quan-binh-chanh-2025": {
      id: 24,
      slug: "hoi-trai-tong-quan-binh-chanh-2025",
      title: "Hội trại Tòng quân Huyện Bình Chánh",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "13.02.2025",
      tags: ["DayNe", "Hoitraitongquan2025", "BinhChanh"],
      contactInfo: {
        address: "BCHQS Thị trấn Tân Túc - B2/39, KP2, Tân Nhựt, Hồ Chí Minh",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "hoitrai-tongquan-2025-10.webp",
        "hoitrai-tongquan-2025-22.webp",
        "hoitrai-tongquan-2025-7.webp",
        "hoitrai-tongquan-2025-3.webp",
        "hoitrai-tongquan-2025-1.webp",
        "hoitrai-tongquan-2025-2.webp",
        "hoitrai-tongquan-2025-4.webp",
        "hoitrai-tongquan-2025-5.webp",
        "hoitrai-tongquan-2025-6.webp",
        "hoitrai-tongquan-2025-23.webp",
        "hoitrai-tongquan-2025-8.webp",
        "hoitrai-tongquan-2025-9.webp",
        "hoitrai-tongquan-2025-11.webp",
        "hoitrai-tongquan-2025-12.webp",
        "hoitrai-tongquan-2025-13.webp",
        "hoitrai-tongquan-2025-14.webp",
        "hoitrai-tongquan-2025-15.webp",
        "hoitrai-tongquan-2025-16.webp",
        "hoitrai-tongquan-2025-17.webp",
        "hoitrai-tongquan-2025-18.webp",
        "hoitrai-tongquan-2025-19.webp",
        "hoitrai-tongquan-2025-20.webp",
        "hoitrai-tongquan-2025-21.webp",
      ],
    },
    "blast-off-countdown-2025": {
      id: 21,
      slug: "blast-off-countdown-2025",
      title: "Blast Off Countdown 2025",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "30.12.2024",
      contactInfo: {
        address: "Landmark 81",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["boc25-1.webp", "boc25-2.webp", "boc25-3.webp", "boc25-4.webp", "boc25-5.webp"],
    },
    "khen-thuong-hoc-sinh-gioi-tmi": {
      id: 21,
      slug: "khen-thuong-hoc-sinh-gioi-tmi",
      title: "Khen thưởng Học sinh Giỏi - TMI",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "16.07.2026",
      contactInfo: {
        address: "Công ty TMI",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["tmi-16072026-3.webp", "tmi-16072026-4.webp", "tmi-16072026-1.webp", "tmi-16072026-2.webp"],
    },
    "trung-thu-cong-an-huyen-ben-luc": {
      id: 17,
      slug: "trung-thu-cong-an-huyen-ben-luc",
      title: "Trung thu - Công an Huyện Bến Lức",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "16.09.2024",
      contactInfo: {
        address: "Công an Huyện Bến Lức",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "trungthu-cahbenluc-1.webp",
        "trungthu-cahbenluc-2.webp",
        "trungthu-cahbenluc-4.webp",
        "trungthu-cahbenluc-5.webp",
        "trungthu-cahbenluc-5.webp",
        "trungthu-cahbenluc-6.webp",
        "trungthu-cahbenluc-7.webp",
        "trungthu-cahbenluc-8.webp",
        "trungthu-cahbenluc-9.webp",
        "trungthu-cahbenluc-10.webp",
        "trungthu-cahbenluc-11.webp",
        "trungthu-cahbenluc-12.webp",
        "trungthu-cahbenluc-13.webp",
        "trungthu-cahbenluc-24.webp",
        "trungthu-cahbenluc-15.webp",
        "trungthu-cahbenluc-16.webp",
      ],
    },
    "hao-hao-concert": {
      id: 15,
      slug: "hao-hao-concert",
      title: "Hảo Hảo Concert",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "12.2025",
      contactInfo: {
        // address: "McDonald's Phú Lâm",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["haohao-concert-1.webp", "haohao-concert-2.webp", "haohao-concert-3.webp"],
    },
    "quoc-te-thieu-nhi-nha-xuat-ban-tre": {
      id: 16,
      slug: "quoc-te-thieu-nhi-nha-xuat-ban-tre",
      title: "Quốc tế Thiếu nhi - Nhà xuất bản Trẻ",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "01.06.2026",
      contactInfo: {
        address: "Nhà xuất bản Trẻ - 151 Lý Chính Thắng. Quận 3, TP.HCM",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "quoctethieunhi-nhaxuatbantre-2.webp",
        "quoctethieunhi-nhaxuatbantre-1.webp",
        "quoctethieunhi-nhaxuatbantre-4.webp",
        "quoctethieunhi-nhaxuatbantre-5.webp",
        "quoctethieunhi-nhaxuatbantre-3.webp",
        "quoctethieunhi-nhaxuatbantre-6.webp",
        "quoctethieunhi-nhaxuatbantre-7.webp",
        "quoctethieunhi-nhaxuatbantre-10.webp",
        "quoctethieunhi-nhaxuatbantre-11.webp",
        "quoctethieunhi-nhaxuatbantre-12.webp",
        "quoctethieunhi-nhaxuatbantre-13.webp",
        "quoctethieunhi-nhaxuatbantre-22.webp",
        "quoctethieunhi-nhaxuatbantre-15.webp",
        "quoctethieunhi-nhaxuatbantre-27.webp",
        "quoctethieunhi-nhaxuatbantre-17.webp",
        "quoctethieunhi-nhaxuatbantre-18.webp",
        "quoctethieunhi-nhaxuatbantre-19.webp",
        "quoctethieunhi-nhaxuatbantre-20.webp",
      ],
    },
    "mam-non-da-ly-huong": {
      id: 7,
      slug: "mam-non-da-ly-huong",
      title: "Trung thu - mầm non Dạ Lý Hương",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "213.10.2023",
      contactInfo: {
        address: "Trường mầm non Dạ Lý Hương",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "mamnon-dalyhuong-1.webp",
        "mamnon-dalyhuong-2.webp",
        "mamnon-dalyhuong-3.webp",
        "mamnon-dalyhuong-4.webp",
        "mamnon-dalyhuong-5.webp",
        "mamnon-dalyhuong-6.webp",
        "mamnon-dalyhuong-7.webp",
        "mamnon-dalyhuong-8.webp",
        "mamnon-dalyhuong-9.webp",
        "mamnon-dalyhuong-10.webp",
        "mamnon-dalyhuong-11.webp",
        "mamnon-dalyhuong-20.webp",
        "mamnon-dalyhuong-13.webp",
        "mamnon-dalyhuong-14.webp",
        "mamnon-dalyhuong-15.webp",
        "mamnon-dalyhuong-16.webp",
        "mamnon-dalyhuong-17.webp",
        "mamnon-dalyhuong-18.webp",
        "mamnon-dalyhuong-19.webp",
        "mamnon-dalyhuong-20.webp",
      ],
    },
    "khu-vui-choi-dam-sen": {
      id: 8,
      slug: "khu-vui-choi-dam-sen",
      title: "Quốc tế Thiếu Nhi",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "01.06.2025",
      contactInfo: {
        address: "Đầm Sen Park",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "khuvuichoi-damsen-1.webp",
        "khuvuichoi-damsen-2.webp",
        "khuvuichoi-damsen-3.webp",
        "khuvuichoi-damsen-4.webp",
        "khuvuichoi-damsen-5.webp",
        "khuvuichoi-damsen-6.webp",
        "khuvuichoi-damsen-7.webp",
      ],
    },
    "khai-quang-diem-nhan-viet-soul": {
      id: 25,
      slug: "khai-quang-diem-nhan-viet-soul",
      title: "Khai Quang Điểm Nhãn - Lân Sư Rồng Hồn Việt",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "le-hoi", // Tầng 2 (Icon con)
      date: "21.01.2024",
      tags: ["DayNe", "khaiquangdiemnhan", "VietSoul", "HonViet", "LanSuRong"],
      contactInfo: {
        address: "Nhà Thiếu Nhi Quận 9 - 65D Hồ Bá Phấn, Phường Phước Long A, Quận 9",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "khaiquangdiemnhan-vietsoul-3.webp",
        "khaiquangdiemnhan-vietsoul-2.webp",
        "khaiquangdiemnhan-vietsoul-8.webp",
        "khaiquangdiemnhan-vietsoul-1.webp",
        "khaiquangdiemnhan-vietsoul-4.webp",
        "khaiquangdiemnhan-vietsoul-5.webp",
        "khaiquangdiemnhan-vietsoul-6.webp",
        "khaiquangdiemnhan-vietsoul-7.webp",
        "khaiquangdiemnhan-vietsoul-9.webp",
        "khaiquangdiemnhan-vietsoul-10.webp",
        "khaiquangdiemnhan-vietsoul-11.webp",
        "khaiquangdiemnhan-vietsoul-12.webp",
        "khaiquangdiemnhan-vietsoul-13.webp",
        "khaiquangdiemnhan-vietsoul-14.webp",
        "khaiquangdiemnhan-vietsoul-15.webp",
        "khaiquangdiemnhan-vietsoul-16.webp",
      ],
    },
    "Workshop-banh-kem": {
      id: 27,
      slug: "workshop-banh-kem",
      title: "Workshop Làm Bánh Kem",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: ["le-hoi", "workshop"], // Tầng 2 (Icon con)
      date: "24.05.2026",
      tags: ["DayNe", "AIA+", "Nhân Định", "Workshop", "QuocTeThieuNhi"],
      contactInfo: {
        address: "Lynk The Vibe - 22B Nguyễn Thị Diệu, phường Xuân Hòa, TP.HCM",
        owner: "Nhân Định - Mê Bảo Hiểm",
        brandName: "Chú Hề Đây Nè!",
      },
      files: ["workshop-aia-1.webp"],
    },
    "Workshop-cong-nghe-nuoc": {
      id: 28,
      slug: "workshop-cong-nghe-nuoc",
      title: "Workshop Công Nghệ Nước - Rước Khỏe Về Nhà",
      category: "su-kien", // Tầng 1 (Tab lớn)
      subCategory: "workshop", // Tầng 2 (Icon con)
      date: "21.05.2026",
      tags: ["DayNe", "HECWIN", "Workshop"],
      contactInfo: {
        address: "Good Morning Coffee - 103 Võ Oanh, Bình Thạnh TP.HCM",
        owner: "HECWIN",
        brandName: "Chú Hề Đây Nè!",
      },
      files: [
        "workshop-hecwin-1.webp",
        "workshop-hecwin-2.webp",
        "workshop-hecwin-3.webp",
        "workshop-hecwin-4.webp",
        "workshop-hecwin-5.webp",
        "workshop-hecwin-6.webp",
      ],
    },
  },
  // Design bao gồm id từ 101 đến 131
  designs: {
    "thiet-ke-logo-yen-nguyen-chat": {
      id: 105,
      slug: "thiet-ke-logo-yen-nguyen-chat",
      title: "Yến Nguyên Chất - Logo Branding",
      category: "thiet-ke",
      date: "2022-08-03",
      subCategory: ["logo", "sticker", "package", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-yennguyenchat.jpg"],
      contactInfo: {
        address: "Nha Trang",
        owner: "Yến Nguyên Chất - Mr. Đức & Vietsoft Software Solutions Company",
        link: "hhttps://www.facebook.com/minhduc.nguyen.967",
        brandName: "Phuc Design", // Dùng để hiển thị ở câu cảm ơn
      },
    },
    "thiet-ke-logo-golden-bakery": {
      id: 104,
      slug: "thiet-ke-logo-golden-bakery",
      title: "Golden Bakery - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "sign"], // Tầng 2 (Icon con)
      files: ["logo-golden-bakery.jpg"],
      contactInfo: {
        phone: "090.6655.610",
        address: "CN1: 195 Lê Hồng Phong, Phường 8, TP. Vũng Tàu. - CN2: 126A9 Hoàng Hoa Thám, Phường 2, TP. Vũng Tàu",
        link: "https://www.facebook.com/goldenbakeryvungtau",
        owner: "Golden Bakery",
        date: "15.12.2022",
      },
    },
    "thiet-ke-logo-vifmilk": {
      id: 112,
      slug: "thiet-ke-logo-vifmilk",
      title: "VIFMILK- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-vifmilk.jpg"],
      contactInfo: {
        phone: "024.6282 4344 - Fax: 024.6282 4263",
        address: "Tầng 5 tòa nhà 29 T1,Đường Hoàng Đạo Thúy,Phường Trung Hòa,Quận Cầu Giấy, Hà Nội",
        owner: "CÔNG TY CỔ PHẦN PHÁT TRIỂN SỮA TƯƠI VIỆT NAM – VIFMILK",
        link: "vifmilk.vn",
        date: "28.08.2022",
      },
    },
    "thiet-ke-logo-379shop": {
      id: 101,
      slug: "thiet-ke-logo-379shop",
      title: "379Shop- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "sticker"], // Tầng 2 (Icon con)
      // date: "2022.11.21",
      // date:"21.11.2022",
      files: ["logo-379shop.jpg"],
      contactInfo: {
        address: "57A Tháp Mười, Phường 2, Quận 6, TP.HCM",
        owner: "SGC_Shop",
        date: "20.11.2022",
      },
    },
    "thiet-ke-logo-bach-hoa-cho-lon": {
      id: 102,
      slug: "thiet-ke-logo-bach-hoa-cho-lon",
      title: "Bách Hóa Chợ Lớn- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-bhcl.jpg"],
      contactInfo: {
        address: "184/36/7 Bãi Sậy, Phường 4, Quận 6, TP. HCM",
        phone: "0934.006.112 (Mr.Kiệt)",
        owner: "VĂN PHÒNG PHẨM & BÁCH HOÁ MR.K",
        link: "bachhoacholon.com",
        date: "28.08.2022",
      },
    },
    "thiet-ke-logo-bep-kvh": {
      id: 103,
      slug: "thiet-ke-logo-bep-kvh",
      title: "Bếp Kính Vạn Hoa- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "sticker"], // Tầng 2 (Icon con)
      files: ["logo-bep-kvh.jpg"],
      contactInfo: {
        address: "Bình Dương",
        phone: " 098.167.2690 (Zalo)",
        owner: "Bếp Kính Vạn Hoa",
        date: "13.01.2023",
      },
    },
    "thiet-ke-logo-yen-sao-quyen-yen": {
      id: 104,
      slug: "thiet-ke-logo-yen-sao-quyen-yen",
      title: "Yến sào Quyền Yến- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "sticker"], // Tầng 2 (Icon con)
      files: ["logo-yensao-quyenyen.jpg"],
      contactInfo: {
        address: "Thôn Bình Tiến 1, xã Phước Minh, Bù Gia Mập, Bình Phước.",
        phone: " 0915.605.091 - 0375.234.783 (Mrs. Phượng)",
        owner: "Yến sào Quyền Yến",
        date: "29.08.2023",
        link: "https://www.facebook.com/profile.php?id=100032023171821&__tn__=-UK*F",
      },
    },
    "thiet-ke-logo-bao-hiem-loc-hung": {
      id: 107,
      slug: "thiet-ke-logo-bao-hiem-loc-hung",
      title: "Bảo hiểm Lộc Hưng- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card"], // Tầng 2 (Icon con)
      files: ["logo-baohiem-lochung.jpg"],
      contactInfo: {
        owner: "Công ty Bảo hiểm Lộc Hưng",
        date: "28.08.2023",
      },
    },
    "thiet-ke-logo-fairy-lashes": {
      id: 108,
      slug: "thiet-ke-logo-fairy-lashes",
      title: "Fairy Lashes- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: "logo", // Tầng 2 (Icon con)
      files: ["logo-fairy-lashes.jpg"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft",
        date: "21.11.2021",
      },
    },
    "thiet-ke-logo-katty": {
      id: 109,
      slug: "thiet-ke-logo-katty",
      title: "Katty- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card", "voucher"], // Tầng 2 (Icon con)
      files: ["logo-katty.jpg"],
      contactInfo: {
        phone: "0909.261.992 (Zalo - Ms. Vi) - 0969.252.422 (Zalo - Ms. My)",
        address: "10.11 lô A Chung cư 109 Nguyễn Biểu, P.1, Q.5, TP. HCM",
        owner: "Katty Spa",
        date: "21.10.2022",
      },
    },
    "thiet-ke-logo-me-hau": {
      id: 110,
      slug: "thiet-ke-logo-me-hau",
      title: "Mẹ Hấu- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "posm"], // Tầng 2 (Icon con)
      files: ["logo-mehau.jpg"],
      contactInfo: {
        phone: "090.3731.703",
        address: "243/70 Hoàng Diệu, P.4, Q. 4 (hẻm kế cổng chùa Giác Nguyên 41)",
        owner: "Mẹ Hấu",
        date: "13.01.2023",
      },
    },
    "thiet-ke-logo-suc-khoe-xanh": {
      id: 111,
      slug: "thiet-ke-logo-suc-khoe-xanh",
      title: "Sức khỏe Xanh- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card"], // Tầng 2 (Icon con)
      files: ["logo-suckhoexanh.jpg"],
      contactInfo: {
        phone: "0908.396.007 (Giám đốc - Mr. Lễ Sinh)",
        address: "161/7/3 Bình Trị Đông, P. BTĐ A, Q. Bình Tân, TP. HCM",
        owner: "Công ty TNHH TM SỨC KHOẺ XANH",
        date: "26.08.2022",
      },
    },
    "thiet-ke-logo-tuong-viet": {
      id: 112,
      slug: "thiet-ke-logo-tuong-viet",
      title: "Tường Việt- Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-tuongviet.jpg"],
      contactInfo: {
        phone: "0907.188.575 (Mr. Phương) - huynhphuongxd@gmail.com",
        address:
          "➪ HỒ CHÍ MINH: Số B2-OF08, Tòa nhà Q7 Boulevar, Phường Phú Mỹ, Quận 7, TP. Hồ Chí Minh. - ➪ NINH THUẬN: 324 Ngô Gia Tự, Phường Tấn Tài, TP. Phan Rang - Tháp Chàm",
        owner: "Công ty TNHH Xây dựng - Nội thất Tường Việt",
        link: "tuongviet.co",
        date: "03.08.2022",
      },
    },
    "thiet-ke-logo-canatech": {
      id: 113,
      slug: "thiet-ke-logo-canatech",
      title: "CANATECH - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card", "uniform"], // Tầng 2 (Icon con)
      files: ["logo-canatech.jpg"],
      contactInfo: {
        phone: "0907.188.575 (Mr. Phương) - huynhphuongxd@gmail.com",
        address: " 590/E4 Cách Mạng Tháng Tám, Phường 11, Quận 3, TP. HCM.",
        owner: "Công ty Cổ phần Đầu Tư CANATECH VIETNAM",
        date: "29.08.2022",
      },
    },
    "thiet-ke-logo-circle-monogram": {
      id: 114,
      slug: "thiet-ke-logo-circle-monogram",
      title: "CIRCLE - BTML - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card", "uniform"], // Tầng 2 (Icon con)
      files: ["logo-circle.jpg"],
      contactInfo: {
        address: "908/5 Quang Trung, P. 8, Q. Gò Vấp.",
        owner: "BTL Shop",
        date: "25.11.2022",
      },
    },
    "thiet-ke-logo-sai-gon-cap": {
      id: 115,
      slug: "thiet-ke-logo-sai-gon-cap",
      title: "Saigon Cap - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card", "sticker"], // Tầng 2 (Icon con)
      files: ["logo-saigoncap.jpg"],
      contactInfo: {
        address: "57A Tháp Mười, Phường 2, Quận 6, TP. Hồ Chí Minh.",
        owner: "SGC Shop",
        date: "08.12.2022",
      },
    },
    "thiet-ke-logo-thai-ipitiso-gallery": {
      id: 116,
      slug: "thiet-ke-logo-thai-ipitiso-gallery",
      title: "THAI IPITISO GALLERY - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "business-card", "package"], // Tầng 2 (Icon con)
      files: ["logo-thai.jpg"],
      contactInfo: {
        phone: "Wechat: cowcow999 - Whatsapp: 01133111696 - Hp: 0113311696 - 01133111595",
        owner: "THAI IPITISO GALLERY",
        link: "https://www.facebook.com/ThaiItipiso999",
        date: "08.12.2022",
      },
    },
    "thiet-ke-logo-nem-nuong-co-ba": {
      id: 117,
      slug: "thiet-ke-logo-nem-nuong-co-ba",
      title: "Nem nướng Cô Ba - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "sticker", "sign", "posm"], // Tầng 2 (Icon con)
      files: ["logo-nemnuong-coba.jpg"],
      contactInfo: {
        phone: "0707.93.23.03 (Mrs. Châu)",
        owner: "Quán Nem Nướng Cô Ba Long An",
        address: "289 Bùi Minh Trực, Phường 6, Quận 8, TP. HCM",
        date: "29.08.2022",
      },
    },
    "thiet-ke-logo-nha-tro-richhouse": {
      id: 118,
      slug: "thiet-ke-logo-nha-tro-richhouse",
      title: "Nhà trọ Richhouse - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-nhatro-richhouse.jpg"],
      contactInfo: {
        phone: "7028.36365050 - info@richfield.com",
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Nhà trọ RICHHOUSE",
        address: "103 Lê Văn Lương, Nhà Bè, TP. HCM",
        link: "nhatrorichhouse.com",
        date: "03.08.2022",
      },
    },
    "thiet-ke-logo-xtech": {
      id: 118,
      slug: "thiet-ke-logo-xtech",
      title: "XTECH - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app", "business-card"], // Tầng 2 (Icon con)
      files: ["logo-xtech.jpg"],
      contactInfo: {
        phone: "7028.36365050 - info@richfield.com",
        owner: "Công ty Giải pháp Phần mềm Vietsoft",
        date: "13.01.2023",
      },
    },
    "thiet-ke-logo-dong-phuc-vk": {
      id: 119,
      slug: "thiet-ke-dong-phuc-vk",
      title: "Đồng phục VK - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app", "business-card"], // Tầng 2 (Icon con)
      files: ["logo-dongphucvk.jpg"],
      contactInfo: {
        phone: "0905.552.004 - nguyenthivuha@gmail.com",
        address: "131 Huỳnh Ngọc Huệ, Phường Hòa Khê, TP Đà Nẵng. - Chung cư Quang Thái, 111B Lý Thánh Tông, F.Tân Thới Hòa, Q.Tân Phú, Tp HCM.",
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Cửa hàng Đồng phục VK",
        link: "dongphucvk.vn",
        date: "03.08.2022",
      },
    },
    "thiet-ke-logo-ant": {
      id: 120,
      slug: "thiet-ke-logo-ant",
      title: "POS ANT - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-ant.jpg"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft",
        date: "21.11.2022",
      },
    },
    "thiet-ke-logo-artisan": {
      id: 121,
      slug: "thiet-ke-logo-artisan",
      title: "Artisan - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-artisan-1.jpg", "logo-artisan-2.jpg"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft",
        date: "20.11.2022",
      },
    },
    "thiet-ke-logo-nail-beauty-supply": {
      id: 122,
      slug: "thiet-ke-nail-beauty-supply",
      title: "Nail Beauty Supply - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-nailbeauty-supply.jpg"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Ngành Nail",
        date: "03.08.2022",
      },
    },
    "thiet-ke-logo-nail-tech": {
      id: 123,
      slug: "thiet-ke-nail-tech",
      title: "Nailtech - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-nailtech-1.jpg", "logo-nailtech-2"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Ngành Nail",
        date: "11.10.2022",
      },
    },
    "thiet-ke-logo-nail-checkin": {
      id: 124,
      slug: "thiet-ke-nail-checkin",
      title: "Nail Checkin - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-nailcheckin-1.jpg", "logo-nailcheckin-2", "logo-nailcheckin-3"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Ngành Nail",
        date: "11.10.2022",
      },
    },
    "thiet-ke-logo-nail-spa-of-american": {
      id: 126,
      slug: "thiet-ke-nail-spa-of-american",
      title: "Nailspa Of American - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "web-app"], // Tầng 2 (Icon con)
      files: ["logo-naispa-of-american-1.jpg", "logo-naispa-of-american-2"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Ngành Nail",
        date: "11.10.2022",
      },
    },
    "thiet-ke-logo-metta-craft": {
      id: 125,
      slug: "thiet-ke-metta-craft",
      title: "Metta Craft - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: "logo", // Tầng 2 (Icon con)
      files: ["logo-mettacraft.jpg"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft & Ngành Nail",
        address: "Suite 103, 119 Queen street, Charlottetown, PEI",
        date: "03.08.2022",
      },
    },
    "thiet-ke-logo-cow-awake-cafe": {
      id: 127,
      slug: "thiet-ke-cow-awake-cafe",
      title: "Cow-Awake Cafe - Logo Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: ["logo", "sticker"], // Tầng 2 (Icon con)
      files: ["logo-cow-awake.jpg"],
      contactInfo: {
        owner: "Công ty Giải pháp Phần mềm Vietsoft",
        date: "21.11.2022",
      },
    },
    "thi-cong-booth-xiaomi-17t": {
      id: 128,
      slug: "thi-cong-booth-xiaomi-17t",
      title: "Xiamoni 17T - Booth Branding",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: "booth", // Tầng 2 (Icon con)
      files: [
        "thicong-booth-xiaomi17t-1.webp",
        "thicong-booth-xiaomi17t-2.webp",
        "thicong-booth-xiaomi17t-3.webp",
        "thicong-booth-xiaomi17t-4.webp",
        "thicong-booth-xiaomi17t-5.webp",
        "thicong-booth-xiaomi17t-6.webp",
        "thicong-booth-xiaomi17t-7.webp",
        "thicong-booth-xiaomi17t-8.webp",
        "thicong-booth-xiaomi17t-9.webp",
        "thicong-booth-xiaomi17t-10.webp",
        "thicong-booth-xiaomi17t-11.webp",
        "thicong-booth-xiaomi17t-12.webp",
        "thicong-booth-xiaomi17t-13.webp",
        "thicong-booth-xiaomi17t-14.webp",
      ],
      contactInfo: {
        // owner: "Công ty Giải pháp Phần mềm Vietsoft",
        // date: "21.11.2022",
        //
      },
    },
    "mau-tham-khao-logo-monogram": {
      id: 128,
      slug: "mau-tham-khao-logo-monogram",
      title: "Mẫu tham khảo - Logo Monogram",
      category: "thiet-ke", // Tầng 1 (Tab lớn)
      subCategory: "form", // Tầng 2 (Icon con)
      files: [
        "thamkhao-logomonogram-1.webp",
        "thamkhao-logomonogram-2.webp",
        "thamkhao-logomonogram-3.webp",
        "thamkhao-logomonogram-4.webp",
        "thamkhao-logomonogram-5.webp",
        "thamkhao-logomonogram-6.webp",
        "thamkhao-logomonogram-7.webp",
        "thamkhao-logomonogram-8.webp",
        "thamkhao-logomonogram-9.webp",
        "thamkhao-logomonogram-10.webp",
      ],
      contactInfo: {
        owner: "Cộng đồng",
      },
    },
  },
  // Pricing bao gồm id từ 201
  pricing: {
    "bang-gia-khai-truong": {
      id: 201,
      slug: "bang-gia-khai-truong",
      title: "Giá niêm yết - Khai trương",
      type: "price", // Thêm type để phân biệt
      category: "bang-gia", // Tầng 1 (Tab lớn)
      subCategory: "khai-truong", // Tầng 2 (Icon con)
      files: ["khaitruong-banggia-4.webp", "khaitruong-banggia-1.webp", "khaitruong-banggia-2.webp", "khaitruong-banggia-3.webp"],
    },
  },
};
//gộp tất cả thành mảng
export const galleryData = [...Object.values(data.events), ...Object.values(data.designs), ...Object.values(data.pricing)];
// Export thêm các danh mục nếu cần cho bộ lọc (filter) ở allPost
export const categories = ["su-kien", "thiet-ke", "bang-gia"];
