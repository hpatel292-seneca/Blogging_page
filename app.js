//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const url = 'mongodb+srv://26harshil:Nimesh26@cluster0.uprhtzl.mongodb.net/?retryWrites=true';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Blog',
  })

const postSchema = {
  title: String,
  content: String
}

const Blog = mongoose.model("BlogBase", postSchema);

const BlogPost = mongoose.model("Blog", postSchema);

const home = new Blog({title: "Home", content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."});

const about = new Blog({title: "About", content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."});

const contact = new Blog({title: "Contact", content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."});

const defaultBlog = [home, about, contact];
// Blog.insertMany(defaultBlog, (err)=>{
//   if(!err){
//     console.log("added ");
//   }
// })
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res)=>{
  Blog.findOne({title: "Home"}, (err, data)=>{
    console.log(data);
    BlogPost.find({}, (err,blogs)=>{
      res.render("home", {content: data, post: blogs});
    })
  })
  
})

app.get("/post/:title", (req,res)=>{
  let id = req.params.title;
  BlogPost.findById(id, (err,data)=>{
    res.render("post", {post: data})
  })

  console.log("/post hit");
})
app.get("/about", (req, res)=>{
  // res.render("about", {content: aboutContent});
  Blog.findOne({title: "About"}, (err, data)=>{
    // console.log(data);
    res.render("about", {content: data});
  })
})

app.get("/contact", (req, res)=>{
  // res.render("contact", {content: contactContent});
  Blog.findOne({title: "Contact"}, (err, data)=>{
    // console.log(data);
    res.render("about", {content: data});
  })
})

app.get("/compose", (req, res)=>{
  res.render("compose");
})


app.post("/post", (req, res)=>{
  // let post = {
  //   title: req.body.title,
  //   body: req.body.post
  // }
  let post = new BlogPost({
    title: req.body.title,
    content: req.body.post
  })
  // posts.push(post);
  post.save((err)=>{
    res.redirect("/");
  });
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
