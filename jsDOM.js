class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(user) {
    const usr = document.getElementById(this.containerId);
    const userInfo = document.querySelector(".user__info");

    if (user) {
      document.querySelector(".user__icon").style.display = "flex";
      document.querySelector(".btn_sign_out").style.display = "flex";
      document.querySelector(".btn_sign").style.display = "none";
      let usrName = document.querySelector(".user__name");
      usrName ? usrName.remove() : (usrName = document.createElement("span"));
      usrName.classList.add("user__name");
      usrName.textContent = `${user}`;
      tweetCollection.user = user;
      userInfo.appendChild(usrName);
    } else {
      tweetCollection.user = null;
    }
  }
}

class TweetFeedView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(twtList, user) {
    const startHashtag = `<span class = "hashtag">`;
    const endHashtag = `</span>`;
    const twtTpl = document.getElementById(`twt-template`);
    const container = document.getElementById(this.containerId);
    const fragment = new DocumentFragment();
    for (const item of twtList) {
      const el = twtTpl.content.cloneNode(true);
      el.querySelector(".user__name").textContent = item.author;
      let hashText = "";
      item.text.split(" ").forEach((word) => {
        hashText += word.startsWith("#")
          ? startHashtag + word + endHashtag + " "
          : word + " ";
      });
      el.querySelector(".twit_text").innerHTML = hashText;
      el.querySelector(".date_time").textContent = MyMoment.getDateTime(
        item.createdAt
      );
      el.querySelector(".twit").id = item.id;
      el.querySelector(
        ".com_number"
      ).textContent = `${tweetCollection.numbOfComments(item)}`;
      if (user !== item.author) {
        el.querySelector(".btn_change").style.display = "none";
        el.querySelector(".btn_delete").style.display = "none";
      }
      fragment.appendChild(el);
    }
    container.innerHTML = "";
    document.querySelector(".main_comment").style.display = "none";
    document.querySelector(".main").style.display = "flex";
    container.appendChild(fragment);
  }
}

// TODO set filters of queryParameters and localStorage later
class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(tweets) {}
}

class TweetView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(twt, user) {
    const startHashtag = `<span class = "hashtag">`;
    const endHashtag = `</span>`;
    const twtTpl = document.getElementById(`twit-template`);
    const container = document.getElementById(this.containerId);
    const fragment = new DocumentFragment();
    const el = twtTpl.content.cloneNode(true);
    el.querySelector(".user__name").textContent = twt.author;
    let hashText = "";
    twt.text.split(" ").forEach((word) => {
      hashText += word.startsWith("#")
        ? startHashtag + word + endHashtag + " "
        : word + " ";
    });
    el.querySelector(".twit_text").innerHTML = hashText;
    el.querySelector(".date_time").textContent = MyMoment.getDateTime(
      twt.createdAt
    );
    el.querySelector(".twit_comment").id = twt.id;
    el.querySelector(
      ".com_number"
    ).textContent = `${tweetCollection.numbOfComments(twt)}`;
    if (user !== twt.author) {
      el.querySelector(".btn_change").style.display = "none";
      el.querySelector(".btn_delete").style.display = "none";
    }

    fragment.appendChild(el);
    container.innerHTML = "";
    document.querySelector(".main_comment").style.display = "flex";
    document.querySelector(".main").style.display = "none";
    container.appendChild(fragment);
  }
}

class CommentView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(twtList) {
    const comTpl = document.getElementById(`com-template`);
    const container = document.getElementById(this.containerId);
    const fragment = new DocumentFragment();
    for (const item of twtList) {
      const el = comTpl.content.cloneNode(true);
      el.querySelector(".user__name").textContent = item.author;
      el.querySelector(".comment_text").textContent = item.text;
      el.querySelector(".date_time").textContent = MyMoment.getDateTime(
        item.createdAt
      );
      el.querySelector(".comment_info").id = item.id;
      fragment.appendChild(el);
    }
    container.innerHTML = "";
    document.querySelector(".main_comment").style.display = "flex";
    document.querySelector(".main").style.display = "none";
    container.appendChild(fragment);
  }
}

class AuthorView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(authorList) {
    const authorTpl = document.getElementById(`author-template`);
    const container = document.getElementById(this.containerId);
    const fragment = new DocumentFragment();
    for (const item of authorList) {
      const el = authorTpl.content.cloneNode(true);
      el.querySelector(".author__name").textContent = item;
      fragment.appendChild(el);
    }
    container.appendChild(fragment);
  }
}

class MyMoment {
  static getDateTime(date) {
    return `${
      String(date.getDate()).length === 2
        ? date.getDate()
        : "0" + date.getDate()
    }.${
      String(date.getMonth()).length === 2
        ? date.getMonth()
        : "0" + date.getMonth()
    }.${date.getFullYear()} 
        ${
          String(date.getHours()).length === 2
            ? date.getHours()
            : "0" + date.getHours()
        }:${
      String(date.getMinutes()).length === 2
        ? date.getMinutes()
        : "0" + date.getMinutes()
    }`;
  }
}

const tweetCollection = new TweetCollection(tweetsArray);
const headerView = new HeaderView("header-id");
const tweetFeedView = new TweetFeedView("tweet-feed-view-id");
const tweetView = new TweetView("tweet-view-id");
const commentView = new CommentView("comment-view-id");
const authorView = new AuthorView("author-view-id");

function setCurrentUser(user) {
  headerView.display(user);
}

function addTweet(text) {
  if (tweetCollection.add(text)) {
    tweetFeedView.display(tweetCollection.getPage(), tweetCollection.user);
  }
}

function editTweet(id, text) {
  if (tweetCollection.edit(id, text)) {
    tweetFeedView.display(tweetCollection.getPage(), tweetCollection.user);
  }
}

function removeTweet(id) {
  if (tweetCollection.remove(id)) {
    tweetFeedView.display(tweetCollection.getPage(), tweetCollection.user);
  }
}

function getFeed(skip, top, filterConfig) {
  tweetFeedView.display(
    tweetCollection.getPage(skip, top, filterConfig),
    tweetCollection.user
  );
}

function showTweet(id) {
  tweetView.display(tweetCollection.get(id), tweetCollection.user);
  commentView.display(tweetCollection.getCom(id));
}

function showAuthors(authorsFiltered) {
  authorView.display(tweetCollection.getAuthor(authorsFiltered));
}

setCurrentUser("John Doe");
// setCurrentUser('Nina Doe');
// setCurrentUser("Dana Doe");
// setCurrentUser();

// addTweet("Hello, my name is John! I like potato #valley");
// addTweet('Hello, I\'m John Doe. And I want to share with my #thoughts and #mood.');
// addTweet('Hello, I\'m John Doe. And I want to share with my thoughts and mood.');
// addTweet();
// getFeed(0, 10, { hashtags: ["#country", '#gurgles'] });
// console.log(tweetCollection.getPage());

// console.log(tweetCollection.get('15'));
// editTweet('15', "Hello, my name is John!");
// editTweet("2", "Hello, my name is John!");

// console.log(tweetCollection.getPage());
// removeTweet('15');
// console.log(tweetCollection.getPage());
// getFeed();
// getFeed();
getFeed();

showTweet("1");
// addTweet("Hello, my name is John! I like potato #valley");
// showTweet("2");
// showTweet("3");
// console.log(tweetCollection.get('4'));
// console.log(tweetCollection.getCom('4'));
// console.log(tweetCollection.numbOfComments('12'));

showAuthors();
