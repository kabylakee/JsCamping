const tweets = [
  {
     id: '1',
     text: 'Far, far behind verbal mountains in the country of vowels and consonants live fish texts. #fish #texts',
     createdAt: new Date('2022-03-09T23:00:00'),
     author: 'John Doe',
     comments: [
         {
             id: '11',
             text: 'Cool!',
             createdAt: new Date('2022-03-10T23:00:05'),
             author: 'Nina Doe',
        },
        {
            id: '12',
            text: 'Wow',
            createdAt: new Date('2022-03-11T23:00:05'),
            author: 'Viva Toe',
        }],
  },
  {
     id: '2',
     text: 'Far from everyone, they live in letter houses on the shores of the Semantics of a large #linguistic #ocean.',
     createdAt: new Date('2022-03-10T16:48:01'),
     author: 'Sarah Loren',
     comments: [
         {
             id: '21',
             text: 'What are you doing?',
             createdAt: new Date('2022-03-10T21:20:00'),
             author: 'Nina Doe',
        }],
  },
  {
     id: '3',
     text: 'May Be This Will be helpful to future guys mab be this thing will never #be #same.',
     createdAt: new Date('2022-03-11T10:23:10'),
     author: 'Lara Couch',
     comments: [
         {
             id: '31',
             text: 'Verbal mountains...',
             createdAt: new Date('2022-03-11T10:40:05'),
             author: 'Nina Doe',
        },
        {
            id: '32',
            text: 'Thanks!',
            createdAt: new Date('2022-03-11T10:50:45'),
            author: 'Sarah Jackson',
        }],
  },
  {
     id: '4',
     text: 'The small stream Dal #gurgles all over the #country',
     createdAt: new Date('2022-03-11T15:30:00'),
     author: 'John Doe',
     comments: [
         {
            id: '41',
            text: 'All the necessary rules!',
            createdAt: new Date('2022-03-11T16:23:01'),
            author: 'Kim Jennet',
            },
        {
            id: '42',
            text: 'Awesome',
            createdAt: new Date('2022-03-11T17:20:27'),
            author: 'Nina Doe',
        },
        {
            id: '43',
            text: 'SuperCool',
            createdAt: new Date('2022-03-11T17:20:27'),
            author: 'Sarah Jackson',
        }],
  },
  {
     id: '5',
     text: 'This is a paradigmatic #country',
     createdAt: new Date('2022-03-12T10:25:12'),
     author: 'Kim Jennet',
     comments: [],
  },
  {
     id: '6',
     text: 'Paradigmatic country in which fried sentence members #fly #right into your mouth',
     createdAt: new Date('2022-03-12T16:23:01'),
     author: 'Sarah Loren',
     comments: [
         {
             id: '61',
             text: 'Its so stupid',
             createdAt: new Date('2022-03-12T21:20:00'),
             author: 'Nina Doe',
        }],
  },
  {
     id: '7',
     text: 'Gurgles #all over the #country and provides it with all the #necessary rules',
     createdAt: new Date('2022-03-12T19:43:23'),
     author: 'Kylie Jennet',
     comments: [
         {
             id: '71',
             text: 'CoolCoool',
             createdAt: new Date('2022-03-12T22:21:00'),
             author: 'Kim Jennet',
        }],
  },
  {
     id: '8',
     text: 'Stream Dal gurgles all over the #country and provides it with all the #necessary rules',
     createdAt: new Date('2022-03-12T20:43:23'),
     author: 'Lessika Kim',
     comments: [
         {
             id: '81',
             text: 'What do you mean?',
             createdAt: new Date('2022-03-12T23:21:00'),
             author: 'Kim Jennet',
        }],
  },
  {
     id: '9',
     text: 'Fried sentence members have #necessary rules',
     createdAt: new Date('2022-03-12T22:43:12'),
     author: 'Nina Doe',
     comments: [],
  },
  {
     id: '10',
     text: 'All the #necessary rules',
     createdAt: new Date('2022-03-12T19:43:23'),
     author: 'Kylie Jennet',
     comments: [
         {
             id: '101',
             text: 'CoolCoool',
             createdAt: new Date('2022-03-12T22:21:00'),
             author: 'Kim Jennet',
        }],
  },
  {
     id: '11',
     text: 'Not listening to the #manuscript, our text #continued on its way.',
     createdAt: new Date('2022-03-13T19:43:23'),
     author: 'Sarah Palmen',
     comments: [
         {
             id: '111',
             text: 'CoolCoool',
             createdAt: new Date('2022-03-13T22:21:00'),
             author: 'Paul Jennet',
        }],
  },
  {
     id: '12',
     text: 'Winter is coming...',
     createdAt: new Date('2022-03-13T20:32:23'),
     author: 'John Snow',
     comments: [
         {
             id: '121',
             text: 'You dont know anything..',
             createdAt: new Date('2022-03-13T22:24:43'),
             author: 'Miranda Kia',
        },
        {
             id: '122',
             text: 'You dont know anything..',
             createdAt: new Date('2022-03-13T22:44:03'),
             author: 'Miranda Kia',
        }],
  },
  {
     id: '13',
     text: 'He met an #insidious #compiler',
     createdAt: new Date('2022-03-14T10:23:23'),
     author: 'Kylie Jennet',
     comments: [
         {
             id: '131',
             text: 'WowWOWWow',
             createdAt: new Date('2022-03-14T11:21:00'),
             author: 'Kim Jennet',
        },
        {
             id: '132',
             text: 'LOL',
             createdAt: new Date('2022-03-14T12:31:10'),
             author: 'Miranda Kia',
        },
        {
             id: '133',
             text: 'Stupid',
             createdAt: new Date('2022-03-14T12:51:34'),
             author: 'Kim Jennet',
        }],
  },
  {
     id: '14',
     text: 'Spring mornings that I enjoy with all #my #heart',
     createdAt: new Date('2022-03-14T11:23:23'),
     author: 'Jessika Klen',
     comments: [],
  },
  {
     id: '15',
     text: 'All alone and blissful in this land',
     createdAt: new Date('2022-03-14T16:43:23'),
     author: 'John Doe',
     comments: [
         {
             id: '151',
             text: 'Very helpful. Thanks',
             createdAt: new Date('2022-03-14T16:55:45'),
             author: 'John Lennon',
        }],
  },
  {
     id: '16',
     text: 'Created for people like me',
     createdAt: new Date('2022-03-14T19:43:23'),
     author: 'Kylie Jennet',
     comments: [
         {
             id: '161',
             text: 'Thanks!',
             createdAt: new Date('2022-03-14T20:21:30'),
             author: 'Sarah Petrova',
        },
        {
             id: '162',
             text: 'so happy!',
             createdAt: new Date('2022-03-14T22:21:00'),
             author: 'Kim Jennet',
        }],
  },
  {
     id: '17',
     text: 'My friend, so intoxicated with the feeling of peace that my #art #suffers',
     createdAt: new Date('2022-03-15T07:23:23'),
     author: 'Rita Newman',
     comments: [
         {
             id: '171',
             text: 'Art in my heart',
             createdAt: new Date('2022-03-15T08:21:00'),
             author: 'Jonh Lennon',
        }],
  },
  {
     id: '18',
     text: 'I could not have done a single stroke, and I have never been such a great artist as at #these #moments. ',
     createdAt: new Date('2022-03-15T08:43:32'),
     author: 'Tony Stark',
     comments: [
         {
             id: '181',
             text: 'Single stroke is single stroke',
             createdAt: new Date('2022-03-15T12:21:20'),
             author: 'Pit Mellark',
        },
        {
             id: '182',
             text: 'Tnx!',
             createdAt: new Date('2022-03-15T13:43:20'),
             author: 'Kitnis Everdin',
        }],
  },
  {
     id: '19',
     text: 'When steam rises from my #dear valley....',
     createdAt: new Date('2022-03-15T15:23:56'),
     author: 'Gloria Jennet',
     comments: [
         {
             id: '191',
             text: 'Cool',
             createdAt: new Date('2022-03-15T16:21:00'),
             author: 'John Doe',
        }],
  },
  {
     id: '20',
     text: 'The midday sun stands over the impenetrable thicket of the #dark #forest',
     createdAt: new Date('2022-03-12T19:54:23'),
     author: 'Vika Rabcevich',
     comments: [
         {
             id: '201',
             text: 'Awesome',
             createdAt: new Date('2022-03-12T22:21:12'),
             author: 'Kim Jennet',
        }],
  }
];

// console.log(tweets);

////////////////////////////////////////////////////////

const myModule = (function() {

let user="Vika Rabcevich";

const FiltersKeys = {
    AUTHOR: 'author',
    TEXT: 'text',
    DATE_FROM: 'dateFrom',
    DATE_TO: 'dateTo',
    HASHTAGS: 'hashtags',
    COMMENTS: 'comments',
};

const TweetKeys = {
    ID: 'id',
    AUTHOR: 'author',
    TEXT: 'text',
    CREATED_AT: 'createdAt',
    COMMENTS: 'comments',
};

const CommentKeys = {
    ID: 'id',
    TEXT: 'text',
    CREATED_AT: 'createdAt',
    AUTHOR: 'author',
}


function getTweets( skip = 0, top = 10, filterConfig = {}) {
    let tweetsFiltered = tweets.slice();

    for(let key in filterConfig) {
        if (key === FiltersKeys.AUTHOR) {
            tweetsFiltered = tweetsFiltered.filter(item => !filterConfig[key] || item.author.toLowerCase().includes(filterConfig[key].toLowerCase()));
        }
        if (key === FiltersKeys.TEXT) {
            tweetsFiltered = tweetsFiltered.filter(item => !filterConfig[key] || item.text.toLowerCase().includes(filterConfig[key].toLowerCase()));
        }
        if (key === FiltersKeys.DATE_FROM) {
            tweetsFiltered = tweetsFiltered.filter(item => !filterConfig[key] || item.createdAt >= filterConfig[key]);
        }
        if (key === FiltersKeys.DATE_TO) {
            tweetsFiltered = tweetsFiltered.filter(item => !filterConfig[key] || item.createdAt <= filterConfig[key]);
        }
        if (key === FiltersKeys.HASHTAGS) {
            // console.log(tweetsFiltered[0].text.split(' ').filter(item => item.startsWith('#')));
            tweetsFiltered = tweetsFiltered.filter(item => filterConfig[key].every(filterHashtag => item.text.split(' ').filter(item => item.startsWith('#')).includes(filterHashtag)));
        }
    }
    return tweetsFiltered.sort((a, b) =>  b.createdAt - a.createdAt).slice(skip, skip + top);
}


    function getTweet(id) {
        return tweets.find(item => item.id === id);
    }


    function validateTweet(tw) {
            return Object.keys(tw).reduce((acc, key) => {
            if (key === TweetKeys.ID) {
                acc = typeof tw?.id === 'string';
                return acc;
            }
             if (key === TweetKeys.TEXT) {
                acc = acc && typeof tw?.text === 'string' && tw?.text.length > 0 && tw?.text.length <= 280;
                return acc;
            }
             if (key === TweetKeys.CREATED_AT) {
                acc = acc && tw?.createdAt instanceof Date;
                return acc;
            }
             if (key === TweetKeys.AUTHOR) {
                acc = acc && typeof tw?.author === 'string';
                return acc;
            }
            if (key === TweetKeys.COMMENTS) {
                acc = acc && Array.isArray(tw?.comments);
                return acc;
            }
        }, false);
    }


    function addTweet(text) {
        const newTweet = {
            id: `${+new Date()}`,
            author: user,
            text: text,
            createdAt: new Date(),
            comments: [],
        };
        if(validateTweet(newTweet)) {
            tweets.push(newTweet);
            console.log('Tweet added successfully!');
            return true;
        }
        console.log('Tweet was not added!');
        return false;
    }


    function editTweet(id, text) {
        const tweet = getTweet(id);
        if (tweet.author === user) {
            if (validateTweet({...tweet, text}) ) {
                tweet.text = text;
                return true;
            } 
        } 
        return false;
    }


    function removeTweet(id) {
        const tweet = getTweet(id);
        if (tweet.author === user) {
            tweets.splice(tweets.indexOf(getTweet(id)), 1);
            return true;
        }
      return false;
    }


    function validateComment(com) {
        return Object.keys(com).reduce((acc, key) => {
            if (key === CommentKeys.ID) {
                acc = typeof com?.id === 'string';
                return acc;
            }
             if (key === CommentKeys.TEXT) {
                acc = acc && typeof com?.text === 'string' && com?.text.length > 0 && com?.text.length <= 280;
                return acc;
            }
             if (key === CommentKeys.CREATED_AT) {
                acc = acc && com?.createdAt instanceof Date;
                return acc;
            }
             if (key === CommentKeys.AUTHOR) {
                acc = acc && typeof com?.author === 'string';
                return acc;
            }
        }, false);
    }


    function addComment(id, text) {
        const newComment = {
            id: `${+new Date()}`,
            author: user,
            text: text,
            createdAt: new Date(),
        };
        if(validateComment(newComment)) {
            const comment = getTweet(id).comments;
            comment.push(newComment);
                // console.log(newTweet);
            console.log('Comment added successfully');
            return true;
        }
        console.log('Comment wasn\'t added');
        return false;
    }


    function changeUser(usr) {
        user = usr;
    }



// console.log(getTweets(0, 10));
// console.log(getTweets(10, 10));
// console.log(getTweets());
// console.log(getTweets(0, 10, {author: 'John'}));
// console.log(getTweets(0, 10, {author: 'Samanta'}));
// console.log(getTweets(0, 10, {dateTo: new Date('2022-03-14T19:43:23')}));
// console.log(getTweets(0, 10, {dateFrom: new Date('2022-03-14T19:43:23')}));
// console.log(getTweets(0, 10, {dateFrom: new Date('2022-03-14T19:43:23'), dateTo: new Date('2022-03-15T15:23:56')}));
// console.log(getTweets(0, 10, {text: 'country'}));
// console.log(getTweets(0, 10, {text: 'country', dateFrom: new Date('2022-03-09T23:00:00'), dateTo: new Date('2022-03-15T15:23:56')}));
// console.log(getTweets(0, 10, {text: '#dear'}));
// console.log(getTweets(0, 10, {hashtags: ['#fish', '#texts']}));
// console.log(getTweets(0, 10, {hashtags: ['#moment']}));

// console.log(getTweet('3'));
// console.log(getTweet('32'));

// console.log(validateTweet({
//      id: '20',
//      text: 'The midday sun.. #dark #forest',
//      createdAt: new Date('2022-03-12T19:54:23'),
//      author: 'Tony Stark',
//      comments: [],
//   }
// ));

// console.log(validateTweet({
//      id: '234',
//      text: '',
//      createdAt: new Date('2022-03-12T19:54:23'),
//      author: 'Tony Stark',
//      comments: [],
//   }
// ));

// console.log(validateTweet({
//      id: '234',
//      text: 'Hello',
//      createdAt: '2022-03-12T19:54:23',
//      author: 'Tony Stark',
//      comments: [],
//   }
// ));

    // console.log(addTweet('The sun stands #dark')); 
    // console.log(addTweet('')); 
    // console.log(getTweet(`${+new Date()}`));
    // console.log(tweets);

    // console.log(editTweet('20', 'Hi'));
    // console.log(getTweet('20'));
    // console.log(editTweet('20', ''));
    // console.log(getTweet('20'));

    // console.log(removeTweet('20'));
    // console.log(tweets);
    // console.log(removeTweet('19'));
    // console.log(tweets);

    // console.log(validateComment({
    //     id: '201',
    //     text: 'Awesome',
    //     createdAt: new Date('2022-03-12T22:21:12'),
    //     author: 'Kim Jennet',
    // }
    // ));

    // console.log(validateComment({
    //     id: '201',
    //     text: 'Awesome',
    //     createdAt: new Date('2022-03-12T22:21:12'),
    //     author: 'Kim Jennet',
    // }
    // ));

    // console.log(addComment('15', 'HELLO')); 
    // console.log(addTweet('')); 
    // console.log(getTweet('15'));
    // console.log(tweets);

return {getTweets, getTweet, validateTweet, addTweet, editTweet, removeTweet, validateComment, addComment, changeUser}


}) ();
