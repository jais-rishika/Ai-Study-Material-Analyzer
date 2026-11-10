"use client";

import { useState } from "react";

type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export default function QuizClient({ quiz }: { quiz: QuizQuestion[] }) {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});

  const handleAnswer = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Quiz</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Test your understanding
          </h1>
        </div>

        <span className="text-sm font-medium text-slate-400">
          {quiz.length} questions
        </span>
      </div>

      <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-1/5 rounded-full bg-indigo-500" />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        {quiz.map((q, questionIndex) => {
          const selected = selectedAnswers[questionIndex];

          return (
            <div key={questionIndex} className="mt-2">
              <p className="text-sm font-medium text-slate-400">
                Question {String(questionIndex + 1).padStart(2, "0")}
              </p>

              <h2 className="mt-3 text-xl font-semibold leading-8">
                {q.question}
              </h2>

              <div className="mt-5 space-y-3">
                {q.options.map((option, optionIndex) => {
                  const isSelected = selected === option;
                  const isCorrect = option === q.answer;

                  let buttonClass =
                    "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30";

                  if (isSelected) {
                    buttonClass = isCorrect
                      ? "border-green-300 bg-green-100"
                      : "border-red-300 bg-red-100";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(questionIndex, option)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${buttonClass}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-500">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>

                      <span className="text-sm text-slate-700">{option}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-b-2 border-gray-200" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
