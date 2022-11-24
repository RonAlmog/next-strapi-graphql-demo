import { useQuery, gql } from "@apollo/client";

const GET_CAT = gql`
  query GetCat($id: ID!) {
    cat(id: $id) {
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

export const useCat = (id: number) => {
  const { error, data, loading } = useQuery(GET_CAT, {
    variables: {
      id,
    },
  });

  return { error, data, loading };
};
