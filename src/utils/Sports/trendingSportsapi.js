
// const API_KEY = '521745b0161142c59f91e7e334cdcc04'; //API key of newsapi.org, user: sujaykumar 
const API_KEY = '09f7b9ab6f40422db38cf719b73af457'
const API_URL = 'https://newsapi.org/v2/top-headlines';
const CATEGORY = "sports";
const COUNTRIES = ['us', 'gb', 'au', 'ca']; // Example array of countries

export const getTrendingSportsNews = async () => {
  try {
    const allNews = [];
    for (const country of COUNTRIES) {
      const response = await fetch(`${API_URL}?category=${CATEGORY}&country=${country}&apiKey=${API_KEY}`);
      const data = await response.json();
      if (data.status === 'ok') {
        allNews.push(...data.articles);
      } else {
        throw new Error(data.message || `Failed to fetch news for ${country}`);
      }
    }
    return allNews;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch news');
  }
};
