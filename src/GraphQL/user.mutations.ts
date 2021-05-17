import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      name
      email
    }
  }
`;

export const SIGN_IN = gql`
  mutation login($data: AuthInput!) {
    login(data: $data) {
      user {
        id
        email
      }
      token
    }
  }
`;
