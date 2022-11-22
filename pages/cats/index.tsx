import React from "react";
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
        }
      }
    }
  }
`;

const CatsLIst = (props: Props) => {
  const { error, loading, data } = useQuery(GET_CATS);
  console.log(error, loading, data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <h1>Cats Listz</h1>
      {data.cats.data.map((cat) => {
        return (
          <div key={cat.id}>
            <div>
              <h4>{cat.attributes.name}</h4>
              <p>Color: {cat.attributes.color}</p>
              <p>Age: {cat.attributes.age}</p>
              <p>Date of Birth: {cat.attributes.dob}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CatsLIst;
