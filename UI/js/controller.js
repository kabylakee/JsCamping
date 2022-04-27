class TweetController {
  constructor() {
    this.apiService = new TweetFeedApiService();
    this.headerView = new HeaderView("header-id");
    this.tweetFeedView = new TweetFeedView("tweet-feed-view-id");
    this.tweetView = new TweetView("tweet-view-id");
    this.commentView = new CommentView("comment-view-id");
    this.authorView = new AuthorView("author-view-id");
    this.token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
    this.showTweetsTimeout = null;
  }

  static numberOfTweet = 10;
  static filterConfig = {};

  setCurrentUser() {
    this.headerView.display();
  }

  signIn() {
    this.tweetFeedView.showSignIn(true);
  }

  signUp() {
    this.tweetFeedView.showSignUp(true);
  }

  registr(data) {
    this.apiService.postRegistration(data).then((res) => {
      console.log("Everything is OK", res);
      if (res.status === 201) {
        document.querySelector(".login").value = "";
        document.querySelector(".password").value = "";
        document.querySelector(".psw-repeat").value = "";
        const userName = res.json.login;
        this.tweetFeedView.showSignUp(false);
        this.tweetFeedView.showSignIn(true, userName);
      }
      if (res.status === 409) {
        document.querySelector(".validation_title2").style.display = "inline";
      } else {
        console.log("Error", res.status);
        document.querySelector(".main_error").style.display = "flex";
        document.querySelector(".main").style.display = "none";
      }
    });
  }

  login(data) {
    this.apiService
      .postLogin(data)
      .then((res) => {
        console.log("Everything is OK", res);
        if (res.status === 201) {
          localStorage.setItem("user", JSON.stringify(data.login));
          return res.json();
        }
        if (res.status === 403) {
          document.querySelector(".validation_title").style.display = "inline";
        } else {
          console.log("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
        }
      })
      .then((dataToken) => {
        document.querySelector(".login").value = "";
        document.querySelector(".password").value = "";
        localStorage.setItem("token", JSON.stringify(dataToken.token));
        this.tweetFeedView.showSignIn(false);
        this.getFeed();
        tweetController.setCurrentUser();
      });
  }

  updateHeader() {
    this.headerView.display();
    document.querySelector(".for_auth_reg").style.display = "none";
  }

  signOut() {
    localStorage.clear();
    this.headerView.display();
    this.getFeed();
  }

  addTweet(text) {
    this.apiService
      .postTweet(text)
      .then((res) => {
        console.log("Everything is OK", res);
        if (res.status === 201 || res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          this.tweetFeedView.showSignIn(true);
        } else {
          console.log("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
        }
      })
      .then((data) => {
        console.log(data);
        this.getFeed();
      });
  }

  editTweet(el) {
    this.tweetFeedView.editTweetView(el);
  }

  saveEditedTweet(id, text) {
    this.apiService
      .putTweet(text, id)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        }
        if (res.status === 401) {
          this.tweetFeedView.showSignIn(true);
        } else {
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
        }
      })
      .then((data) => {
        console.log(data);
        this.getFeed();
      });
  }

  removeTweet(id) {
    this.apiService.deleteTweet(id).then((res) => {
      console.log(typeof id);
      if (res.status === 204) {
        console.log("Everything is OK", res);
        this.getFeed();
      }
      if (res.status === 401) {
        this.tweetFeedView.showSignIn(true);
      } else {
        console.warn("Error", res.status);
        document.querySelector(".main_error").style.display = "flex";
        document.querySelector(".main").style.display = "none";
      }
    });
  }

  showTweet(tweet) {
    this.tweetView.display(tweet);
    this.commentView.display(tweet.comments);
  }

  addCommentToTweet(id, text) {
    this.apiService
      .postComment(id, { text })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        if (res.status === 401) {
          this.tweetFeedView.showSignIn(true);
        } else {
          console.warn("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
          document.querySelector(".main_comment").style.display = "none";
        }
      })
      .then((data) => {
        this.showTweet(data);
      });
  }

  getFeed(skip, top, filterConfig = {}) {
    if (this.showTweetsTimeout) {
      clearTimeout(this.showTweetsTimeout);
    }
    this.apiService.getTweets(skip, top, filterConfig).then((result) => {
      // console.log(JSON.stringify(result));
      this.tweetFeedView.display(result);
      this.authorView.display(result);
      this.showTweetsTimeout = setTimeout(() => {
        this.getFeed();
      }, 60 * 1000);
    });
  }
}

const tweetController = new TweetController();

document.addEventListener("DOMContentLoaded", function () {
  tweetController.getFeed();
  tweetController.updateHeader();
});

const mainContainer = document.querySelector(".main");
const mainSignContainer = document.querySelector(".main__sign");
const btnSignUp = document.getElementById("sign-up");
const btnSignIn = document.getElementById("sign-in");
const btnSignOut = document.getElementById("sign-out");
const formSignIn = document.getElementById("form-signIn");
const formSignUp = document.getElementById("form-signUp");
const twitArea = document.getElementById("area");
const commentArea = document.querySelector(".comment_area");
const btnSendTweet = document.getElementById("btn-send");
const btnSendComment = document.getElementById("btn-reply");
const btnChangeTweet = document.getElementById("btn-change");
const btnDeleteTweet = document.getElementById("btn-delete");
const btnMainPage = document.getElementById("btn-main-page");
const tweetContainer = document.querySelectorAll(".twit");
const btnLoadMore = document.querySelector(".btn_load_more");
const tweetFeedViewId = document.getElementById("tweet-feed-view-id");
const twitText = document.querySelectorAll(".twit_text");
const filterAuthor = document.getElementById("filter_author");
const filterDateFrom = document.getElementById("filter_date_from");
const filterDateTo = document.getElementById("filter_date_to");
const filterText = document.getElementById("filter_text");
const filterHashtag = document.getElementById("filter_hashtag");
const linkMainPage = document.getElementById("link-main-page");
const btnReset = document.getElementById("btn-reset");
const btnRegistr = document.getElementById("btn-registr");
const signUpBtn = document.getElementById("sign-up-form");
const btnError = document.querySelector(".btn_error");

btnSignIn.addEventListener(
  "click",
  tweetController.signIn.bind(tweetController)
);

btnSignUp.addEventListener(
  "click",
  tweetController.signUp.bind(tweetController)
);

btnSignOut.addEventListener(
  "click",
  tweetController.signOut.bind(tweetController)
);

signUpBtn.addEventListener("click", (event) => {
  tweetController.signIn.bind(tweetController);
});

btnReset.addEventListener("click", () => {
  filterAuthor.textContent = "";
  filterDateFrom.textContent = "";
  filterDateTo.textContent = "";
  filterText.textContent = "";
  filterHashtag.textContent = "";
  setTimeout(() => {
    tweetController.getFeed();
  });
});

formSignIn.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = {
    login: formSignIn[0].value,
    password: formSignIn[1].value,
  };
  tweetController.login(user);
});

formSignUp.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formSignUp[1].value !== formSignUp[2].value) {
    document.querySelector(".wrong_title").style.display = "inline";
  } else {
    const user = {
      login: formSignUp[0].value,
      password: formSignUp[1].value,
    };
    tweetController.registr(user);
  }
});

btnError.addEventListener("click", function () {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.updateHeader();
});

btnMainPage.addEventListener("click", () => {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.updateHeader();
  document.querySelector(".main__sign").style.display = "none";
});

linkMainPage.addEventListener("click", () => {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.updateHeader();
});

btnSendTweet.addEventListener("click", () => {
  const textValue = {
    text: twitArea.value,
  };
  tweetController.addTweet(textValue);
  twitArea.value = "";
});

tweetFeedViewId.onclick = function (event) {
  let target = event.target;

  if (target.closest(".twit")) {
    if (target.closest(".btn_delete")) {
      tweetController.removeTweet(target.closest(".twit").id);
      return;
    }
    if (target.closest(".btn_change")) {
      const sendEditedText = target
        .closest(".twit")
        .querySelector(".send-edited-text");
      const editArea = target.closest(".twit").querySelector(".edit-area");
      tweetController.editTweet(target.closest(".twit"));

      sendEditedText.addEventListener("click", (event) => {
        event.stopPropagation();
        tweetController.saveEditedTweet(target.closest(".twit").id, {
          text: editArea.value,
        });
      });
      editArea.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      return;
    }

    tweetController.showTweet(
      JSON.parse(target.closest(".twit").dataset.tweet)
    );
  }
};

btnSendComment.addEventListener("click", () => {
  const twitComId = document.querySelector(".twit_comment").id;
  console.log(twitComId, "comment");
  tweetController.addCommentToTweet(twitComId, commentArea.value);
  commentArea.value = "";
});

btnLoadMore.addEventListener("click", function () {
  console.log(TweetController.numberOfTweet);
  tweetController.getFeed(0, (TweetController.numberOfTweet += 10));
});

filterAuthor.addEventListener("input", () => {
  TweetController.filterConfig.author = filterAuthor.value;
  tweetController.getFeed(0, 10, TweetController.filterConfig);
});
filterDateTo.addEventListener("change", () => {
  console.log(new Date(filterDateTo.value));
  TweetController.filterConfig.dateTo = new Date(filterDateTo.value);
  tweetController.getFeed(0, 10, TweetController.filterConfig);
});
filterDateFrom.addEventListener("change", () => {
  console.log(new Date(filterDateFrom.value));
  TweetController.filterConfig.dateFrom = new Date(filterDateFrom.value);
  tweetController.getFeed(0, 10, TweetController.filterConfig);
});
filterText.addEventListener("input", () => {
  TweetController.filterConfig.text = filterText.value;
  tweetController.getFeed(0, 10, TweetController.filterConfig);
});
filterHashtag.addEventListener("input", () => {
  TweetController.filterConfig.hashtags = filterHashtag.value.replace('#', '');
  tweetController.getFeed(0, 10, TweetController.filterConfig);
});
