import express from "express";
import bodyParser from "body-parser";
import ejs from 'ejs';


const app = express();
const port = 3000;
var formattedDate = "August 7, 2024";
var formattedTime = "11:30 AM";

// var alertOn = true;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

var count = 1;

function blog(title, author, blogText, date, time)
{
    this.title = title;
    this.author = author;
    this.date = date;
    this.time = time;
    this.blogText = blogText;
}

let title = "A Better Edit Makes Better Photographs";
let blogText = "Take a few minutes to watch the video above or, if you’re more of a written word person, keep reading. When I came home from Kenya last year, I had a hard drive filled to busting with 30,000 images. I’d been photographing for 30 days, so that’s a daily average of 1,000 photographs which, it turns out, is really easy …";
let author = " David duChemin";


const blogs = [];
let blogg = new blog(title, author, blogText, formattedDate, formattedTime);
blogs.push(blogg);

var blogIndex = -1;

app.get("/", (req, res) => {
  var blogIndex = -1;
  res.render("index.ejs", {blogs, blogIndex});
}); 

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

app.get("/newBlog", (req, res) => {
  res.render('newBlog.ejs');
});

app.post("/submit", (req, res) => {
  const t = req.body.title;
  if(t==="") title = "No title";
  else  title = t;

  const a = req.body.author;
  if(a==="") author = "Anonymous";
  else  author = a;

  const b = req.body.blogText;
  if(b !="") {
    blogText = b;
  }

  if(b != "")
  {
    getDateTime();
    blogg = new blog(title, author, blogText, formattedDate, formattedTime);
    blogs.push(blogg);
    UpdateLength();
  }
  
  res.render("submit.ejs", {b});
});


function UpdateLength(){
  for (let i = 0; i < blogs.length; i++) {
    (function(i) {
      app.get("/blogId" + i, (req, res) => {
        res.render("blog.ejs", { blogg: blogs[i] });
        // const x = blogs[i].blogText;
        // console.log(x)
        // let a = document.querrySelector("#blogTextHolder");
        // a.innerHTML = x
      });
    })(i);
  }
};

UpdateLength();

const getDateTime = function(){
  const now = new Date();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const hours = now.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  formattedTime = `${hours % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${ampm}`;

  console.log(`${formattedDate}`);
  console.log(`${formattedTime}`);

}

