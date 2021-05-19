import { gql } from '@apollo/client';

export const CREATE_FAVORITE = gql`
  mutation createFavorite($data: CreateFavoriteInput!) {
    createFavorite(data: $data) {
      product
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($productName: String!) {
    deleteFavorite(productName: $productName) {
      product
    }
  }
`;
