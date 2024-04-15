// utils/api.js

const API_KEY = '09f7b9ab6f40422db38cf719b73af457'
const API_URL = 'https://newsapi.org/v2/top-headlines';
const DEFAULT_COUNTRY = 'us';

export const getNews = async () => {
  try {
    const response = await fetch(`${API_URL}?country=${DEFAULT_COUNTRY}&apiKey=${API_KEY}`);
    const data = await response.json();
    if (data.status === 'ok') {
      return data.articles;
    } else {
      throw new Error(data.message || 'Failed to fetch news');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch news');
  }
};
