const listElement = document.querySelector('ul');

        fetch('./films.json')
            .then(response => response.json())
            .then(films => {
        
            films.forEach(film => {
                listElement.insertAdjacentHTML('beforeend', '<li>${film.title}</li>')
                console.log(film.title);
            });
        });