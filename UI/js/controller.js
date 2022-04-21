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
    if (this.userCollection.isExist(user)) {
      this.headerView.display(user.userName);
      this.tweetCollection.saveUser(true);
      this.tweetFeedView.showSignIn(false);
      this.getFeed();
    } else {
      document.querySelector(".validation_title").style.display = "inline";
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

  editTweet(id, text) {
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
      console.log("gdehqwjk");
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

  console.log(JSON.parse(localStorage.getItem("tweetsArray")), tweetsArray);
}

// document.addEventListener("DOMContentLoaded", function () {
//   let tweet;
//   try {
//     tweet = JSON.parse(localStorage.getItem("tweetsArray"));
//   } catch (e) {
//     tweet = {};
// console.log('Catch error');
//   }
// });

checkAndfillLocalStorage();
const tweetController = new TweetController();

document.addEventListener("DOMContentLoaded", function (event) {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.showAuthors();
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
const btnSendTweet = document.getElementById("btn-send");
const btnChangeTweet = document.getElementById("btn-change");
const btnDeleteTweet = document.getElementById("btn-delete");
const btnMainPage = document.getElementById("btn-main-page");
const tweetContainer = document.querySelectorAll(".twit");
const btnLoadMore = document.querySelector('.btn_load_more');
const tweetFeedViewId = document.getElementById('tweet-feed-view-id');
const twitText = document.querySelectorAll(".twit_text");
const filterAuthor = document.getElementById("filter_author");
const filterDateFrom = document.getElementById("filter_date_from");
const filterDateTo = document.getElementById("filter_date_to");
const filterText = document.getElementById("filter_text");
const filterHashtag = document.getElementById("filter_hashtag");
const editArea = document.getElementById("edit_area");
console.log(tweetContainer);

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

formSignIn.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(formSignIn[0].value, formSignIn[1].value);
  tweetController.setCurrentUser({
    userName: formSignIn[0].value,
    password: formSignIn[1].value,
  });
});

formSignUp.addEventListener("submit", (event) => {
  event.preventDefault();
  tweetController.registr({
    userName: formSignUp[0].value,
    password: formSignUp[1].value,
  });
});

btnMainPage.addEventListener("click", () => {
  setTimeout(() => {
    tweetController.getFeed();
  });
  tweetController.updateHeader();
});

btnSendTweet.addEventListener("click", () => {
  tweetController.addTweet(twitArea.value);
  twitArea.value = '';
});

// tweetFeedViewId.onclick = function (event) {
//   let target = event.target;
//   if (target.classList.contains(".btn_change")) {
//     btnChangeTweet.addEventListener('click', (event) => {
//       twitArea.value = target.innerHTML;
//       // tweetController.editTweet(target.closest(".twit").id, twitText.value);
//     })
    
//     // console.log(btnChangeTweet.closest(".twit").id, twitText.value);
//   }
// };


// btnDeleteTweet.addEventListener("click", (event) => {
//   tweetController.removeTweet(event.target);
// });


// tweetContainer.addEventListener('click', () => {
//   console.log(tweetContainer[0].id);
// });


tweetFeedViewId.onclick = function(event) {
  let target = event.target;
  console.log(target.closest('.twit'));
  console.log(event);

  if (target.closest(".twit")) {
    // tweetController.showTweet(target.closest(".twit").id);
    console.log(target.closest(".twit").id);

    if (target.closest(".btn_delete")) {
      // console.log(target.closest(".twit").id, "delete");
      tweetController.removeTweet(String(target.closest(".twit").id));
      // tweetController.getFeed();
      // let TwitDelete = target.closest(".twit");
      // btnChangeTweet.addEventListener('click', (event) => {
      //   console.log(event.target.id);
      // tweetController.removeTweet(event.target.id);
      // });
    }
    if (target.closest(".btn_change")) {
      console.log(target.closest(".twit").id, "change");
      console.log(target.closest(".twit_text").value, "tweet Area");
      editArea.display.style = 'flex';
      tweetController.editTweet(
        target.closest(".twit").id, 
        editArea.value
      );
      console.log(twitArea.value);


    }
  }
  
  
}

btnLoadMore.addEventListener('click', function() {
  tweetController.getFeed(
    TweetController.numberOfTweet,
    (TweetController.numberOfTweet += TweetController.numberOfTweet)
  );
})


filterAuthor.addEventListener("input", () => {
  tweetController.getFeed(0, 10, { author: filterAuthor.value });
});
filterDateTo.addEventListener("change", () => {
  tweetController.getFeed(0, 10, { dateTo: filterDateTo.value});
});
filterDateFrom.addEventListener("change", () => {
  tweetController.getFeed(0, 10, { dateFrom: filterDateFrom.value});
});
filterText.addEventListener("input", () => {
  tweetController.getFeed(0, 10, { text: filterText.value });
});
filterHashtag.addEventListener("input", () => {
  tweetController.getFeed(0, 10, { hashtags: [filterHashtag.value] });
});