'use client';

export default function SkillsPage() {
  return (
    <main className="page-solid px-4 sm:px-6 py-8 sm:py-12 pt-20">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-lg sm:text-xl font-bold text-[#3e0097] dark:text-brand mb-6 sm:mb-10">Skills</h1>

        {/* Special Skills Section */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#3e0097] dark:text-brand mb-3 sm:mb-4">Special Skills</h2>
          <ul className="space-y-3 list-disc pl-5 sm:pl-6 text-base sm:text-lg">
            <li><strong>Focus Area:</strong> Frontend development with React.js, Next.js — building responsive and user-friendly web interfaces</li>
            <li><strong>Tech Stack:</strong> React.js, Next.js, Express.js</li>
            <li><strong>Databases:</strong> SQL Server (Query optimization), MongoDB</li>
           <li><strong>Other:</strong> Eager to learn, detail-oriented, meets deadlines</li>

          </ul>
        </div>

        {/* All Skills Table */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#3e0097] dark:text-brand mb-3 sm:mb-4">All Skills</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="min-w-[520px] sm:min-w-full w-full border border-gray-300 dark:border-slate-600 text-left text-sm sm:text-base">
              <thead className="bg-purple-100 dark:bg-slate-800 text-[#3e0097] dark:text-brand">
                <tr>
                  <th className="py-2 px-3 sm:px-4 border whitespace-nowrap">Category</th>
                  <th className="py-2 px-3 sm:px-4 border">Technologies / Tools</th>
                </tr>
              </thead>
              <tbody>
                {[
                 
                  ['Frontend', 'HTML5, CSS3, Bootstrap, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS'],
                  ['Backend & API', 'Node.js, Express.js'],
                  ['Databases', 'MS SQL Server (T-SQL),MongoDB'],
                  ['Concepts', 'OOP, SOLID, Design Patterns, Data Structures, Algorithms, HTTP'],
                  ['Tools', 'VS Code, GitHub, Postman, Figma'],
                ].map(([category, tools], i) => (
                  <tr key={i} className="border-t dark:border-slate-600">
                    <td className="py-2 px-3 sm:px-4 border dark:border-slate-600 font-medium whitespace-nowrap align-top">{category}</td>
                    <td className="py-2 px-3 sm:px-4 border dark:border-slate-600 align-top">{tools}</td>
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
