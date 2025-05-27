import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  date: string;
  coverImage?: string;
}

export default function HorsesMouthPage() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'));

  const articles: Article[] = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join('content', filename), 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      coverImage: data.coverImage || '/default.jpg',
    };
  });

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Straight from the Horse’s Mouth</h1>

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
                className="h-40 w-full object-cover bg-black"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
              <p className="text-sm text-gray-500">{article.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
