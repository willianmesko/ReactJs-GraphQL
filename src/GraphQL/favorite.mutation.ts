import { gql } from '@apollo/client';

export const CREATE_FAVORITE = gql`
  mutation createFavorite($data: CreateFavoriteInput!) {
    createFavorite(data: $data) {
      data
    }
  }
`;
