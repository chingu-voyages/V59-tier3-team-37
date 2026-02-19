import Image from "next/image";
import avatar from "../../public/avatar.png";
import logo from "../../public/logo.png";

export default function TopNavbar() {
  return (
    <div className="bg-[#f1f2f6] px-2 rounded-lg flex justify-between items-center h-14">
      <Image src={logo} alt="Logo" className="h-18" />
      <p className="font-inter text-lg text-[#39393b]">SkillPath / Dashboard</p>
      <Image src={avatar} alt="User Avatar" className="h-18 scale-140" />
    </div>
  );
}
