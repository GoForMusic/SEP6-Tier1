import {PREV_PAGE, NEXT_PAGE, RESET_PAGE} from "../constants/movies"

export const prevPage = () => ({
  type: PREV_PAGE,
});

export const nextPage = () => ({
  type: NEXT_PAGE,
});
export const resetPage = () => ({
  type: RESET_PAGE,
})