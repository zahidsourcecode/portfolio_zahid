'use client';

const skillRows = [
  ['Frontend', 'HTML5, CSS3, Bootstrap, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS'],
  ['Backend & API', 'Node.js, Express.js'],
  ['Databases', 'MS SQL Server (T-SQL), MongoDB'],
  ['Concepts', 'OOP, SOLID, Design Patterns, Data Structures, Algorithms, HTTP'],
  ['Tools', 'VS Code, GitHub, Postman, Figma'],
];

export default function SkillsPage() {
  return (
    <main className="page-gradient min-w-0 overflow-x-hidden px-3 sm:px-6 py-8 sm:py-12 pt-16 sm:pt-20 pb-10">
      <section className="mx-auto max-w-6xl min-w-0">
        <h1 className="mb-6 text-lg font-bold text-[#3e0097] dark:text-brand sm:mb-10 sm:text-xl">
          Skills
        </h1>

        <div className="mb-8 sm:mb-12">
          <h2 className="mb-3 text-xl font-semibold text-[#3e0097] dark:text-brand sm:mb-4 sm:text-2xl">
            Special Skills
          </h2>
          <ul className="list-disc space-y-3 pl-5 text-base sm:pl-6 sm:text-lg">
            <li>
              <strong>Focus Area:</strong> Frontend development with React.js, Next.js — building
              responsive and user-friendly web interfaces
            </li>
            <li>
              <strong>Tech Stack:</strong> React.js, Next.js, Express.js
            </li>
            <li>
              <strong>Databases:</strong> SQL Server (Query optimization), MongoDB
            </li>
            <li>
              <strong>Other:</strong> Eager to learn, detail-oriented, meets deadlines
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-[#3e0097] dark:text-brand sm:mb-4 sm:text-2xl">
            All Skills
          </h2>

          <div className="space-y-3 sm:hidden">
            {skillRows.map(([category, tools]) => (
              <article
                key={category}
                className="rounded-xl border border-gray-200 bg-white/80 p-4 shadow-sm dark:border-slate-600 dark:bg-slate-800/80"
              >
                <h3 className="mb-2 text-sm font-semibold text-[#3e0097] dark:text-brand">
                  {category}
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {tools}
                </p>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto sm:block">
            <table className="w-full border border-gray-300 text-left text-sm dark:border-slate-600 sm:text-base">
              <thead className="bg-purple-100 text-[#3e0097] dark:bg-slate-800 dark:text-brand">
                <tr>
                  <th className="border px-4 py-2 whitespace-nowrap">Category</th>
                  <th className="border px-4 py-2">Technologies / Tools</th>
                </tr>
              </thead>
              <tbody>
                {skillRows.map(([category, tools]) => (
                  <tr key={category} className="border-t dark:border-slate-600">
                    <td className="border px-4 py-2 align-top font-medium whitespace-nowrap dark:border-slate-600">
                      {category}
                    </td>
                    <td className="border px-4 py-2 align-top dark:border-slate-600">{tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
