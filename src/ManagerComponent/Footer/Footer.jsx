import React from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <a
            href="https://www.google.com/maps/dir//PNJ+Center+229+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+229+X%C3%B4+Vi%E1%BA%BFt+Ngh%E1%BB%87+T%C4%A9nh,+Ph%C6%B0%E1%BB%9Dng+17,+B%C3%ACnh+Th%E1%BA%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh+700000/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x317528b19a816f15:0x20442b010c7631aa?sa=X&ved=1t:57443&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.pnj.io/images/logo/pnj.com.vn.png"
              alt="Company Logo"
              className="footer-logo"
            />
          </a>
          <div className="footer-text">
            <p>© 2024 Công Ty Cổ Phần Vàng Bạc Đá Quý Thảo Điền</p>
          </div>
          <div className="contact-info">
            <p>
              <CallIcon style={{ color: "black", verticalAlign: "middle" }} />{" "}
              Contact: +084 2628 9999
            </p>
          </div>
          <div className="email-info">
            <p>
              <EmailIcon style={{ color: "black", verticalAlign: "middle" }} />{" "}
              Email:{" "}
              <a href="mailto:Phatltse171171@gmail.com">
                Phatltse171171@gmail.com
              </a>
            </p>
          </div>
          <div className="address">
            <p>
              <HomeIcon style={{ color: "black", verticalAlign: "middle" }} />{" "}
              Address: 19/XuânThuỷ/P.ThảoĐiền/Q.2/TP.HCM
            </p>
          </div>
        </div>
        <div className="footer-center">
          <p>
            <strong>Payment Methods</strong>
            <div className="payment-methods">
              <img
                src="https://www.pnj.com.vn/design/themes/pnjrovski/media/images/payments/visa.svg"
                alt="Visa"
              />
              <img
                src="https://www.pnj.com.vn/design/themes/pnjrovski/media/images/payments/mastercard.svg"
                alt="Mastercard"
              />
              <img
                src="https://www.pnj.com.vn/design/themes/pnjrovski/media/images/payments/jcb.svg"
                alt="JCB"
              />
              <img
                src="https://www.pnj.com.vn/design/themes/pnjrovski/media/images/payments/thanhtoantienmat.svg"
                alt="Cash Payment"
              />
              <img
                src="https://www.pnj.com.vn/design/themes/pnjrovski/media/images/payments/internetBanking.svg"
                alt="Internet Banking"
              />
            </div>
          </p>
        </div>
        <div className="footer-right">
          <p>
            <strong>Follow Us</strong>
            <div className="social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=100024444102993"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.pnj.io/images/image-update/footer/facebook.svg"
                  alt="Facebook"
                  className="social-icon"
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.pnj.io/images/image-update/footer/youtube.svg"
                  alt="YouTube"
                  className="social-icon"
                />
              </a>
              <a
                href="https://www.instagram.com/bedboiz_sg.19/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.pnj.io/images/image-update/footer/instagram.svg"
                  alt="Instagram"
                  className="social-icon"
                />
              </a>
              <a href="mailto:example@example.com">
                <img
                  src="https://cdn.pnj.io/images/image-update/footer/email.svg"
                  alt="Email"
                  className="social-icon"
                />
              </a>
            </div>
          </p>
          <div className="certification">
            <img
              src="https://cdn.pnj.io/images/image-update/op-da-thong-bao-bo-cong-thuong-183x60.png"
              alt="Certification"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
