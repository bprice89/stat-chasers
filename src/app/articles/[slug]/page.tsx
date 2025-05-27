export const dynamic = 'force-dynamic';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
interface ArticlePageProps {
  params: { slug: string };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const filePath = path.join(process.cwd(), 'content', `${params.slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-white">
      {data.coverImage && (
        <img
          src={data.coverImage}
          alt={data.title}
          className="rounded-lg w-full object-cover mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-400 text-sm mb-6">
        {typeof data.date === 'string'
          ? data.date
          : new Date(data.date).toLocaleDateString()}
      </p>

      <article className="prose prose-invert max-w-none prose-p:my-6 prose-li:my-3 prose-h3:mt-10 prose-h3:mb-4">
        <div style={{ whiteSpace: 'pre-line' }}>
          <Markdown remarkPlugins={[remarkBreaks, remarkGfm]}>
            {content}
          </Markdown>
        </div>
      </article>
    </main>
  );
}
