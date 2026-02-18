import { FearCard } from "./FearCard";

export default function InterviewFears() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Interviews should <br /> not be that hard
        </h2>

        {/* Subtitle */}
        <p className="text-[#39393B] max-w-2xl mx-auto mb-14">
          You apply, you get the call, but what happens
          <br /> inside the interview room is a mystery.
        </p>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 ">
          <FearCard
            title={
              <>
                Fear of <br />
                the Unknown Question
              </>
            }
            description="The paralyzing worry that you will be asked a curveball, or a highly technical scenario."
          />

          <FearCard
            title={
              <>
                Fear of <br /> Inadequate Depth
              </>
            }
            description="The anxiety that their answers will lack the industry nuance the interviewer is secretly listening for."
          />

          <FearCard
            title={
              <>
                Fear of <br />
                Repetitive, Generic Prep
              </>
            }
            description='The frustration of wasting limited preparation time on the same "top 10 questions" found online.'
          />
        </div>
      </div>
    </section>
  );
}
