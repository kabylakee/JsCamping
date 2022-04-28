class TweetFeedApiService {
  constructor(adress = "https://jslabapi.datamola.com/") {
    this.adress = adress;
  }

  postLogin(body) {
    return fetch(this.adress + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
  }

  postRegistration(body) {
    return fetch(this.adress + "registration", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(body),
    });
  }

  postTweet(body) {
    return fetch(this.adress + "tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(body),
    });
  }

  putTweet(body, id) {
    return fetch(this.adress + `tweet/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(body),
    });
  }

  deleteTweet(id) {
    return fetch(this.adress + `tweet/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
  }

  postComment(id, body) {
    return fetch(this.adress + `tweet/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(body),
    });
  }

  getTweets(filterConfig) {
    removeKeys(filterConfig);
    const url = "https://jslabapi.datamola.com/tweet";
    return fetch(`${url}?${new URLSearchParams(filterConfig)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          console.warn(res.status, "Error");
        }
      })
      .then((data) => {
        data.forEach((item) => {
          item.createdAt = new Date(item.createdAt);
          item.textWithoutHashtags = item.text;
          item.comments.forEach((commment) => {
            commment.createdAt = new Date(commment.createdAt);
          });
        });
        return data;
      });
  }

  getTweetsForTop() {
    const filterConfig = { skip: 0, top: 0 };
    const url = "https://jslabapi.datamola.com/tweet";
    return fetch(`${url}?${new URLSearchParams(filterConfig)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          console.warn(res.status, "Error");
        }
      })
      .then((data) => {
        const listAuthors = {};
        data.forEach((item) => {
          listAuthors[item.author] =
            listAuthors[item.author] === undefined
              ? 1
              : listAuthors[item.author] + 1;
        });
        // console.log(listAuthors);
        const sortedList = [];
        for (let el in listAuthors) {
          sortedList.push({ author: el, count: listAuthors[el] });
        }
        return sortedList.sort((a, b) => b.count - a.count);
      });
  }
}
