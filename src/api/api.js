const fetchImages = (search) => {
  const url = `https://pixabay.com/api/?q=${search}&page=1&key=22964676-aac3c7ed7126080ab92aa911f&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data.hits)
    .catch(error => {
      console.error('Error fetching images:', error);
      return [];
    });
};

export default fetchImages;