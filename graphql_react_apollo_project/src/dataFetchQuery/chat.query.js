import { gql } from "@apollo/client";

export const GET_USER_CONVERSATION = gql`
  query GetUserConversation {
    getUserConversation {
      id
      isActive
      name
      picture
      isGroup
      isAdmin
      receiver {
        id
        email
        name
        picture
        status
      }
      receiverId
      senderId
      user {
        id
        email
        isActive
        name
        picture
        status
      }
    }
  }
`;

export const GET_CONVERSATION_MESSAGE = gql`
  query GetMessage($conversationId: Int!) {
    getMessage(conversationId: $conversationId) {
      id
      message
      senderId
      files
      conversation {
        id
        isActive
        isAdmin
        isGroup
        name
        picture
        receiverId
        senderId
      }
      user {
        id
        email
        isActive
        name
        picture
        status
      }
    }
  }
`;

export const CREATE_OPEN_CONVERSATION = gql`
  mutation CreateOpenConversation($input: CreateConversationInput) {
    createOpenConversation(input: $input) {
      ack
      code
      msg
      status
      data {
        id
        isActive
        isAdmin
        isGroup
        name
        picture
        receiverId
        senderId
        receiver {
          id
          email
          name
          picture
          status
        }
        user {
          id
          email
          createdAt
          isActive
          name
          picture
          status
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: CreateMessageInput!) {
    sendMessage(input: $input) {
      ack
      code
      message {
        id
        files
        message
        senderId
        user {
          id
          isActive
          name
          picture
          status
          email
        }
      }
      msg
      status
    }
  }
`;
