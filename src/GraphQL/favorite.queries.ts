import { gql } from '@apollo/client';

export const LOAD_FAVORITES = gql`
  query ($field: String, $value: String, $sort: String, $page: Float) {
    favorites(field: $field, value: $value, sort: $sort, page: $page) {
      data
      totalCount
    }
  }
`;
