const tweetCollection = new TweetCollection(tweetsArray);
// console.log(tweetCollection.getPage());
// console.log(tweetCollection.numbOfComments('12'));


class HeaderView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(user) {
        const usr = document.getElementById(this.containerId);
        const userInfo = document.querySelector('.user__info');
        
        if(user) {
            const usrName = document.createElement('span');
            usrName.classList.add('user__name');
            usrName.textContent = `${user}`;
            tweetCollection.user = user;
            userInfo.appendChild(usrName);
        } else {
            tweetCollection.user = null;
            document.querySelector('.user__icon').style.display = 'none';
            document.querySelector('.btn_sign_out').style.display = 'none';
            document.querySelector('.btn_sign').style.display = 'flex';
        }
    }
}


class TweetFeedView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(twtList, user) {
        const twtTpl = document.getElementById(`twt-template`);
        const container = document.getElementById(this.containerId);
        const fragment = new DocumentFragment();
        for(const item of twtList) {
            const el = twtTpl.content.cloneNode(true);
            el.querySelector('.user__name').textContent = item.author;
            el.querySelector('.twit_text').textContent = item.text;
            el.querySelector('.date_time').textContent = `${new Date(item.createdAt).getDate()}.0${new Date(item.createdAt).getMonth()}.${new Date(item.createdAt).getFullYear()} ${new Date(item.createdAt).getHours()}:${new Date(item.createdAt).getMinutes()}`;
            el.querySelector('.twit').id = item.id;
            el.querySelector('.com_number').textContent = `${tweetCollection.numbOfComments(item)}`;
            if (user !== item.author) {
                el.querySelector('.btn_change').style.display = 'none';
                el.querySelector('.btn_delete').style.display = 'none';
            }
            fragment.appendChild(el);
        }
        container.appendChild(fragment);
    }
}


//здесь должны быть фильтры...
class FilterView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(tweets) {
        
    }

}

class TweetView {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display(twtList, user) {
        const twtTpl = document.getElementById(`twit-template`);
        const container = document.getElementById(this.containerId);
        const fragment = new DocumentFragment();
        const el = twtTpl.content.cloneNode(true);
        el.querySelector('.user__name').textContent = twtList.author;
        el.querySelector('.twit_text').textContent = twtList.text;
        el.querySelector('.date_time').textContent = `${new Date(twtList.createdAt).getDate()}.0${new Date(twtList.createdAt).getMonth()}.${new Date(twtList.createdAt).getFullYear()} ${new Date(twtList.createdAt).getHours()}:${new Date(twtList.createdAt).getMinutes()}`;
        el.querySelector('.twit_comment').id = twtList.id;
        el.querySelector('.com_number').textContent = `${tweetCollection.numbOfComments(twtList)}`;
        if (user !== twtList.author) {
            el.querySelector('.btn_change').style.display = 'none';
            el.querySelector('.btn_delete').style.display = 'none';
        }

        fragment.appendChild(el);
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
        for(const item of twtList) {
        const el = comTpl.content.cloneNode(true);
        el.querySelector('.user__name').textContent = item.author;
        el.querySelector('.comment_text').textContent = item.text;
        el.querySelector('.date_time').textContent = `${new Date(item.createdAt).getDate()}.0${new Date(item.createdAt).getMonth()}.${new Date(item.createdAt).getFullYear()} ${new Date(item.createdAt).getHours()}:${new Date(item.createdAt).getMinutes()}`;
        el.querySelector('.comment_info').id = item.id;
        fragment.appendChild(el);
        }
        container.appendChild(fragment);
    }
}

///////////////////////////////////////////////////////
const headerView = new HeaderView('header-id');

function setCurrentUser(user) {
    headerView.display(user);
}

setCurrentUser('John Doe');
// setCurrentUser();
//////////////////////////////////////////////////////
const tweetFeedView = new TweetFeedView('tweet-feed-view');
// tweetFeedView.display(tweetsArray, 'John Doe');
function addTweet(text) {
    if (tweetCollection.add(text)) {
        tweetFeedView.display(tweetCollection.getPage(), tweetCollection.user);
  }
}
// addTweet('Hello, my name is John! I like potato');
// addTweet();
/////////////////////////////////////////////////////
function editTweet(id, text) {
    if(tweetCollection.edit(id, text)) {
        tweetFeedView.display(tweetCollection.getPage(), tweetCollection.user);
    }
}
// editTweet('15', 'Hello, my name is John!');
/////////////////////////////////////////////////////
function removeTweet(id) {
    if (tweetCollection.remove(id)) {
        tweetFeedView.display(tweetCollection.getPage(), tweetCollection.user);
  }
}
// removeTweet('15');
/////////////////////////////////////////////////////

function getFeed(skip, top, filterConfig) {
    tweetFeedView.display(tweetCollection.getPage(skip, top, filterConfig), tweetCollection.user);
}
// getFeed();
///////////////////////////////////////////////////
//twit.html
const tweetView = new TweetView('tweet-view');
const commentView = new CommentView('com-view');
// tweetView.display(tweetsArray, 'John Doe');
function showTweet(id) {
    tweetView.display(tweetCollection.get(id), tweetCollection.user);
    commentView.display(tweetCollection.getCom(id));
}
showTweet('4');
console.log(tweetCollection.get('4'));
console.log(tweetCollection.getCom('4'));
