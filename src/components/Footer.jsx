import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import passLogo from "../assets/images/pass_log-removebg-preview.png";

const Footer = () => {
  return (
    <div className="bg-red-primary text-red-50">
      <div className="container mx-auto grid md:grid-cols-[1.5fr_.5fr] md:gap-5 p-5 md:px-20 pb-0">
        <div className="p-5">
          <h2 className="font-bold text-lg">CONTACT US</h2>
          <div className="p-2 mt-2 border-b-2">
            <div className="flex space-x-2 space-y-2">
              <MapPin />
              <span>5X4H+M5R, Quezon Ave, Alaminos, 2404 Pangasinan</span>
            </div>
            <div className="flex space-x-2 space-y-2">
              <Phone />
              <span>(075) 654 0001</span>
            </div>
            <div className="flex space-x-2 space-y-2">
              <Mail />
              <span>pass.college.alaminos@gmail.com</span>
            </div>
          </div>
          <h2 className="font-bold text-lg mt-5">SOCIAL MEDIA</h2>
          <div className="flex justify-start items-center gap-3 p-2">
            <Facebook />
            <Twitter />
            <Instagram />
            <Youtube />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img className="w-1/2 md:w-full  2xl:w-7/10" src={passLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
