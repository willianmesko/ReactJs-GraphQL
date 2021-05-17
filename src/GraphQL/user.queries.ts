import { gql } from '@apollo/client';

export const CRET = gql`
  query (
    $field: String
    $value: String
    $sort: String
    $page: Float
    $take: Float
  ) {
    games(field: $field, value: $value, sort: $sort, page: $page, take: $take) {
      data {
        id
        name
        price
        reviewCount
        rating
        imageUrl
        condition
        memory
      }
      totalCount
    }
  }
`;
