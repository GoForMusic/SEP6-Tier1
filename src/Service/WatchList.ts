const API_BASE_URL = "https://tier2.azurewebsites.net";

export const addToWatchlist = async (account_id: any, movie_id: any) => {
    try {
        const response = await fetch(`${API_BASE_URL}/WatchList`, {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( {
                "account_id": account_id,
                "movie_id" : movie_id
             }) 
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
      } catch (error) {
        console.error("There was a problem adding the movie to the watchlist:", error);
      }
    };

    export const removeFromWatchlist = async (watchlistMovieId: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/WatchList/${watchlistMovieId}`, {
              mode: "cors",
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          } catch (error) {
            console.error("There was a problem removing the movie from the watchlist:", error);
          }
        };

    export const getFromWatchlist = async (account_id: any, page: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/WatchList/${account_id}?pageNumber=${page}`, {
              mode: "cors",
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            return response.json();
          } catch (error) {
            console.error("There was a problem fetching the movies from the watchlist:", error);
          }
        };