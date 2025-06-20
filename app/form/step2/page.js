"use client";

import { useRouter } from "next/navigation";
import { useRequireStep1 } from "@/utils/guard";
import InstructionWrapper from "@/components/InstructionWrapper";

const steps = [
  { key: "instruction1", label: "Instruction 1 of 3" },
  { key: "instruction2", label: "Instruction 2 of 3" },
  { key: "instruction3", label: "Instruction 3 of 3" },
];

export default function Step2() {
  const router = useRouter();
  useRequireStep1(); // Guard added here

  return (
    <InstructionWrapper
      steps={steps}
      onFinish={() => router.push("/form/step3")}
    >
      {({ step, onNext }) => {
        const content = {
          instruction1: (
            <p className="leading-relaxed">
              In this task, you will be asked to memorize numbers that appear on
              the screen.
              <br />
              All numbers are between 0 and 9 — we refer to them as{" "}
              <strong>digits</strong>.
              <br />
              You will see a sequence of digits, one at a time.
              <br />
              Try to remember the full sequence.
            </p>
          ),
          instruction2: (
            <p className="leading-relaxed">
              After seeing the digits, you&apos;ll be asked to type them{" "}
              <strong>in the exact order</strong> they appeared.
              <br />
              Use the <strong>number input field</strong> to enter your
              response.
              <br />
              For example, if you saw <code>3 7 2</code>, you should type{" "}
              <code>372</code>.
              <br />
              If you make a mistake, you can clear the field and retype.
              <br />
              After submitting, the system will tell you if your answer was
              correct.
            </p>
          ),
          instruction3: (
            <p className="leading-relaxed">
              You will need to remember several sequences.
              <br />
              Each sequence will get <strong>longer</strong> as you go.
              <br />
              The test continues until you can no longer remember the digits
              correctly.
              <br />
              At the end, your score will be shown — this is called your{" "}
              <strong>&quot;digit span&quot;</strong>.
            </p>
          ),
        };

        return (
          <div className="text-base text-gray-800 space-y-4">
            {content[step.key]}
          </div>
        );
      }}
    </InstructionWrapper>
  );
}
