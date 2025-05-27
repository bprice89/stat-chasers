import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function ArticlesPage() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'));

  const articles = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join('content', filename), 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
    };
  });

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Articles</h1>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>
              <h2 className="text-lg font-semibold text-blue-600 hover:underline">{article.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">{article.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
