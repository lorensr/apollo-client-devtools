import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { OperationLayout } from "../Layouts/OperationLayout";

const GET_WATCHED_QUERIES = gql`
  query GetWatchedQueries {
    watchedQueries @client {
      queries {
        id
        name
      }
    }
  }
`;

const GET_WATCHED_QUERY = gql`
  query GetWatchedQuery($id: ID!) {
    watchedQuery(id: $id) @client {
      id
      name
      queryString
      variables
      cachedData
    }
  }
`;

export const Queries = ({ navigationProps }) => {
  const [selected, setSelected] = useState<number>(0);
  const { data } = useQuery(GET_WATCHED_QUERIES);
  const { data: watchedQueryData } = useQuery(GET_WATCHED_QUERY, { 
    variables: { id: selected },
    returnPartialData: true,
  });

  return (
    <OperationLayout 
      navigationProps={navigationProps}
      operationName={watchedQueryData?.watchedQuery.name}
      operations={data?.watchedQueries?.queries}
      queryString={watchedQueryData?.watchedQuery.queryString}
      variables={watchedQueryData?.watchedQuery.variables}
      cachedData={watchedQueryData?.watchedQuery.cachedData}
      selectedQuery={selected}
      onQuerySelected={setSelected}
    />
  );
};

