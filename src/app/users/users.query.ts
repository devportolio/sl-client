import gql from "graphql-tag";

const UserDetails = `{
    id
    firstname
    lastname
    fullName
    email
  }
`;

export const USERS_LIST_QUERY = gql`
  query allUsers {
    allUsers ${UserDetails}
  }
`;

export const GET_USER_QUERY = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      firstname
      lastname
      email
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateInput!) {
    createUser(input: $input) ${UserDetails}
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userId: String!, $input: UpdateInput) {
    updateUser(userId: $userId, input: $input) ${UserDetails}
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;
