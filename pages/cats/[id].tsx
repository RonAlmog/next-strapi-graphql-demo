import React from "react";
import { useRouter } from "next/router";
import { useCat } from "../../graphql/hooks/useCat";
import Link from "next/link";
import { useLazyQuery, gql } from "@apollo/client";

const GET_CAT_REVIEWS = gql`
  query getCatReviews($id: ID!) {
    reviews(sort: "createdAt:desc", filters: { cat: { id: { eq: $id } } }) {
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

const CatPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useCat(+id);

  const [getReviews, { called, loading: loadingReviews, data: dataReviews }] =
    useLazyQuery(GET_CAT_REVIEWS, {
      variables: { id },
    });

  console.log(loading, error, data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  else if (data.cat.data) {
    const cat = data.cat.data;
    return (
      <div>
        <div key={cat.id}>
          <div
            style={{
              border: "1px solid black",
              width: "300px",
              borderRadius: "5px",
              margin: "5px",
            }}
          >
            <h4>{cat.attributes.name}</h4>
            <p>Color: {cat.attributes.color}</p>
            <p>Age: {cat.attributes.age}</p>
            <p>Date of Birth: {cat.attributes.dob}</p>
            <img src={cat.attributes.imageUrl} width="200px" />
          </div>
        </div>
        <button type="button" onClick={() => getReviews()}>
          Load Reviews
        </button>
      </div>
    );
  }
};

export default CatPage;

// export async function getStaticProps({ params }) {
//   // const home = await prisma.home.findUnique({ where: { id: params.id } });
//   const id = params.id;
//   if (id) {
//     return {
//       props: JSON.parse(JSON.stringify(id)),
//     };
//   }
//   return {
//     redirect: {
//       destination: "/",
//       permanent: false,
//     },
//   };
// }
