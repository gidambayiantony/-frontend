const { SitemapStream, streamToPromise } = require('sitemap');
const { createReadStream, createWriteStream } = require('fs');
const { MongoClient } = require('mongodb');

async function generateSitemap() {
  const client = new MongoClient('mongodb://your-mongodb-url');
  await client.connect();

  const db = client.db('your-database-name');
  const collection = db.collection('your-collection-name');

  const sitemap = new SitemapStream({ hostname: 'https://your-website-url' });

  const cursor = collection.find();
  const docs = await cursor.toArray();

  for (const doc of docs) {
    sitemap.write({ url: doc.url, changefreq: 'daily', priority: 0.7 });
  }

  sitemap.end();

  const xml = await streamToPromise(sitemap);

  const writeStream = createWriteStream('./public/sitemap.xml');
  writeStream.write(xml);
  writeStream.end();

  await client.close();
}

generateSitemap();

