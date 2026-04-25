import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"
import Icon from "@/components/ui/icon"

const tasks = [
  {
    number: "01",
    title: "Задача на производную",
    category: "Задание 7 · Дифференциальное исчисление",
    difficulty: "Базовый",
    direction: "left",
    condition:
      "Найдите точку минимума функции f(x) = x³ − 3x² − 9x + 5.",
    solution: [
      "Находим производную: f′(x) = 3x² − 6x − 9",
      "Приравниваем к нулю: 3x² − 6x − 9 = 0 → x² − 2x − 3 = 0",
      "Решаем: (x − 3)(x + 1) = 0 → x = 3, x = −1",
      "Знак f′: при x < −1 (+), при −1 < x < 3 (−), при x > 3 (+)",
      "x = −1 — максимум, x = 3 — минимум",
    ],
    answer: "x = 3",
  },
  {
    number: "02",
    title: "Логарифмическое уравнение",
    category: "Задание 13 · Логарифмы",
    difficulty: "Повышенный",
    direction: "right",
    condition:
      "Решите уравнение: log₂(x + 3) + log₂(x − 1) = 3",
    solution: [
      "ОДЗ: x + 3 > 0 и x − 1 > 0 → x > 1",
      "Объединяем логарифмы: log₂((x+3)(x−1)) = 3",
      "Потенцируем: (x+3)(x−1) = 8",
      "Раскрываем скобки: x² + 2x − 3 = 8 → x² + 2x − 11 = 0",
      "По формуле: x = (−2 ± √48) / 2 = −1 ± 2√3",
      "x = −1 + 2√3 ≈ 2,46 удовлетворяет ОДЗ; x = −1 − 2√3 < 1 — не входит",
    ],
    answer: "x = −1 + 2√3",
  },
  {
    number: "03",
    title: "Тригонометрическое неравенство",
    category: "Задание 15 · Тригонометрия",
    difficulty: "Высокий",
    direction: "left",
    condition:
      "Решите неравенство: 2sin²x − sinx − 1 < 0",
    solution: [
      "Замена t = sinx, где t ∈ [−1; 1]",
      "Квадратное неравенство: 2t² − t − 1 < 0",
      "Корни: t = 1 и t = −1/2",
      "Неравенство выполняется при −1/2 < t < 1, то есть −1/2 < sinx < 1",
      "sinx > −1/2: x ∈ (−π/6 + 2πn; π + π/6 + 2πn)",
      "sinx < 1: x ≠ π/2 + 2πn",
    ],
    answer: "x ∈ (−π/6 + 2πn; 7π/6 + 2πn), x ≠ π/2 + 2πn, n ∈ ℤ",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [openTask, setOpenTask] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Задачи
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Разбор с решением</p>
        </div>

        <div className="space-y-4 md:space-y-5">
          {tasks.map((task, i) => (
            <TaskCard
              key={i}
              task={task}
              index={i}
              isVisible={isVisible}
              isOpen={openTask === i}
              onToggle={() => setOpenTask(openTask === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TaskCard({
  task,
  index,
  isVisible,
  isOpen,
  onToggle,
}: {
  task: (typeof tasks)[0]
  index: number
  isVisible: boolean
  isOpen: boolean
  onToggle: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return task.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left transition-all duration-300 hover:border-foreground/20 md:py-5"
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
            {task.number}
          </span>
          <div>
            <h3 className="mb-0.5 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
              {task.title}
            </h3>
            <p className="font-mono text-xs text-foreground/50 md:text-sm">{task.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-foreground/20 px-3 py-0.5 font-mono text-xs text-foreground/60 md:inline">
            {task.difficulty}
          </span>
          <Icon
            name="ChevronDown"
            size={18}
            className={`text-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-b border-foreground/10 bg-foreground/5 px-4 py-5 md:px-8 md:py-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-xs text-foreground/50">УСЛОВИЕ</p>
              <p className="text-sm leading-relaxed text-foreground/90 md:text-base">{task.condition}</p>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs text-foreground/50">РЕШЕНИЕ</p>
              <ol className="space-y-1.5">
                {task.solution.map((step, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed text-foreground/80 md:text-base">
                    <span className="shrink-0 font-mono text-foreground/30">{j + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/10 px-4 py-2">
                <span className="font-mono text-xs text-foreground/60">Ответ:</span>
                <span className="font-sans text-sm font-medium text-foreground md:text-base">{task.answer}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
