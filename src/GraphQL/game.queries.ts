import { gql } from '@apollo/client';

export const LOAD_GAMES = gql`
  query ($field: String, $value: String, $sort: String, $page: Float) {
    games(field: $field, value: $value, sort: $sort, page: $page) {
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
