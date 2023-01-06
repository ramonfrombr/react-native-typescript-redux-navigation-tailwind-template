import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { sub } from "date-fns";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Define a type for the slice state
interface PostsState {
  posts: PostState[];
}

export interface PostState {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: {
    like: number;
    love: number;
  };
}

export interface ReactionAddedPayload {
  postId: string;
  reaction: string;
}

const getPosts = async () => {
  let posts: any = [];
  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach((doc) => {
    const post = {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      date: doc.data().date,
      userId: doc.data().userId,
      reactions: doc.data().reactions,
    };

    posts.push(post);
  });

  return posts;
};

console.log(getPosts());

// Define the initial state using that type
const initialState: PostsState = {
  posts: [
    {
      id: "1",
      title: "Reprehenderit officia ex ipsum cillum duis.",
      content:
        "Fugiat excepteur ut ea est in minim officia et fugiat occaecat officia elit aliquip Lorem. In pariatur nulla officia consequat cupidatat Lorem cupidatat culpa enim. Incididunt aliquip in culpa et duis aliquip. Amet aliqua labore pariatur ut voluptate. Magna proident enim dolor nostrud dolore anim.",
      userId: "0",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions: {
        like: 0,
        love: 0,
      },
    },
    {
      id: "2",
      title: "Reprehenderit officia ex ipsum cillum duis.",
      content:
        "Fugiat excepteur ut ea est in minim officia et fugiat occaecat officia elit aliquip Lorem. In pariatur nulla officia consequat cupidatat Lorem cupidatat culpa enim. Incididunt aliquip in culpa et duis aliquip. Amet aliqua labore pariatur ut voluptate. Magna proident enim dolor nostrud dolore anim.",
      userId: "1",
      date: sub(new Date(), { minutes: 40 }).toISOString(),
      reactions: {
        like: 0,
        love: 0,
      },
    },
  ],
};

export const postsSlice = createSlice({
  name: "posts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    createPost: {
      reducer(state, action: PayloadAction<PostState>) {
        state.posts.push(action.payload);
      },
      prepare(
        id: string,
        title: string,
        content: string,
        date: string,
        userId: string
      ) {
        return {
          payload: {
            id,
            title,
            content,
            userId,
            date,
            reactions: {
              like: 0,
              love: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
      const { postId, reaction } = action.payload;

      const existingPost = state.posts.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[
          reaction as keyof typeof existingPost.reactions
        ]++;
      }
    },
  },
});

export const { createPost, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
