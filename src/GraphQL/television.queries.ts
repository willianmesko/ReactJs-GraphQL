import { gql } from '@apollo/client';

export const LOAD_TELEVISIONS = gql`
  query ($field: String, $value: String, $sort: String, $page: Float) {
    televisions(field: $field, value: $value, sort: $sort, page: $page) {
      data {
        id
        name
        price
        reviewCount
        rating
        imageUrl
        inch
        resolution
      }
      totalCount
    }
  }
`;
