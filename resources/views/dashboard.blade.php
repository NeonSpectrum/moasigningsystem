@include('header')
@include('modal')
<div class="row">
  <div id="admin" class="col s12">
    <div class="card material-table">
      <div class="table-header">
        <span class="table-title">MOA Signing System</span>
        <div class="actions">
          <a href="#addModal" class="modal-trigger waves-effect btn-flat nopadding"><i class="material-icons">add</i></a>
          <a href="#" class="search-toggle waves-effect btn-flat nopadding"><i class="material-icons">search</i></a>
        </div>
      </div>
      <table id="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Keywords</th>
            <th>Date</th>
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
