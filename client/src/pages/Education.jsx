
import React, { useEffect, useState } from 'react';
import axios from '../api';

export default function Education() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/articles').then(res => setArticles(res.data));
  }, []);

  const categories = ['all', ...new Set(articles.map(a => a.category))];
  const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);

  return (
    <div className="bg-prithvi-cream min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-prithvi-green mb-8">Education Hub</h1>
        
        <div className="flex overflow-x-auto gap-3 mb-10 pb-2 scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`capitalize px-5 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${filter === c ? 'bg-prithvi-green text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(article => (
            <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
              <div className="h-48 overflow-hidden relative">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-prithvi-green uppercase tracking-wider">
                  {article.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-prithvi-green mb-3 leading-tight">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center text-xs font-medium text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readTime} read
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

