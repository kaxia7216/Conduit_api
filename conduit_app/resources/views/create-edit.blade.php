@include('layouts.head')
@include('layouts.header')
<div class="editor-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <ul class="error-messages">
          <!-- <li>That title is required</li> -->
        </ul>
        @if($editMode === 1)
          <form method="get" action="/edit">
            <fieldset>
            @csrf
              <fieldset class="form-group">
                <input id="title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input id="description" type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  id="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input id="tagList" type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list">
                  <span class="tag-default tag-pill"> <i class="ion-close-round"></i> tag </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit" onclick="editArticle({{$id}})">
                Publish Article
              </button>
            </fieldset>
          </form>
        @else
          <form method="POST" action="/create">
            <fieldset>
            @csrf
              <fieldset class="form-group">
                <input id="title" type="text" class="form-control form-control-lg" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input id="description" type="text" class="form-control" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  id="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input id="tagList" type="text" class="form-control" placeholder="Enter tags" />
                <div class="tag-list">
                  <span class="tag-default tag-pill"> <i class="ion-close-round"></i> tag </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit" onclick="addArticle()">
                Publish Article
              </button>
            </fieldset>
          </form>
        @endif
      </div>
    </div>
  </div>
</div>
<footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp;
          design licensed under MIT.
        </span>
      </div>
    </footer>
    <script src="/js/script.js"></script>
    @if($editMode === 1)
      <script type="text/javascript">fetchSpecifiedArticleForEdit({{$id}})</script>
    @endif
  </body>
</html>