import { gql } from '@apollo/client';

export const LOAD_PRODUCTS = gql`
  query getProducts($field: String, $value: String, $sort: String, $page: Float, $department: String) {
    products(field: $field, value: $value, sort: $sort, page: $page, department: $department) {
      products
      totalCount
    }
  }
`;
