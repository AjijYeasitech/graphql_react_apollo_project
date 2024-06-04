import { gql } from "@apollo/client";
export const REGISTER_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      code
      status
      ack
      msg
      data {
        id
        name
        email
        picture
        status
        isActive
        createdAt
      }
    }
  }
`;

export const USER_SIGN_IN_MUTATION = gql`
  mutation UserSignIn($email: String!, $password: String!) {
    userSignIn(email: $email, password: $password) {
      id
      name
      email
      picture
      status
      isActive
      createdAt
      token
    }
  }
`;

export const GET_USERS = gql`
  query AllUser {
    allUser {
      id
      name
      email
      picture
      status
      isActive
      createdAt
      token
    }
  }
`;
