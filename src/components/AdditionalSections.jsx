import React, { useMemo } from "react";
import "./additionalSections.css";
import { galleryData } from "../datas/galleryData";
import { useNavigate } from "react-router-dom";

const AdditionalSections = ({ currentSlug }) => {
  const navigate = useNavigate();

  // Tìm bài viết hiện tại
  const currentPost = useMemo(() => {
    return galleryData.find((item) => item.slug === currentSlug);
  }, [currentSlug]);

  // Logic lọc bài viết liên quan sử dụng "giao tập hợp" (intersection)
  const displayPosts = useMemo(() => {
    if (!currentPost) return [];

    return galleryData
      .filter((item) => {
        // 1. Loại bỏ chính bài đang xem
        if (item.slug === currentSlug) return false;

        // 2. Chuẩn hóa về dạng mảng để so sánh an toàn
        const currentCats = Array.isArray(currentPost.subCategory) ? currentPost.subCategory : [currentPost.subCategory].filter(Boolean);

        const itemCats = Array.isArray(item.subCategory) ? item.subCategory : [item.subCategory].filter(Boolean);

        // 3. Kiểm tra xem có ít nhất 1 thẻ (tag) nào chung không
        return itemCats.some((cat) => currentCats.includes(cat));
      })
      .sort(() => 0.5 - Math.random()); // Trộn ngẫu nhiên
  }, [currentSlug, currentPost]);

  const dummyPartners = [
    "https://www.google.com/favicon.ico",
    "https://www.microsoft.com/favicon.ico",
    "https://www.apple.com/favicon.ico",
    "https://www.facebook.com/favicon.ico",
    "https://www.netflix.com/favicon.ico",
    "https://www.spotify.com/favicon.ico",
    "https://www.adobe.com/favicon.ico",
    "https://www.amazon.com/favicon.ico",
  ];

  return (
    <div className="additional-sections-container">
      <section className="related-posts">
        <h3>Bài viết liên quan</h3>
        <div className="scroll-wrapper">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <div
                key={post.slug}
                className="post-card"
                onClick={() => {
                  navigate(`/post/${post.slug}`);
                  window.scrollTo(0, 0);
                }}
              >
                {post.files?.[0] ? (
                  <img
                    src={`${import.meta.env.BASE_URL}img/${post.files[0]}`}
                    alt={post.title}
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                  />
                ) : (
                  <div className="img-placeholder">No Image</div>
                )}
          
              </div>
            ))
          ) : (
            <p style={{ padding: "20px" }}>Chưa có bài viết liên quan cùng loại.</p>
          )}
        </div>
      </section>

      <section className="partners-section">
        <h3>Đối tác liên kết</h3>
        <div className="marquee">
          <div className="marquee-content">
            {[...dummyPartners, ...dummyPartners].map((logoUrl, index) => (
              <img
                key={index}
                src={logoUrl}
                alt={`Partner ${index}`}
                className="partner-logo"
                style={{
                  height: "50px",
                  margin: "0 20px",
                  filter: "grayscale(100%)", // Hiệu ứng đen trắng cho đồng bộ
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdditionalSections;
