class TweetController {
  constructor() {
    this.apiService = new TweetFeedApiService();
    this.headerView = new HeaderView("header-id");
    this.tweetFeedView = new TweetFeedView("tweet-feed-view-id");
    this.tweetView = new TweetView("tweet-view-id");
    this.commentView = new CommentView("comment-view-id");
    this.authorView = new AuthorView("author-view-id");
    this.token = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
  }

  static filterConfig = { skip: 0, top: 10 };
  static showTweetsTimeout = null;

  setCurrentUser() {
    this.headerView.display();
  }

  signIn() {
    clearTimeout(TweetController.showTweetsTimeout);
    this.tweetFeedView.showSignIn(true);
  }

  signUp() {
    clearTimeout(TweetController.showTweetsTimeout);
    this.tweetFeedView.showSignUp(true);
  }

  registr(data) {
    this.apiService
      .postRegistration(data)
      .then((res) => {
        console.log("Everything is OK", res);
        if (res.status === 201) {
          const userName = res.json.login;
          this.tweetFeedView.showSignUp(false);
          this.tweetFeedView.showSignIn(true, userName);
        } else if (res.status === 409) {
          const ValidTitle = document.querySelector(".validation_title2");
          setTimeout(() => {
            ValidTitle.style.display = "inline";
          }, 0);
          setTimeout(() => {
            ValidTitle.style.display = "none";
          }, 4000);
        } else {
          console.log("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
        }
        document.querySelector(".main_error").style.display = "none";
      })
      .then(() => {
        document.getElementById("login").value = "";
        document.getElementById("psw").value = "";
        document.querySelector(".psw-repeat").value = "";
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
        } else if (res.status === 403) {
          const ValidTitle = document.querySelector(".validation_title");
          setTimeout(() => {
            ValidTitle.style.display = "inline";
          }, 0);
          setTimeout(() => {
            ValidTitle.style.display = "none";
          }, 4000);
        } else {
          console.log("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
        }
      })
      .then((dataToken) => {
        document.querySelector(".main_error").style.display = "none";
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
        } else if (res.status === 401) {
          this.signIn();
          return false;
        } else {
          console.log("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
          return false;
        }
      })
      .then((data) => {
        if (data) {
          this.getFeed();
        }
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
        } else if (res.status === 401) {
          this.signIn();
          return false;
        } else {
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
          return false;
        }
      })
      .then((data) => {
        if (data) {
          this.getFeed();
        }
      });
  }

  removeTweet(id) {
    this.apiService.deleteTweet(id).then((res) => {
      if (res.status === 204) {
        console.log("Everything is OK", res);
        this.getFeed();
      }
      if (res.status === 401) {
        this.signIn();
      } else {
        console.warn("Error", res.status);
        document.querySelector(".main_error").style.display = "flex";
        document.querySelector(".main").style.display = "none";
      }
    });
  }

  showTweet(tweet) {
    clearTimeout(TweetController.showTweetsTimeout);
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
          this.signIn();
          return false;
        } else {
          console.warn("Error", res.status);
          document.querySelector(".main_error").style.display = "flex";
          document.querySelector(".main").style.display = "none";
          document.querySelector(".main_comment").style.display = "none";
          return false;
        }
      })
      .then((data) => {
        if (data) {
          this.showTweet(data);
        }
      });
  }

  getFeed(
    skip = TweetController.filterConfig.skip,
    top = TweetController.filterConfig.top,
    filterConfig = TweetController.filterConfig
  ) {
    if (TweetController.showTweetsTimeout) {
      clearTimeout(TweetController.showTweetsTimeout);
    }
    this.apiService.getTweets(filterConfig).then((result) => {
      this.tweetFeedView.display(result);
      TweetController.showTweetsTimeout = setTimeout(() => {
        this.getFeed(
          TweetController.filterConfig.skip,
          TweetController.filterConfig.top,
          TweetController.filterConfig
        );
      }, 6 * 1000);
    });
  }

  getTopAuthors() {
    this.apiService.getTweetsForTop().then((result) => {
      this.authorView.display(result);
    });
  }
}

const tweetController = new TweetController();

document.addEventListener("DOMContentLoaded", function () {
  tweetController.getFeed();
  tweetController.getTopAuthors();
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
  TweetController.filterConfig = { skip: 0, top: 10 };
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
    const WrongTitle = document.querySelector(".wrong_title");
    setTimeout(() => {
      WrongTitle.style.display = "inline";
    }, 0);
    setTimeout(() => {
      WrongTitle.style.display = "none";
    }, 4000);
  } else {
    const user = {
      login: formSignUp[0].value,
      password: formSignUp[1].value,
    };
    tweetController.registr(user);
  }
});

btnError.addEventListener("click", function () {
  document.querySelector(".main_error").style.display = "none";
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
  tweetController.addCommentToTweet(twitComId, commentArea.value);
  commentArea.value = "";
});

btnLoadMore.addEventListener("click", function () {
  TweetController.filterConfig.top += 10;
  tweetController.getFeed();
});

filterAuthor.addEventListener("input", () => {
  TweetController.filterConfig.author = filterAuthor.value;
  tweetController.getFeed();
});
filterDateTo.addEventListener("change", () => {
  TweetController.filterConfig.dateTo = new Date(
    filterDateTo.value
  ).toISOString();
  tweetController.getFeed();
});
filterDateFrom.addEventListener("change", () => {
  TweetController.filterConfig.dateFrom = new Date(
    filterDateFrom.value
  ).toISOString();
  tweetController.getFeed();
});
filterText.addEventListener("input", () => {
  TweetController.filterConfig.text = filterText.value;
  tweetController.getFeed();
});
filterHashtag.addEventListener("input", () => {
  TweetController.filterConfig.hashtags = filterHashtag.value.replace(/#/g, "");
  tweetController.getFeed();
});

function removeKeys(filterConfig) {
  for (let propName in filterConfig) {
    if (filterConfig[propName] === "") {
      delete filterConfig[propName];
    }
  }
  return filterConfig;
}
