
import Link from 'next/link';
import { getArticles } from '@/lib/getArticles';


export default function HomePage() {
  const articles = getArticles();

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] mb-12 flex items-center justify-center overflow-hidden">
        {/* background image layer */}
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center z-0" />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />


        {/* text content */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Fantasy Stat Chasers
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4 drop-shadow">
            Data-driven picks. Deep analysis. Weekly domination.
          </p>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <Link href="/horses-mouth" className="bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-2 text-white">🐴 Straight from the Horse’s Mouth</h2>
          <p className="text-gray-200">Fantasy advice and betting insights written by pros.</p>
        </Link>
        <Link href="/stats" className="bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-2 text-white">📊 Player Stats</h2>
          <p className="text-gray-200">Explore advanced player and team metrics.</p>
        </Link>
        <Link href="/bets" className="bg-gradient-to-br from-blue-700 to-indigo-800 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <h2 className="text-xl font-semibold mb-2 text-white">🎯 J-Breezy’s Best Bets</h2>
          <p className="text-gray-200">Simulators, projections, and matchup visualizers.</p>
        </Link>
      </section>


      {/* Recent Articles */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.01] transition"
            >
              {article.coverImage && (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="h-40 w-full object-contain bg-black"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Ad Placeholder */}
      <section className="bg-gray-100 text-center p-6 text-sm text-gray-500 border border-dashed border-gray-400">
        Ad space (future 300x250 block)
      </section>
    </main>
  );
}
