import { BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-customBlue flex    flex-row text-white p-7 justify-center  items-center">
      <div className=" flex w-full flex-row max-[700px]:flex-col max-[700px]:gap-[8px] max-[700px]:items-center max-w-[1300px] justify-between items-center">
        <div className="flex flex-row max-[700px]:flex-col max-[700px]:items-center max-[700px]:gap-[8px] items-center">
          <ul className="flex flex-row  gap-5 items-center ml-3">
            <Image
              src="/images/swift-white.png"
              width={30}
              height={30}
              alt="swift logo"
            />
            <h1>© business, 2023</h1>
            <h1 className="mr-[20px] max-[700px]:hidden">|</h1>
          </ul>
          <div className="cursor-pointer">
            <h1>idk</h1>
          </div>
        </div>
        <ul className="flex flex-row gap-2 items-center fill-white">
          <a target="_blank" rel="noreferrer" href="">
            <BsFacebook
              size={20}
              className="hover:fill-[#F4A0FD]  cursor-pointer"
            />
          </a>
          <a target="_blank" rel="noreferrer" href="">
            <BsLinkedin
              size={20}
              className="hover:fill-[#F4A0FD] cursor-pointer"
            />
          </a>
          <a target="_blank" rel="noreferrer" href="">
            <BsTwitter
              size={20}
              className="hover:fill-[#F4A0FD] cursor-pointer"
            />
          </a>
          <a target="_blank" rel="noreferrer" href="">
            <GrMail size={24} className="hover:fill-[#F4A0FD] cursor-pointer" />
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
