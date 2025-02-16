"use client";
import GoToTopButton from "@/components/button/go-top";
import { Twitter, Facebook, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-10 w-full">
      <GoToTopButton />
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* Giới thiệu */}
          <div>
            <h3 className="font-bold uppercase mb-4">GIỚI THIỆU</h3>
            <p>Email: info@eltamd.vn</p>
            <h3 className="font-bold uppercase mt-6 mb-2">
              THỜI GIAN LÀM VIỆC
            </h3>
            <p>Thứ 2 - Chủ Nhật: 8:00a.m - 8:30p.m</p>
            <p>Ngày lễ: Không hoạt động</p>
          </div>

          {/* Về EltaMD */}
          <div>
            <h3 className="font-bold uppercase mb-4">VỀ ELTAMD</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  EltaMD Global
                </a>
              </li>
            </ul>
          </div>

          {/* Thông tin */}
          <div>
            <h3 className="font-bold uppercase mb-4">THÔNG TIN</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách vận chuyển
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hướng dẫn mua hàng
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Thanh toán */}
          <div>
            <h3 className="font-bold uppercase mb-4">SOCIAL</h3>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-400" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-400" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-400" />
              {/* <Pinterest className="w-5 h-5 cursor-pointer hover:text-gray-400" /> */}
            </div>

            <h3 className="font-bold uppercase mt-6 mb-4">THANH TOÁN</h3>
            <div className="flex space-x-4">
              <Image
                src="https://theme.hstatic.net/1000288528/1000382531/14/footer_payment.png?v=126"
                alt="MoMo"
                width={40}
                height={25}
              />
              <Image
                src="https://theme.hstatic.net/1000288528/1000382531/14/footer_payment.png?v=126"
                alt="Internet Banking"
                width={40}
                height={25}
              />
              <Image
                src="https://theme.hstatic.net/1000288528/1000382531/14/footer_payment.png?v=126"
                alt="Visa"
                width={40}
                height={25}
              />
              <Image
                src="https://theme.hstatic.net/1000288528/1000382531/14/footer_payment.png?v=126"
                alt="MasterCard"
                width={40}
                height={25}
              />
            </div>

            <div className="flex space-x-4 mt-4">
              <Image
                src="https://theme.hstatic.net/1000288528/1000382531/14/footer_payment_2.png?v=126"
                alt="SSL Secure"
                width={50}
                height={30}
              />
              <Image
                src="https://theme.hstatic.net/1000288528/1000382531/14/footer_payment_3.png?v=126"
                alt="McAfee Secure"
                width={50}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
