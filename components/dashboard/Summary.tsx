import { getAuth } from "firebase/auth";
import Image from "next/image";
import green_badge from "../../public/green_badge.png";
import pie from "../../public/pie.png";
import red_badge from "../../public/red_badge.png";
import yellow_badge from "../../public/yellow_badge.png";

interface SummaryProps {
  totalScore: { correct: number; total: number };
}

export default function Summary({ totalScore }: SummaryProps) {
  const auth = getAuth();
  const userName = auth?.currentUser?.displayName || null;
  const { correct, total } = totalScore;

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h1 className="text-5xl font-bold py-4 text-black">Hello, {userName}</h1>

      <div className="bg-[#e0e0ff] rounded-3xl flex items-center gap-4">
        <div className="flex-shrink-0">
          <Image src={pie} alt="Pie" className="w-40 opacity-50" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[#5b4df3] text-2xl font-bold">Your summary</h2>
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
                  <span className="text-gray-600 font-medium">Incorrect</span>
                </div>
              </div>
            </div>

            <p className="text-gray-500 font-medium mt-auto">
              {total > 0 ? `${total} questions attempt` : "No attempts yet"}
            </p>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-[12px] border-[#c2ffd9] border-b-[#ffc2c2] flex flex-col items-center justify-center">
              {total > 0 ? (
                <>
                  <span className="text-5xl font-bold text-black">
                    {correct}{" "}
                    <span className="text-3xl text-gray-400">/ {total}</span>
                  </span>
                  <span className="text-gray-500 font-medium mt-1">
                    {Math.round((correct / total) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-gray-400 text-center text-sm px-4">
                  Complete a quiz to see your score
                </span>
              )}
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
            <Image
              src={red_badge}
              alt="Red Badge"
              className="w-30 object-contain scale-160"
            />
            <Image
              src={yellow_badge}
              alt="Elite Badge"
              className="w-50 object-contain scale-180"
            />
            <Image
              src={green_badge}
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
  );
}
