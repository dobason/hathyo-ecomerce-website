import { Col, Row, Typography } from 'antd';
import React from 'react';

const { Link } = Typography;

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: '',
      links: [],
    },
    {
      title: 'VỀ HATHYO',
      links: [
        { label: 'Giới thiệu Hathyo', href: 'https://hathyo.com/info/about' },
        { label: 'Công cụ vui khỏe Hathyo', href: 'https://hathyo.com/apps/hathyo-tools' },
        { label: 'Tích lũy Hathyo Calorie', href: 'https://hathyo.com/info/hathyo-calorie' },
        { label: 'Tuyển dụng Hathyo', href: 'https://hathyo.com/info/careers' },
        { label: 'Cộng tác viên vui khỏe', href: 'https://hathyo.com/info/wellness-experts' },
        { label: 'Tiếp thị liên kết Hathyo', href: 'https://hathyo.com/helps/affiliate-marketing' },
      ],
    },
    {
      title: 'NGƯỜI DÙNG',
      links: [
        { label: 'Hành trình vui khỏe', href: 'https://hathyo.com/user/wellness-transformations' },
        { label: 'Câu hỏi thường gặp', href: 'https://hathyo.com/user/faqs' },
        { label: 'Điều khoản sử dụng', href: 'https://hathyo.com/terms/terms-of-use' },
        { label: 'Chính sách bảo mật', href: 'https://hathyo.com/terms/privacy-policy' },
        { label: 'Lưu ý quan trọng', href: 'https://hathyo.com/terms/disclaimers' },
        { label: 'Trung tâm trợ giúp', href: 'https://hathyo.com/helps/help-center' },
      ],
    },
    {
      title: 'MUA SẮM',
      links: [
        { label: 'Hướng dẫn mua hàng', href: 'https://hathyo.com/helps/buying-guide' },
        { label: 'Hướng dẫn bán hàng', href: 'https://hathyo.com/helps/selling-guide' },
        { label: 'Bán hàng trên Hathyo', href: 'https://admin.hathyo.com' },
        { label: 'Phương thức thanh toán', href: 'https://hathyo.com/terms/payment-methods' },
        { label: 'Phương thức vận chuyển', href: 'https://hathyo.com/terms/shipping-methods' },
        { label: 'Chính sách đổi trả hàng', href: 'https://hathyo.com/terms/return-policy' },
      ],
    },
    {
      title: 'KẾT NỐI VUI KHỎE HATHYO',
      links: [],
    },
  ];

  const socialMediaLinks = [
    { label: 'Zalo', icon: '/zl.png' },
    { label: 'Facebook', icon: '/fb.png' },
    { label: 'Instagram', icon: '/ig.png' },
    { label: 'Tiktok', icon: '/tiktok.png' },
    { label: 'Youtube', icon: '/yt.png' },
    { label: 'Linkedin', icon: '/lk.png' },
  ];

  return (
    <div style={{ backgroundColor: '#2B4212' }}>
      <div style={{ maxWidth: '1536px', margin: '0 auto', padding: '40px 16px' }}>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{ justifyContent: 'center', marginTop: '40px' }}
        >
          {footerLinks.map((section, index) => (
            <Col
              key={index}
              xs={index === 0 || index === 4 ? 24 : 7}
              sm={index === 0 || index === 4 ? 24 : 7}
              md={index === 0 || index === 4 ? 24 : 7}
              lg={4}
              xl={4}
            >
              {/* Section Title */}
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  marginBottom: '24px',
                  textAlign: index === 4 ? 'center' : 'left',
                }}
              >
                {section.title}
              </div>
              {/* Content */}
              {index === 0 ? (
                <Row
                  align="middle"
                  justify="center"
                  gutter={[16, 16]}
                  style={{ textAlign: 'center', marginBottom: '10px' }}
                >
                  {/* Logo */}
                  <Col xs={12} sm={12} md={12} lg={24}>
                    <a href="/">
                      <img
                        src="/icons/HathyoV1_Rectangle_Full.svg"
                        alt="Hathyo logo"
                        style={{ width: '140px', height: 'auto' }}
                      />
                    </a>
                  </Col>

                  {/* Đang đăng ký */}
                  <Col xs={12} sm={12} md={12} lg={24}>
                    <div
                      style={{
                        border: '2px solid #0a2122',
                        padding: '16px',
                        textAlign: 'center',
                        fontSize: '1rem',
                      }}
                    >
                      Đang đăng ký Bộ Công Thương
                    </div>
                  </Col>
                </Row>
              ) : index === 4 ? (
                <div style={{ textAlign: 'center' }}>
                  {/* Social Media */}
                  <Row gutter={[16, 16]} justify="center">
                    <Col md={8} lg={12}>
                      {socialMediaLinks.map((social, socialIndex) => (
                        <div
                          key={socialIndex}
                          style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}
                        >
                          <img
                            src={social.icon}
                            alt={social.label}
                            style={{ width: '28px', height: '28px' }}
                          />
                          <span style={{ fontSize: '0.875rem', color: '#ffffff' }}>
                            {social.label}
                          </span>
                        </div>
                      ))}
                    </Col>
                    <Col md={8} lg={12}>
                      <div>
                        <img
                          src="/QR.png"
                          alt="QR Code"
                          style={{ width: '72px', height: '72px', marginBottom: '8px' }}
                        />
                      </div>
                      <div>
                        <img
                          src="/app-store-down.webp"
                          alt="App Store"
                          style={{ width: '140px', height: 'auto', marginBottom: '8px' }}
                        />
                      </div>
                      <div>
                        <img
                          src="/google-play-down.png"
                          alt="Google Play"
                          style={{ width: '140px', height: 'auto' }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {section.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '1rem',
                        color: '#ffffff',
                        textDecoration: 'none',
                        marginBottom: '8px',
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </Col>
          ))}
        </Row>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{ justifyContent: 'center', marginTop: '40px' }}
        >
          <Col>
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#FFFFFF',
              }}
            >
              Công ty TNHH Cuộc Sống Vui Khỏe
            </span>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Col>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 'semibold',
                color: '#FFFFFF',
              }}
            >
              Địa chỉ: 82 Phan Đăng Lưu, Phường 05, Quận Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam
            </span>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Col sm={12} md={8} lg={6}>
            <Link href="tel:0084-827000248" style={{ fontSize: '0.875rem', color: '#ffffff' }}>
              Điện thoại: 0084-827000248
            </Link>
          </Col>
          <Col sm={12} md={8} lg={6}>
            <Link href="mailto:email@hathyo.com" style={{ fontSize: '0.875rem', color: '#ffffff' }}>
              Email: email@hathyo.com
            </Link>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Col>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 'semibold',
                color: '#FFFFFF',
              }}
            >
              Giấy chứng nhận đăng ký doanh nghiệp số 0318170229 do Sở Kế hoạch và Đầu tư Thành phố
              Hồ Chí Minh cấp lần đầu vào ngày 17/11/2023.
            </span>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Col>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 'semibold',
                color: '#FFFFFF',
              }}
            >
              Người chịu trách nhiệm quản lý website: <br />
              Hoàng Minh Phụng – Giám đốc
            </span>
          </Col>
        </Row>
        <Row
          gutter={[16, 16]}
          justify={'center'}
          style={{
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          <Col>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 'semibold',
                color: '#FFFFFF',
              }}
            >
              © 2023 - {new Date().getFullYear()} Bản quyền thuộc về Công ty TNHH Cuộc Sống Vui Khỏe
            </span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
