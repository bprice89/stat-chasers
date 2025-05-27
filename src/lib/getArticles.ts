import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getArticles(limit = 3) {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'));

  return files
    .map((filename) => {
      const fileContent = fs.readFileSync(path.join('content', filename), 'utf-8');
      const { data } = matter(fileContent);
      return {
        slug: filename.replace('.md', ''),
        title: data.title,
        date: new Date(data.date).toISOString().split('T')[0], 
        coverImage: data.coverImage,
        tags: data.tags || [], // ← add this
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, limit);
}
