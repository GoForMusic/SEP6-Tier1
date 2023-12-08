import {PREV_PAGE, NEXT_PAGE} from "../constants/movies"

export const prevPage = () => ({
  type: PREV_PAGE,
});

export const nextPage = () => ({
  type: NEXT_PAGE,
});
