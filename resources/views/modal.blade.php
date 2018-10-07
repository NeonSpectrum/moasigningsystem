 <div id="addModal" class="modal modal-fixed-footer">
  <form name="frmAdd">
    <div class="modal-content">
      <h4>Add</h4>
      <div class="row">
        <div class="input-field col s12">
          <p class="caption">Title</p>
          <input name="title" type="text" class="validate" placeholder="Enter the title" required>
        </div>
        <div class="input-field col s12">
          <p class="caption">Authors</p>
          <div class="chips chips-placeholder" data-name="authors"></div>
        </div>
        <div class="input-field col s12">
          <p class="caption">Keywords</p>
          <div class="chips chips-placeholder" data-name="keywords"></div>
        </div>
        <div class="input-field col s12">
          <p class="caption">Date</p>
          <input id="date" name="date" type="text" class="datepicker" placeholder="Click to select a date" style="cursor:pointer" readonly required>
        </div>
        <div class="file-field input-field col s12">
          <p class="caption">Upload PDF</p>
          <div class="btn">
            <span>Upload</span>
            <input type="file" name="file" required>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Select a PDF file">
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="modal-close waves-effect waves-green btn-flat">Close</button>
      <button type="submit" class="waves-effect waves-green btn-flat">Add</button>
    </div>
  </form>
</div>
 <div id="editModal" class="modal modal-fixed-footer">
  <form name="frmEdit">
    <input type="hidden" name="id">
    <div class="modal-content">
      <h4>Edit</h4>
      <div class="loader-container">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <p class="caption">Title</p>
          <input name="title" type="text" class="validate" placeholder="Enter the title" required>
        </div>
        <div class="input-field col s12">
          <p class="caption">Authors</p>
          <div class="chips chips-placeholder" data-name="authors"></div>
        </div>
        <div class="input-field col s12">
          <p class="caption">Keywords</p>
          <div class="chips chips-placeholder" data-name="keywords"></div>
        </div>
        <div class="input-field col s12">
          <p class="caption">Date</p>
          <input name="date" type="text" class="datepicker" placeholder="Click to select a date" style="cursor:pointer" readonly required>
        </div>
        <div class="file-field input-field col s12">
          <p class="caption">Upload PDF</p>
          <div class="btn">
            <span>Upload</span>
            <input type="file" name="file">
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Select a PDF file">
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="modal-close waves-effect waves-green btn-flat">Close</button>
      <button type="submit" class="waves-effect waves-green btn-flat">Save</button>
    </div>
  </form>
</div>
