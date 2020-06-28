const YouTube = require('youtube-node');
const config = require('./yt.config.json');

const youtube = new YouTube();

youtube.setKey(config.key);

function searchVideoURL(message, queryText) {
  return new Promise((resolve, reject) => {
    youtube.search(`Treino em casa para emagrecimento ${queryText}`, 2,(error, result) => {
        if (!error) {
          const videoIds = result.items
            .map((item) => item.id.videoId)
            .filter((item) => item);
          const youtubeLinks = videoIds.map(
            (videoId) => `https://www.youtube.com/watch?v=${videoId}`
          );
          resolve(`${message} ${youtubeLinks.join(`,`)}`);
        } else {
          reject('Não localizei seu treino!');
        }
      }
    );
  });
  
};

module.exports.searchVideoURL = searchVideoURL
  




