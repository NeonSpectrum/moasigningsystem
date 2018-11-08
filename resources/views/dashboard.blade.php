@include('header')
@include('modal')
<div class="row">
  <div id="admin" class="col s12">
    <div class="card material-table">
      <div class="center-align" style="padding-top:10px;width:100%">
        <img src="{{ asset('public/img/rnd.png') }}" alt="" height="80px">
        <img src="{{ asset('public/img/ue_thumb.png') }}" alt="" height="80px">
        <img src="{{ asset('public/img/ccss_thumb.png') }}" alt="" height="80px">
      </div>
      <div class="table-header">
        <span class="table-title">College Partnership Archiving System</span>
        <div class="actions">
          <a href="#" class="btnUpload modal-trigger waves-effect btn-flat nopadding"><i class="material-icons">file_upload</i></a>
          <a href="#addModal" class="modal-trigger waves-effect btn-flat nopadding"><i class="material-icons">add</i></a>
          <a href="#" class="search-toggle waves-effect btn-flat nopadding"><i class="material-icons">search</i></a>
          <a href="{{ url('logout') }}" class="waves-effect btn-flat nopadding" onclick="return confirm('Are you sure do you want to logout?')"><i class="material-icons">logout</i></a>
        </div>
        <input type="file" name="uploadExcel" style="display:none">
      </div>
      <table id="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Partner Institution</th>
            <th>Activity Name</th>
            <th>Date of Activity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>
@include('footer')
