{
  //   console.log('hello');
  // method to submit the form data for new post using AJAX..
  let createPost = function () {
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/posts/create',
        data: newPostForm.serialize(),
        success: function (data) {
          //   console.log(data);
          let newPost = newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
          deletePost($(' .delete-post-button', newPost));

          // calling comments class to add ajax
          new PostComments(data.data.post._id);

          // to toggle like button on the new post
          new ToggleLike($('.toggle-like-button', newPost));

          new Noty({
            theme: 'relax',
            text: 'Post published !',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText());
        },
      });
    });
  };
  //   method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
  <p>
   <small>
      <a class="delete-post-button" href="/posts/destroy/${post._id}">delete</a>
    </small>
     ${post.content}
    <br />
    <small>
      ${post.user.name}
    </small>
    <small>
   
    <a
      class="toggle=like-button"
      data-likes="0"
      href="/likes/toggle/?id=${post._id}&type=Post"
    >
     0 Likes
    </a> 
   
  </small>
  </p>
  <div class="post-comments">
  <form id="post-${post._id}-comments-form" action="/comments/create" method="post">
      <input
        type="text"
        name="content"
        placeholder="type here comment.."
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add Comment" />
    </form>
   <div class="post-comments-list">
      <ul id="post-comments-${post._id}">
       </ul>
    </div>
  </div>
</li>`);
  };

  // method to delete a post from DOM

  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop('href'),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();

          new Noty({
            theme: 'relax',
            text: 'Post deleted !',
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
  };
  // method to add ajax to previously added post on loading window for the first time.
  let convertToAjax = function () {
    $('#posts-list-container>ul>li').each(function () {
      let self = $(this);

      let deletebtn = $(' .delete-post-button', self);
      deletePost(deletebtn);

      let postId = self.prop('id').split('-')[1];
      // calling ajax for existing comments..when page loads.
      new PostComments(postId);
    });
  };

  createPost();
  convertToAjax();
}
