const SpotifyAPI = (() => {
    
    // const clientId = 'b1b168272e464c94969469175b3af00e';
    // const clientSecret = '732cf02d2b22432f8f4f5c29b87a66ff';

    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(config.tacobell + ':' + config.perro)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.playlists.items;
        
    }

    const _getPlayListBySearch = async (token, searchQuery) => {

        const limit = 10;
        
        const result = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data;
        
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getPlayListBySearch(token, searchQuery) {
            return _getPlayListBySearch(token, searchQuery);
        }
    }
})();


SpotifyAPI.getToken().then(token => {
    SpotifyAPI.getPlayListBySearch(token, weatherMood).then(playlists => {
        let url = playlists.playlists.items[Math.floor(Math.random() * 5)].external_urls.spotify
        fetch(`https://embed.spotify.com/oembed?url=${url}`)
            .then(response => response.json())
            .then(data => {
                var spotify = document.getElementById('spotify_embed')
                spotify.innerHTML = data.html;
            });
    })
});