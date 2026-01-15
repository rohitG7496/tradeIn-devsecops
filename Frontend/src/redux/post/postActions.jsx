import {
  PostAnswer,
  PostQuestion,
  RetrievePost,
  PostSaved,
  RetrieveAllPost,
  CreatePost,
  PostDelete,
  PostEdit,
  AllBrands,
} from "../../api/pathConstants";
import { Request } from "../../api/Request";
import { openSnackbar } from "../snackbar/snackbarActions";
import { getToken, removeTokenRequest } from "../token/tokenActions";
import {
  ADD_ALL_POST_DATA,
  ADD_POST_DATA,
  ADD_POST_FILTERS,
  ADD_QUESION_DATA,
  ADD_SAVED_DATA,
  ADD_SORT_BY,
  ALL_BRANDS,
  CREATE_POST_SUCCESS,
  DELETE_POST_DATA,
  DELETE_QUESION_DATA,
  NO_CONTENT_AVAILABLE,
} from "./postTypes";

export const addPostFilters = (data) => {
  return {
    type: ADD_POST_FILTERS,
    data: data,
  };
};

export const addPostSortBy = (value) => {
  return {
    type: ADD_SORT_BY,
    value: value,
  };
};

export const CreatePostSuccess = (value, id) => {
  return {
    type: CREATE_POST_SUCCESS,
    value: value,
    id: id,
  };
};

export const allBrands = (data) => {
  return {
    type: ALL_BRANDS,
    data: data,
  };
};

export const getAllBrands = () => {
  return async (dispatch, getState) => {
    const res = await Request(
      "GET",
      `${AllBrands}`,
      null,
      null
    );
    if (res && res.status === 200) {
      await dispatch(allBrands(res.data));
    }
  };
};



export const CreateNewPost = (data) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const user = await getState().myDetails.myDetails.username;
    if (token && user) {
      data.append("user", user);
      const res = await Request("POST", CreatePost, token, data);
      console.log(res)
      if (res && res.status == 201) {
        await dispatch(addPostDetails(res.data));
        await dispatch(CreatePostSuccess(true, res.data.id));
        await dispatch(openSnackbar("Post Created successfully"));
      } else {
        await dispatch(CreatePostSuccess(false, null));
        await dispatch(openSnackbar("Something went wrong"));
      }
    } else {
      await dispatch(openSnackbar("Something went wrong"));
    }
  };
};

export const editPost = (data) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const user = await getState().myDetails.myDetails.username;
    // console.log(data);
    if (token && user) {
      if (data instanceof FormData) {
        data.append("user", user);
      } else {
        data["user"] = user;
      }
      const res = await Request("PUT", PostEdit, token, data);
      if (res && res.status == 200) {
        await dispatch(addPostDetails(res.data));
        await dispatch(CreatePostSuccess(true, res.data.id));
        await dispatch(openSnackbar("Post edited successfully"));
      } else {
        await dispatch(CreatePostSuccess(false, null));
        await dispatch(openSnackbar("Something went wrong"));
      }
    } else {
      await dispatch(openSnackbar("Something went wrong"));
    }
  };
};

export const addAllPostDetails = (post) => {
  return {
    type: ADD_ALL_POST_DATA,
    post: post,
  };
};

export const retrieveAllPost = (
  category,
  subcategory,
  brand,
  color,
  min,
  max,
  status,
  condition,
  barter,
  donate,
  sort
) => {
  return async (dispatch, getState) => {
    // console.log("sorted",sort)
    const res = await Request(
      "GET",
      `${RetrieveAllPost}?category=${category}&subcategory=${subcategory}&brand=${brand}&color=${color}&min=${min}&max=${max}&state=${status}&condition=${condition}&barter=${barter}&donate=${donate}&sort=${sort}`,
      null,
      null
    );
    if (res && res.status === 200) {
      await dispatch(addAllPostDetails(res.data));
    } else if (res && res.status == 204) {
      await dispatch(openSnackbar("No results found"));
    } else if (res && res.status != 200) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};

export const addPostDetails = (post) => {
  return {
    type: ADD_POST_DATA,
    post: post,
  };
};

export const noPostDetails = (loading, success) => {
  return {
    type: NO_CONTENT_AVAILABLE,
    loading: loading,
    success: success,
  };
};

export const retrievePost = (postId, forceFetch = false) => {
  return async (dispatch, getState) => {
    if (forceFetch || (postId in getState().post.posts == false)) {
      await dispatch(getToken());
      const token = await getState().token.access;
      const res = await Request("GET", `${RetrievePost}?id=${postId}`, token);
      if (res && res.status === 200) {
        await dispatch(addPostDetails(res.data));
      } else if (res && res.status == 204) {
        await dispatch(noPostDetails(false, false));
        await dispatch(openSnackbar("No results found"));
      } else if (res && res.status != 200) {
        await dispatch(openSnackbar("Something went wrong"));
      } else {
        await dispatch(openSnackbar("Network error"));
      }
    } else {
      await dispatch(noPostDetails(false, true));
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const res = await Request("DELETE", `${PostDelete}?id=${postId}`, token);
    if (res && res.status === 200) {
      const data = await getState().post.posts;
      await delete data[postId];
      await dispatch(noPostDetails(false, false));
      await dispatch(openSnackbar("Post deleted successfully"));
    } else if (res && res.status == 204) {
      await dispatch(openSnackbar("No results found"));
    } else if (res && res.status != 200) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};

export const addQuestion = (question, postId) => {
  return {
    type: ADD_QUESION_DATA,
    question: question,
    postId: postId,
  };
};

export const askQuestion = (question, postId, user) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const data = {
      question: question,
      post: postId,
      user: user,
    };
    const res = await Request("POST", `${PostQuestion}`, token, data);
    if (res && res.status === 201) {
      await dispatch(addQuestion(res.data, postId));
    } else if (res && res.status == 204) {
      await dispatch(openSnackbar("No results found"));
    } else if (res && res.status != 201) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};

export const deleteQues = (question, postId) => {
  return {
    type: DELETE_QUESION_DATA,
    question: question,
    postId: postId,
  };
};

export const deleteQuestion = (questionId, postId) => {
  return async (dispatch, getState) => {
    const res = await Request(
      "DELETE",
      `${PostQuestion}?post_id=${postId}&question_id=${questionId}`
    );
    if (res && res.status === 200) {
      const q = getState().post.posts[postId].questions;
      let newQ = [];
      q.map((obj) => {
        if (obj.id != questionId) {
          newQ.push(obj);
        }
      });
      await dispatch(deleteQues(newQ, postId));
      await dispatch(openSnackbar("Deleted Successfully"));
    } else if (res && res.status == 204) {
      await dispatch(openSnackbar("No results found"));
    } else if (res && res.status != 200) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};

export const answerQuestion = (answer, postId, questionId, action) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const data = {
      id: questionId,
      answer: action == "add" ? answer : "",
      post: postId,
      is_answered: action == "add" ? true : false,
      action: action,
    };
    const res = await Request("PUT", `${PostAnswer}`, token, data);
    if (res && res.status === 200) {
      const q = getState().post.posts[postId].questions;
      let newQ = [];
      q.map((obj) => {
        if (obj.id != questionId) {
          newQ.push(obj);
        } else {
          obj.is_answered = data.is_answered;
          obj.answer = data.answer;
          newQ.push(obj);
        }
      });
      await dispatch(deleteQues(newQ, postId));
      await dispatch(
        openSnackbar(
          action == "add"
            ? "Answered Successfully"
            : "Answer deleted successfuly"
        )
      );
    } else if (res && res.status != 200) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};

export const addSavedData = (value, postId) => {
  return {
    type: ADD_SAVED_DATA,
    value: value,
    postId: postId,
  };
};

export const PostSave = (postId, userId, verb) => {
  return async (dispatch, getState) => {
    await dispatch(getToken());
    const token = await getState().token.access;
    const data = {
      post: postId,
      user: userId,
    };
    const res = await Request("POST", `${PostSaved}?verb=${verb}`, token, data);
    if (res && res.status === 200) {
      await dispatch(addSavedData(verb == "save" ? true : false, postId));
      await dispatch(
        openSnackbar(
          verb == "save" ? "Added to wishlist" : "Removed from wishlist"
        )
      );
    } else if (res && res.status != 200) {
      await dispatch(openSnackbar("Something went wrong"));
    } else {
      await dispatch(openSnackbar("Network error"));
    }
  };
};
