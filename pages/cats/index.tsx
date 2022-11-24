import React from "react";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useCats } from "../../graphql/hooks/useCats";

type Props = {};

const CatsLIst = (props: Props) => {
  const { error, loading, data } = useCats();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <h1>Cats Listz</h1>
      {data.cats.data.map((cat) => {
        return (
          <div key={cat.id}>
            <div
              style={{
                border: "1px solid black",
                width: "300px",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              <Link href={`/cats/${cat.id}`}>
                <h4>{cat.attributes.name}</h4>
                <p>Color: {cat.attributes.color}</p>
                <p>Age: {cat.attributes.age}</p>
                <p>Date of Birth: {cat.attributes.dob}</p>
                <img src={cat.attributes.imageUrl} width="200px" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CatsLIst;
