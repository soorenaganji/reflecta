"use client";

import { useRouter } from "next/navigation";
import { useRequireStep1 } from "@/utils/guard";
import InstructionWrapper from "@/components/InstructionWrapper";
import { useLanguage } from "@/components/LanguageProvider";

export default function Step2() {
  const router = useRouter();
  useRequireStep1(); // Guard added here
  const { t } = useLanguage();

  const steps = [
    { key: "instruction1", label: t("instruction1_label") },
    { key: "instruction2", label: t("instruction2_label") },
    { key: "instruction3", label: t("instruction3_label") },
  ];

  return (
    <InstructionWrapper
      steps={steps}
      onFinish={() => router.push("/form/step3")}
    >
      {({ step, onNext }) => {
        const content = {
          instruction1: (
            <p
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("instruction1_text") }}
            />
          ),
          instruction2: (
            <p
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("instruction2_text") }}
            />
          ),
          instruction3: (
            <p
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("instruction3_text") }}
            />
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
