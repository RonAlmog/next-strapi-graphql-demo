import { useQuery, gql } from "@apollo/client";

type Props = {};
const GET_CATS = gql`
  query Cats {
    cats {
      data {
        id
        attributes {
          name
          age
          color
          dob
          imageUrl
        }
      }
    }
  }
`;

export const useCats = () => {
  const { error, data, loading } = useQuery(GET_CATS);

  return { error, data, loading };
};
