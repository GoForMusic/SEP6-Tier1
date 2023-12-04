
export const addComment = (movieId: string, comment: string, userEmail: string) => async () => {

    try {

        const requestBody = {
            movieId: movieId,
            comment: comment,
            userEmail: userEmail,
          };

        const filteredData = await fetch(`https://tier2.azurewebsites.net/comments${movieId}`, {
            mode: 'cors',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!filteredData.ok) {
            // Handle error if needed
            console.error('Error adding comment:', filteredData.statusText);
          } else {
            // Handle success if needed
            console.log('Comment added successfully!');
          }
        } catch (error) {
          // Handle other errors if needed
          console.error('Error:', error);

    } 

}

export const fetchComments = (movieId: string) =>  async () => {
    try {
      const response = await fetch(`https://tier2.azurewebsites.net/comments${movieId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // Handle error if needed
        console.error('Error fetching comments:', response.statusText);
        return [];
      }
  
      const comments = await response.json();
      return comments;
    } catch (error) {
      // Handle other errors if needed
      console.error('Error:', error);
      return [];
    }
  };
  