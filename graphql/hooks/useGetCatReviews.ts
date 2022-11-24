import { useLazyQuery, gql } from "@apollo/client";

const GET_CAT_REVIEWS = gql`
  query getCatReviews($id: ID!) {
    reviews(sort: "createdAt:desc", filters: { cat: { id: { eq: id } } }) {
      data {
        id
        attributes {
          content
          rating
          createdAt
        }
      }
    }
  }
`;

export const useGetCatReviews = (id: number) => {
  const [getReviews, { called, loading, data }] = useLazyQuery(
    GET_CAT_REVIEWS,
    {
      variables: { id },
    }
  );
  return { called, loading, data };
};
