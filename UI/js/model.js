class Tweet {
  constructor(id, text, createdAt, author, comments) {
    this._id = id;
    this.text = text;
    this._createdAt = new Date(createdAt);
    this._author = author;
    this.comments = comments;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    console.log("Cannot set id", id);
  }

  get author() {
    return this._author;
  }

  set author(author) {
    console.log("Cannot set author", author);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    console.log("Cannot set createdAt", createdAt);
  }

  static requiredTweetKeys = ["id", "text", "createdAt", "author", "comments"];

  static validate(tw) {
    return Tweet.requiredTweetKeys.reduce((acc, key) => {
      if (key === "id") {
        acc = acc && typeof tw?.id === "string";
        return acc;
      }
      if (key === "text") {
        acc =
          acc &&
          typeof tw?.text === "string" &&
          tw?.text.length > 0 &&
          tw?.text.length <= 280;
        return acc;
      }
      if (key === "createdAt") {
        acc = acc && tw?.createdAt instanceof Date;
        return acc;
      }
      if (key === "author") {
        acc = acc && typeof tw?.author === "string";
        return acc;
      }
      if (key === "comments") {
        acc = acc && Array.isArray(tw?.comments);
        return acc;
      }
    }, true);
  }
}

class Comment {
  constructor(id, text, createdAt, author) {
    this._id = id;
    this.text = text;
    this._createdAt = new Date(createdAt);
    this._author = author;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    console.log("Cannot set id", id);
  }

  get author() {
    return this._author;
  }

  set author(author) {
    console.log("Cannot set author", author);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    console.log("Cannot set createdAt", createdAt);
  }

  static requiredComKeys = ["id", "text", "createdAt", "author"];

  static validate(com) {
    return Comment.requiredComKeys.reduce((acc, key) => {
      if (key === "id") {
        acc = acc && typeof com?.id === "string";
        return acc;
      }
      if (key === "text") {
        acc =
          acc &&
          typeof com?.text === "string" &&
          com?.text.length > 0 &&
          com?.text.length <= 280;
        return acc;
      }
      if (key === "createdAt") {
        acc = acc && com?.createdAt instanceof Date;
        return acc;
      }
      if (key === "author") {
        acc = acc && typeof com?.author === "string";
        return acc;
      }
    }, true);
  }
}

class TweetCollection {
  constructor(tws) {
    // this._tweets = tws.map(
    //   (item) =>
    //     new Tweet(
    //       item.id,
    //       item.text,
    //       item.createdAt,
    //       item.author,
    //       item.comments
    //     )
    // );
    // console.log(this._tweets);
    TweetCollection.user = null;
    this.restore();
  }

  static user;

  get tweets() {
    return this._tweets;
  }

  set tweets(tweets) {
    this._tweets = tweets;
  }

  // static get user() {
  //   return TweetCollection.user;
  // }

  // static set user(user) {
  //   TweetCollection.user = user;
  //   this.saveUser();
  // }

  getPage(skip = 0, top = 10, filterConfig = {}) {
    let tweetsFiltered = this.tweets.slice();

    for (let key in filterConfig) {
      if (key === "author") {
        tweetsFiltered = tweetsFiltered.filter(
          (item) =>
            !filterConfig[key] ||
            item.author.toLowerCase().includes(filterConfig[key].toLowerCase())
        );
      }
      if (key === "text") {
        tweetsFiltered = tweetsFiltered.filter(
          (item) =>
            !filterConfig[key] ||
            item.text.toLowerCase().includes(filterConfig[key].toLowerCase())
        );
      }
      if (key === "dateFrom") {
        tweetsFiltered = tweetsFiltered.filter(
          (item) => !filterConfig[key] || item.createdAt >= filterConfig[key]
        );
      }
      if (key === "dateTo") {
        tweetsFiltered = tweetsFiltered.filter(
          (item) => !filterConfig[key] || item.createdAt <= filterConfig[key]
        );
      }
      if (key === "hashtags") {
        tweetsFiltered = tweetsFiltered.filter((item) =>
          filterConfig[key].every((filterHashtag) =>
            item.text
              .split(" ")
              .filter((item) => item.startsWith("#"))
              .includes(filterHashtag)
          )
        );
      }
    }
    return tweetsFiltered
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(skip, skip + top);
  }

  get(id) {
    return this.tweets.find((item) => item.id === id);
  }

  getCom(id) {
    return this.tweets.find((item) => item.id === id).comments;
  }

  getAuthor(authorsFiltered = []) {
    authorsFiltered = this.tweets.map((tweet) => (tweet = tweet.author));
    return [...new Set(authorsFiltered)];
  }

  add(text) {
    const newTweet = new Tweet(
      `${+new Date()}`,
      text,
      new Date(),
      TweetCollection.user,
      []
    );
    if (Tweet.validate(newTweet)) {
      this.tweets.push(newTweet);
      this.saveTweets();
      console.log("Tweet added successfully!");
      return true;
    }
    console.log("Tweet was not added!");
    return false;
  }

  addComment(id, text) {
    let newComment = new Comment(
      `${+new Date()}`,
      text,
      new Date(),
      TweetCollection.user
    );
    if (Comment.validate(newComment)) {
      const comment = this.getCom(id);
      comment.push(newComment);
      this.saveTweets();
      console.log("Comment added successfully");
      return true;
    }
    console.log("Comment wasn't added");
    return false;
  }

  edit(id, text) {
    let tweet = this.get(id);
    if (tweet && tweet.author === TweetCollection.user) {
      const newTweet = new Tweet(
        tweet.id,
        text,
        tweet.createdAt,
        tweet.author,
        tweet.comments
      );
      if (Tweet.validate(newTweet)) {
        tweet.text = text;
        console.log("Tweet was edited!");
        this.saveTweets();
        return true;
      }
      console.log("Tweet was not edited 1");
      return false;
    }
    console.log("Tweet was not edited 2");
    return false;
  }

  remove(id) {
    let tweet = this.get(id);
    // console.log(id, tweet);
    if (tweet && tweet.author === TweetCollection.user) {
      this.tweets.splice(this.tweets.indexOf(this.get(id)), 1);
      this.saveTweets();
      return true;
    }
    return false;
  }

  addAll(tws) {
    tws = tws.map(
      (item) =>
        new Tweet(
          item.id,
          item.text,
          item.createdAt,
          item.author,
          item.comments
        )
    );
    let invalidTweets = [];
    for (let tw of tws) {
      if (Tweet.validate(tw) === false) {
        invalidTweets.push(tw);
      }
      this.tweets.push(Tweet.tw);
    }
    return invalidTweets;
  }

  static numbOfComments(item) {
    return item?.comments?.length || "";
  }

  clear() {
    this.tweets = [];
  }

  saveUser(isSaveOrRemove) {
    localStorage.setItem(
      "user",
      JSON.stringify(isSaveOrRemove ? TweetCollection.user : null)
    );
  }

  saveTweets() {
    localStorage.setItem("tweetsArray", JSON.stringify(this.tweets));
  }

  restore() {
    const user = JSON.parse(localStorage.getItem("user"));
    TweetCollection.user = user || null;
    const tweets = JSON.parse(localStorage.getItem("tweetsArray"));
    this.tweets = tweets.map(
      (item) =>
        new Tweet(
          item.id || item._id,
          item.text,
          item.createdAt || item._createdAt,
          item.author || item._author,
          item.comments.map(
            (com) =>
              new Comment(
                com.id || com._id,
                com.text,
                com.createdAt || com._createdAt,
                com.author || com._author
              )
          )
        )
    );
  }
}

class UserCollection {
  constructor() {
    this.restore();
  }

  set users(users) {
    this._users = users;
  }

  get users() {
    return this._users;
  }

  restore() {
    this.users = JSON.parse(localStorage.getItem("users"));
    console.log(this.users);
  }

  save(user) {
    if (!this.isExist(user)) {
      this.users.push(user);
      localStorage.setItem("users", JSON.stringify(this.users));
      return true;
    }
    return false;
  }

  isExist(user) {
    console.log(this.users, user);
    return this.users.find((item) => item.userName === user.userName && item.password === user.password);
  }

}


