import gql from "graphql-tag";

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID! $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
