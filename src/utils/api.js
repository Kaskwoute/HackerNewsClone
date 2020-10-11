const HN_DB_URI = 'https://hacker-news.firebaseio.com';

const HN_API_VERSION = '/v0';

const HN_API_URL = `${ HN_DB_URI }${ HN_API_VERSION }`;

const genUrl = (url) => `${ HN_API_URL }/${ url }.json`;

const getUrlBestStories = () => genUrl('beststories');

const getUrlItem = (id) => genUrl(`item/${ id }`);

export {
  getUrlBestStories, getUrlItem
}