import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  CREATE_OPEN_CONVERSATION,
  GET_CONVERSATION_MESSAGE,
  GET_USER_CONVERSATION,
  SEND_MESSAGE,
} from "../dataFetchQuery/chat.query";

import client from "../index";

// // .env
const CONVERSATION_ENDPOINT = "http://localhost:8000/api/v1/conversation";
const MESSAGE_ENDPOINT = "http://localhost:8000/api/v1/message";

const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
};

// functions
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_USER_CONVERSATION,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
// Open_create_conversation
export const Open_create_conversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    const { token, receiver_id, isGroup } = values;
    try {
      const { data } = await client.mutate({
        mutation: CREATE_OPEN_CONVERSATION,
        variables: {
          input: {
            receiverId: receiver_id,
            isGroup: isGroup,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
// getConversationMessages
export const getConversationMessages = createAsyncThunk(
  "conversation/messages",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await client.query({
        query: GET_CONVERSATION_MESSAGE,
        variables: {
          conversationId: convo_id,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

// Send Message
export const sendMessages = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    const { token, message, convo_id, files } = values;
    try {
      const { data } = await client.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          input: {
            conversationId: convo_id,
            message: message,
            files: files,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const createGroupConversation = createAsyncThunk(
  "conversation/create_group",
  async (values, { rejectWithValue }) => {
    const { token, name, users } = values;
    try {
      const { data } = await axios.post(
        `${CONVERSATION_ENDPOINT}/group`,
        { name, users },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("data",data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    updateMessagesAndConversation: (state, action) => {
      // update messages
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      // update conversations
      const conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      );
      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    clearFiles: (state, action) => {
      state.files = [];
    },
    removeFileFromFiles: (state, action) => {
      let index = action.payload;
      let files = [...state.files];
      let fileToRemove = [files[index]];
      state.files = files.filter((file) => !fileToRemove.includes(file));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Open_conversation
      .addCase(Open_create_conversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(Open_create_conversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload;
        state.files = [];
      })
      .addCase(Open_create_conversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // getConversationMessages
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //SendMessage
      .addCase(sendMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload];
        // this is updated msg
        const conversation = {
          ...action.payload.conversation,
          latestMessage: action.payload,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(sendMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setActiveConversation,
  updateMessagesAndConversation,
  addFiles,
  clearFiles,
  removeFileFromFiles,
} = chatSlice.actions;

export default chatSlice.reducer;
