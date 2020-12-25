// this class will be iniitialized for each post :
// when page loads,creation of post via AJAX..

class PostComments {
  constructor(postId) {
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comments-form`);

    this.createComment(postId);

    let self = this;

    // call existing all comments

    $(' .delete-comment-button', this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }

  createComment(postId) {
    let pself = this;

    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: $(self).serialize(),
        success: function (data) {
          let newComment = pself.newCommentDom(data.data.comment);
          $(`#post-comments-${postId}`).prepend(newComment);
          pself.deleteComment($(' .delete-comment-button', newComment));
          new Noty({
            theme: 'relax',
            text: 'Comment published!',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }

  newCommentDom(comment) {
    return $(`<li id="comment-${comment._id}">
  <p>
   
    <small>
      <a  class="delete-comment-button"  href="/comments/destroy/${comment._id}">delete</a>
    </small>
   ${comment.content}
    <br />
    <small>
       ${comment.user.name}
    </small>
    <small>

    <a
      class="toggle=like-button"
      data-likes="0"
      href="/likes/toggle/?id={comment._id}&type=Comment"
    >
     0Likes
    </a>
   
  </small>
  </p>
</li>`);
  }

  deleteComment(deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          new Noty({
            theme: 'relax',
            text: 'Comment Deleted',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  }
}

// {
//   let createComment = function () {
//     let newCommentForm = $('#new-comment-form');

//       newCommentForm.submit(function (e) {

//           e.preventDefault();

//           $.ajax({
//             type: 'post',
//               url: '/comments/create',
//               data: newCommentForm.serialize(),
//               success: function (data) {

//                   let newComment = newCommentDom(data.data.comment);
//                   $('')
//               },
//               error: function (error) {
//                   console.log(error.responseText());
//             }
//           });

//     });
//   };
// }
