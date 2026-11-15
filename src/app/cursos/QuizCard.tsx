'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/types';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface QuizCardProps {
  questions: QuizQuestion[];
  courseTitle: string;
}

/**
 * Cuestionario de ejemplo del curso: una pregunta por bloque con feedback
 * inmediato y explicación. Todo lo que ocurre aquí es local y ficticio.
 */
export function QuizCard({ questions, courseTitle }: QuizCardProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );

  if (questions.length === 0) {
    return null;
  }

  const answeredCount = answers.filter((a) => a !== null).length;
  const correctCount = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const allAnswered = answeredCount === questions.length;
  const pct = Math.round((correctCount / questions.length) * 100);

  const pick = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => {
      if (prev[questionIndex] !== null) return prev; // una sola respuesta por pregunta
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  return (
    <section className="quiz-card" aria-labelledby="quiz-title">
      <div className="quiz-head">
        <h2 id="quiz-title">Cuestionario de ejemplo</h2>
        <span className="chip">{answeredCount}/{questions.length} respondidas</span>
      </div>
      <p className="quiz-intro">
        Comprueba cuánto has entendido de «{courseTitle}». Una respuesta por pregunta,
        con explicación al elegir. Contenido ilustrativo de muestra.
      </p>

      {questions.map((q, qi) => {
        const chosen = answers[qi];
        return (
          <fieldset key={qi} className="quiz-q">
            <legend><strong>{qi + 1}.</strong> {q.question}</legend>
            <div className="quiz-options">
              {q.options.map((option, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = q.correctIndex === oi;
                const revealed = chosen !== null;
                let cls = 'quiz-option';
                if (revealed && isCorrect) cls += ' is-correct';
                else if (revealed && isChosen) cls += ' is-wrong';
                else if (isChosen) cls += ' is-chosen';
                return (
                  <button
                    key={oi}
                    type="button"
                    className={cls}
                    disabled={revealed}
                    aria-pressed={isChosen}
                    onClick={() => pick(qi, oi)}
                  >
                    <span className="quiz-option-letter" aria-hidden="true">{LETTERS[oi]}</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
            {chosen !== null && (
              <p className="quiz-explanation" role="status">
                {chosen === q.correctIndex ? '✅ Correcta. ' : '❌ Incorrecta. '}
                {q.explanation}
              </p>
            )}
          </fieldset>
        );
      })}

      {allAnswered && (
        <p className="quiz-result" role="status" aria-live="polite">
          Resultado del cuestionario: <strong>{correctCount}/{questions.length} correctas ({pct}%)</strong>.
          {pct >= 60
            ? ' Vas con buen pie: sigue por aquí.'
            : ' Repasa las lecciones marcadas y vuelve a intentarlo.'}
          {' '}Este resultado es solo orientativo y no es una evaluación oficial.
        </p>
      )}
    </section>
  );
}
