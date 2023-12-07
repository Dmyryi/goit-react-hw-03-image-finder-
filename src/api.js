import axios from 'axios';

const apiKey = '22964676-aac3c7ed7126080ab92aa911f';

export const getImages = (words, page) => {
  return axios.get(
    `https://pixabay.com/api/?q=${words}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
};