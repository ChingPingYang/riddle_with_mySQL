const Riddle = require("../models/riddle");
const Comment = require("../models/comment");
const util = require("../util/util");
const url = require("url");

exports.getHomePage =  (req, res, next) => {
  const filter = req.query.filter;
  Riddle.getAll().then(async riddles => {
    try{
    // Filter the riddles here //
    let sortedRiddles = await util.filterRiddle(filter, riddles);
    res.render("home", { riddles: sortedRiddles, filter });
    } catch (err){
      console.log(err)
    }
  });
};

exports.createRiddle = (req, res, next) => {
  res.render("create");
};

exports.postRiddle = (req, res, next) => {
  const riddle = new Riddle(
    req.body.author,
    req.body.title,
    req.body.content,
    util.getRandomBgImg()
  );
  riddle.saveRiddle();
  res.redirect("/");
};

exports.detailRiddle = (req, res, next) => {
  const riddleId = req.params.riddleId;
  const isEditing = req.query.edit;

  Riddle.getOne(riddleId).then(riddle => {
    //for Data>>>> not sure if delete
    // riddle.date = util.getFormattedDate(riddle.date);

    const bgImgFile = riddle.image_url || util.getRandomBgImg();
    Comment.getAllComment().then(comments => {
      res.render("detail", {
        riddle,
        comments,
        editMode: isEditing,
        bgImgFile,
        editComment: req.query.editComment,
        editCommentId: req.query.editCommentId,
        createComment: req.query.createComment
      });
    });
  });
};

exports.deleteRiddle = async (req, res, next) => {
  const riddleId = req.body.riddleId;
  Comment.deleteAllComment(riddleId);
  await Riddle.deleteRiddle(riddleId);
  res.redirect("/");
};

exports.like = async (req, res, next) => {
  const riddleId = req.body.riddleId;
  const imgUrl = req.body.imgUrl;
  await Riddle.like(riddleId);
  res.redirect("/riddles/" + riddleId + "?imgUrl=" + imgUrl);
};

exports.showCommentForm = (req, res, next) => {
  res.redirect(
    url.format({
      pathname: "/riddles/" + req.query.riddleId,
      query: {
        createComment: true
      }
    })
  );
};

exports.createComment = (req, res, next) => {
  const comment = new Comment(
    req.body.riddleId,
    req.body.author,
    req.body.comment,
    0,
  );
  comment.saveComment();
  res.redirect("/riddles/" + req.body.riddleId);
};

exports.commentVote = async (req, res, next) => {
  const { id, vote, riddle_id } = req.body;
  let value = vote == 'agree'? 1: -1;
  await Comment.voteComment(id, value)
  res.redirect(`/riddles/${riddle_id}`)
}
exports.editComment = (req, res, next) => {
  res.redirect(
    url.format({
      pathname: "/riddles/" + req.query.riddleId,
      query: {
        editComment: true,
        editCommentId: req.query.commentId
      }
    })
  );
};

exports.updateComment = async (req, res, next) => {
  await Comment.updateComment(
    req.body.commentId,
    req.body.author,
    req.body.comment
  );
  res.redirect("/riddles/" + req.body.riddleId);
};

exports.deleteComment = async (req, res, next) => {
  await Comment.deleteComment((req.body.commentId));
  res.redirect("/riddles/" + req.body.riddleId);
};
