export const fetchFromOurDb = async (movieId: any) => {
  try {
    const movieDetails = await fetch(
      `https://tier2.azurewebsites.net/movie/${movieId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!movieDetails.ok) {
      console.error("Error fetching comments:", movieDetails.statusText);
      return [];
    }
    console.log("heeeeeeeeeereeeeeeeee");

    const movies = await movieDetails.json();

    console.log("testing the thunk rerefefefe", movies);
    return movies;
  } catch (error) {
    console.error(error);
  }
};
