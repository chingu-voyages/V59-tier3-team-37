import logo from "../../public/logo.png";
import avatar from "../../public/avatar.png";
import pie from "../../public/pie.png";
import red_badge from "../../public/red_badge.png";
import yellow_badge from "../../public/yellow_badge.png";
import green_badge from "../../public/green_badge.png";
import { PieChart, Briefcase, StickyNote, ArrowLeft } from "lucide-react";

export function Dashboard() {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="bg-[#f1f2f6] px-2 rounded-lg flex justify-between items-center h-14">
        <img src={logo.src} alt="Logo" className="h-18" />
        <p className="font-inter text-lg text-[#39393b]">
          SkillPath / Dashboard
        </p>
        <img src={avatar.src} alt="User Avatar" className="h-18 scale-140" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-14 bg-[#f1f2f6] border-r border-[rgba(174,174,174,0.5)] flex flex-col items-center py-6 gap-13">
          <div className="relative w-full flex justify-center">
            <div className="absolute left-0 w-1 h-10 bg-[#5235EF] opacity-25 rounded-r"></div>
            <PieChart size={24} className="text-[#39393B]" />
          </div>
          <Briefcase size={24} className="text-[#39393B] cursor-pointer" />
          <StickyNote size={24} className="text-[#39393B] cursor-pointer" />
          <div className="mt-auto">
            <ArrowLeft size={22} className="text-[#39393B] cursor-pointer" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          <h1 className="text-5xl font-bold py-4 text-black">Hello, Bisi!</h1>

          <div className="bg-[#e0e0ff] rounded-3xl flex items-center gap-4">
            <div className="flex-shrink-0">
              <img src={pie.src} alt="Pie" className="w-40 opacity-50" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-[#5b4df3] text-2xl font-bold">
                Your summary
              </h2>
              <p className="text-[#8e8cb2] text-lg">
                your general stats based on your learning sessions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* SUCCESS RATE CARD */}
            <div className="bg-white border border-gray-200 rounded-[2rem] p-10 flex justify-between items-start shadow-sm">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-4xl font-bold leading-tight text-black">
                    Success <br /> Rate
                  </h3>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-[#c2ffd9]"></span>
                      <span className="text-gray-600 font-medium">Correct</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded-full bg-[#ffc2c2]"></span>
                      <span className="text-gray-600 font-medium">
                        Incorrect
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-500 font-medium mt-auto">3 attempts</p>
              </div>

              <div className="relative flex items-center justify-center">
                {/* FIX: replace with responsive pie chart or animation chart */}
                <div className="w-48 h-48 rounded-full border-[12px] border-[#c2ffd9] border-b-[#ffc2c2] flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-black">
                    75 <span className="text-3xl text-gray-400">/ 100</span>
                  </span>
                  <span className="text-gray-500 font-medium mt-1">Solved</span>
                </div>
              </div>
            </div>

            {/* Badges Card */}
            <div className="bg-white border border-gray-200 rounded-[2rem] p-6 min-h-[350px] flex flex-col justify-between shadow-sm">
              <div>
                <p className="text-gray-500 text-lg font-medium">Badges</p>
                <h3 className="text-4xl font-bold text-black mt-1">3</h3>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={red_badge.src}
                  alt="Red Badge"
                  className="w-30 object-contain scale-160"
                />
                <img
                  src={yellow_badge.src}
                  alt="Elite Badge"
                  className="w-50 object-contain scale-180"
                />
                <img
                  src={green_badge.src}
                  alt="Green Badge"
                  className="w-30 object-contain scale-160"
                />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Most Recent Badge</p>
                <p className="text-black font-bold text-xl">Elite Badge</p>
              </div>
            </div>
          </div>
        </div>
        {/* End of Dashboard Content */}
      </div>
    </div>
  );
}
