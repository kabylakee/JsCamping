class TweetController {
  constructor() {
    this.tweetCollection = new TweetCollection();
    this.userCollection = new UserCollection();
    this.headerView = new HeaderView("header-id");
    this.tweetFeedView = new TweetFeedView("tweet-feed-view-id");
    this.tweetView = new TweetView("tweet-view-id");
    this.commentView = new CommentView("comment-view-id");
    this.authorView = new AuthorView("author-view-id");
  }

  static numberOfTweet = 10;

  setCurrentUser(user) {
    const validationTitle = document.querySelector(".validation_title");

    if (this.userCollection.isExist(user)) {
      this.headerView.display(user.userName);
      this.tweetCollection.saveUser(true);
      this.tweetFeedView.showSignIn(false);
      this.getFeed();
    } else {
      validationTitle.style.display = "inline";
    }
  }

  signOut() {
    this.headerView.display();
    this.tweetCollection.saveUser(false);
    this.getFeed();
  }

  addTweet(text) {
    if (this.tweetCollection.add(text)) {
      this.tweetFeedView.display(
        this.tweetCollection.getPage(),
        TweetCollection.user
      );
    }
  }

  addCommentToTweet(id, text) {
    if (this.tweetCollection.addComment(id, text)) {
      this.commentView.display(this.tweetCollection.getCom(id));
    }
  }

  editTweet(id) {
    const text = this.tweetCollection.get(id).text;
    this.tweetFeedView.editTweetView(text);
  }

  saveEditedTweet(id, text) {
    if (this.tweetCollection.edit(id, text)) {
      this.tweetFeedView.display(
        this.tweetCollection.getPage(),
        TweetCollection.user
      );
    }
  }

  removeTweet(id) {
    if (this.tweetCollection.remove(id)) {
      this.tweetFeedView.display(
        this.tweetCollection.getPage(),
        TweetCollection.user
      );
    }
  }

  getFeed(skip, top, filterConfig) {
    this.tweetFeedView.display(
      this.tweetCollection.getPage(skip, top, filterConfig),
      TweetCollection.user
    );
  }

  showTweet(id) {
    this.tweetView.display(this.tweetCollection.get(id), TweetCollection.user);
    this.commentView.display(this.tweetCollection.getCom(id));
  }

  showAuthors(authorsFiltered) {
    this.authorView.display(this.tweetCollection.getAuthor(authorsFiltered));
  }

  signIn() {
    this.tweetFeedView.showSignIn(true);
  }

  signUp() {
    this.tweetFeedView.showSignUp(true);
  }

  registr(user) {
    if (this.userCollection.save(user)) {
      this.tweetFeedView.showSignUp(false);
      this.tweetFeedView.showSignIn(true);
    }
    document.querySelector(".validation_title2").style.display = "inline";
  }

  updateHeader() {
    this.headerView.display(TweetCollection.user);
    document.querySelector(".for_auth_reg").style.display = "none";
  }
}

function checkAndfillLocalStorage() {
  if (!JSON.parse(localStorage.getItem("tweetsArray"))) {
    localStorage.setItem("tweetsArray", JSON.stringify(tweetsArray));
  }

  if (!JSON.parse(localStorage.getItem("users"))) {
    const testUser = {
      userName: "Test",
      password: "test",
    };
    localStorage.setItem("users", JSON.stringify([testUser]));
  }
  //console.log(JSON.parse(localStorage.getItem("tweetsArray")), tweetsArray);
}

checkAndfillLocalStorage();
const tweetController = new TweetController();

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.showAuthors();
  tweetController.updateHeader();
});

// document.addEventListener("unload", function (event) {
//   tweetController.updateHeader();
// });

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
  //formSignIn.removeEventListener("submit", false);
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
  console.log(formSignIn[0].value, formSignIn[0].textContent);
  tweetController.setCurrentUser({
    userName: formSignIn[0].value,
    password: formSignIn[1].value,
  });
  document.querySelector(".login").value = "";
  document.querySelector(".psw").value = "";
});

formSignUp.addEventListener("submit", (event) => {
  event.preventDefault();
  if (formSignUp[1].value !== formSignUp[2].value) {
    document.querySelector(".wrong_title").style.display = "inline";
  } else {
    tweetController.registr({
      userName: formSignUp[0].value,
      password: formSignUp[1].value,
    });
    document.querySelector(".login").value = "";
    document.querySelector('.psw').value = '';
    document.querySelector(".psw-repeat").value = "";
  }
});

btnMainPage.addEventListener("click", () => {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.updateHeader();
});

linkMainPage.addEventListener("click", () => {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.updateHeader();
});

btnSendTweet.addEventListener("click", () => {
  tweetController.addTweet(twitArea.value);
  twitArea.value = "";
});

tweetFeedViewId.onclick = function (event) {
  let target = event.target;

  if (target.closest(".twit")) {

    btnSendComment.addEventListener("click", () => {
      console.log(target.closest(".twit").id, "comment");
      tweetController.addCommentToTweet(
        target.closest(".twit").id,
        commentArea.value
      );
      commentArea.value = "";
    });

    if (target.closest(".btn_delete")) {
      tweetController.removeTweet(target.closest(".twit").id);
      return;
    }
    if (target.closest(".btn_change")) {
      const sendEditedText = document.querySelector(".send-edited-text");
      const editArea = document.querySelector(".edit-area");
      tweetController.editTweet(target.closest(".twit").id);

      sendEditedText.addEventListener("click", (event) => {
        event.stopPropagation();
        tweetController.saveEditedTweet(
          target.closest(".twit").id,
          editArea.value
        );
      });
      editArea.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      return;
    }

    tweetController.showTweet(target.closest(".twit").id);
  }
};

btnLoadMore.addEventListener("click", function () {
  tweetController.getFeed(0, (TweetController.numberOfTweet += 10));
});

filterAuthor.addEventListener("input", () => {
  tweetController.getFeed(0, 10, { author: filterAuthor.value });
});
filterDateTo.addEventListener("change", () => {
  tweetController.getFeed(0, 10, { dateTo: new Date(filterDateTo.value) });
});
filterDateFrom.addEventListener("change", () => {
  tweetController.getFeed(0, 10, { dateFrom: new Date(filterDateFrom.value) });
});
filterText.addEventListener("input", () => {
  tweetController.getFeed(0, 10, { text: filterText.value });
});
filterHashtag.addEventListener("input", () => {
  // console.log(filterHashtag.value, filterHashtag.value.split(' '));
  tweetController.getFeed(0, 10, { hashtags: filterHashtag.value.split(" ") });
});
