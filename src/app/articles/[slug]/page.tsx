import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdown from 'react-markdown';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-white">
      {data.coverImage && (
        <img
          src={data.coverImage}
          alt={data.title}
          className="w-full h-52 md:h-64 object-cover object-top rounded-xl mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-400 text-sm mb-6">{data.date}</p>
      <article className="prose prose-invert max-w-none">
        <Markdown>{content}</Markdown>
      </article>
    </main>
  );
}
