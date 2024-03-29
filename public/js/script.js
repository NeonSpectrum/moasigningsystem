;(function(window, document, undefined) {
  var factory = function($, DataTable) {
    'use strict'

    $('.search-toggle').click(function() {
      if ($('.hiddensearch').css('display') == 'none') {
        $('.hiddensearch').slideDown(function() {
          $('input[type=search]').focus()
        })
      } else $('.hiddensearch').slideUp()
    })

    /* Set the defaults for DataTables initialisation */
    $.extend(true, DataTable.defaults, {
      dom: "<'hiddensearch'f'>" + 'tr' + "<'table-footer'lip'>",
      renderer: 'material'
    })

    /* Default class modification */
    $.extend(DataTable.ext.classes, {
      sWrapper: 'dataTables_wrapper',
      sFilterInput: 'form-control input-sm',
      sLengthSelect: 'form-control input-sm'
    })

    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
      var api = new DataTable.Api(settings)
      var classes = settings.oClasses
      var lang = settings.oLanguage.oPaginate
      var btnDisplay,
        btnClass,
        counter = 0

      var attach = function(container, buttons) {
        var i, ien, node, button
        var clickHandler = function(e) {
          e.preventDefault()
          if (!$(e.currentTarget).hasClass('disabled')) {
            api.page(e.data.action).draw(false)
          }
        }

        for (i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i]

          if ($.isArray(button)) {
            attach(container, button)
          } else {
            btnDisplay = ''
            btnClass = ''

            switch (button) {
              case 'first':
                btnDisplay = lang.sFirst
                btnClass = button + (page > 0 ? '' : ' disabled')
                break

              case 'previous':
                btnDisplay = '<i class="material-icons">chevron_left</i>'
                btnClass = button + (page > 0 ? '' : ' disabled')
                break

              case 'next':
                btnDisplay = '<i class="material-icons">chevron_right</i>'
                btnClass = button + (page < pages - 1 ? '' : ' disabled')
                break

              case 'last':
                btnDisplay = lang.sLast
                btnClass = button + (page < pages - 1 ? '' : ' disabled')
                break
            }

            if (btnDisplay) {
              node = $('<li>', {
                class: classes.sPageButton + ' ' + btnClass,
                id: idx === 0 && typeof button === 'string' ? settings.sTableId + '_' + button : null
              })
                .append(
                  $('<a>', {
                    href: '#',
                    'aria-controls': settings.sTableId,
                    'data-dt-idx': counter,
                    tabindex: settings.iTabIndex
                  }).html(btnDisplay)
                )
                .appendTo(container)

              settings.oApi._fnBindAction(
                node,
                {
                  action: button
                },
                clickHandler
              )

              counter++
            }
          }
        }
      }

      // IE9 throws an 'unknown error' if document.activeElement is used
      // inside an iframe or frame.
      var activeEl

      try {
        // Because this approach is destroying and recreating the paging
        // elements, focus is lost on the select button which is bad for
        // accessibility. So we want to restore focus once the draw has
        // completed
        activeEl = $(document.activeElement).data('dt-idx')
      } catch (e) {}

      attach(
        $(host)
          .empty()
          .html('<ul class="material-pagination"/>')
          .children('ul'),
        buttons
      )

      if (activeEl) {
        $(host)
          .find('[data-dt-idx=' + activeEl + ']')
          .focus()
      }
    }

    /*
     * TableTools Bootstrap compatibility
     * Required TableTools 2.1+
     */
    if (DataTable.TableTools) {
      // Set the classes that TableTools uses to something suitable for Bootstrap
      $.extend(true, DataTable.TableTools.classes, {
        container: 'DTTT btn-group',
        buttons: {
          normal: 'btn btn-default',
          disabled: 'disabled'
        },
        collection: {
          container: 'DTTT_dropdown dropdown-menu',
          buttons: {
            normal: '',
            disabled: 'disabled'
          }
        },
        print: {
          info: 'DTTT_print_info'
        },
        select: {
          row: 'active'
        }
      })

      // Have the collection use a material compatible drop down
      $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
        collection: {
          container: 'ul',
          button: 'li',
          liner: 'a'
        }
      })
    }
  } // /factory

  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables'], factory)
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'))
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable)
  }
})(window, document)

$(document).ready(function() {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  })

  $('.modal').modal({
    endingTop: '5%',
    dismissible: false
  })

  window.dTable = $('#datatable').DataTable({
    oLanguage: {
      sStripClasses: '',
      sSearch: '',
      sSearchPlaceholder: 'Enter Keywords Here',
      sInfo: '_START_ -_END_ of _TOTAL_',
      sLengthMenu:
        '<span>Rows per page:</span><select class="browser-default">' +
        '<option value="10">10</option>' +
        '<option value="20">20</option>' +
        '<option value="30">30</option>' +
        '<option value="40">40</option>' +
        '<option value="50">50</option>' +
        '<option value="-1">All</option>' +
        '</select></div>'
    },
    bAutoWidth: false,
    search: {
      smart: false
    }
  })

  loadTable()
  dTable.column(3).visible(false)

  $('form[name=frmAdd]').submit(function(e) {
    e.preventDefault()

    $(this)
      .find('input')
      .prop('readonly', true)
    $(this)
      .find('button')
      .prop('disabled', true)

    let form_data = new FormData()
    form_data.append('data', $(this).serialize())
    form_data.append('file', $('input[name=file]').prop('files')[0])

    $.ajax({
      context: this,
      url: 'data/add',
      type: 'POST',
      data: form_data,
      contentType: false,
      processData: false,
      dataType: 'json',
      success: function(response) {
        console.log(response)
        if (response.success == true) {
          alert('Added Successfully!')
          $(this).trigger('reset')
          loadChips('#addModal')
          $('#addModal').modal('close')
          loadTable()
        } else {
          console.log(response)
          alert(response.error)
        }
      }
    }).always(function() {
      $(this)
        .find('input')
        .prop('readonly', false)
      $(this)
        .find('button')
        .prop('disabled', false)
    })
  })

  $('form[name=frmEdit]').submit(function(e) {
    e.preventDefault()

    $(this)
      .find('input')
      .prop('readonly', true)
    $(this)
      .find('button')
      .prop('disabled', true)

    let form_data = new FormData()
    form_data.append('data', $(this).serialize())

    if (
      $(this)
        .find('input[name=file]')
        .val()
    ) {
      form_data.append(
        'file',
        $(this)
          .find('input[name=file]')
          .prop('files')[0]
      )
    }
    $.ajax({
      context: this,
      url: 'data/edit',
      type: 'POST',
      data: form_data,
      contentType: false,
      processData: false,
      dataType: 'json',
      success: function(response) {
        console.log(response)
        if (response.success == true) {
          alert('Updated Successfully!')
          $('#editModal').modal('close')
          $(this).trigger('reset')
          loadTable()
        } else {
          console.log(response)
          alert(response.error)
        }
      }
    }).always(function() {
      $(this)
        .find('input')
        .prop('readonly', false)
      $(this)
        .find('button')
        .prop('disabled', false)
    })
  })

  $('.btnUpload').click(function() {
    $('input[name=uploadExcel]').trigger('click')
  })

  $('input[name=uploadExcel]').change(function() {
    if (!confirm('Are you sure do you want to upload?')) return

    let form_data = new FormData()

    form_data.append('file', $(this).prop('files')[0])

    $.ajax({
      url: 'data/upload',
      type: 'POST',
      data: form_data,
      dataType: 'json',
      contentType: false,
      processData: false,
      success: function(response) {
        if (response.success == true) {
          alert('Uploaded Successfully!')
          loadTable()
        } else {
          console.log(response)
          alert(response.error)
        }
      }
    })
  })
})

function loadTable() {
  $.ajax({
    url: 'data',
    dataType: 'json',
    success: function(response) {
      dTable.clear()
      $.each(response, function(key, value) {
        value = _.mapObject(value, function(val) {
          return _.escape(val)
        })
        dTable.row.add([
          value.id,
          value.partner_institution,
          value.activity_name,
          value.date,
          `
            ${
              value.file_name
                ? `<button onclick="window.open('${main_url +
                    '/uploads/' +
                    value.file_name}')" class="waves-effect waves-light btn btn-flat">
                    <i class="material-icons">pageview</i>
                  </button>`
                : ''
            }
            <button onclick="editData(${
              value.id
            })"  class="waves-effect waves-light btn btn-flat btnEdit" data-id="${value.id}">
              <i class="material-icons">edit</i>
            </button>
            <button onclick="deleteData(${
              value.id
            })"  class="waves-effect waves-light btn btn-flat btnDelete" data-id="${value.id}">
              <i class="material-icons">delete</i>
            </button>
          `
        ])
      })
      dTable.draw()
    }
  })
}

function editData(id) {
  let modal = $('#editModal')

  modal.find('.loader-container').show()
  modal.modal('open')

  $.ajax({
    url: 'data/' + id,
    dataType: 'json',
    success: function(response) {
      modal.find('input[name=id]').val(id)
      modal.find('input[name=partner_institution]').val(response.partner_institution)
      modal.find('input[name=activity_name]').val(response.activity_name)
      modal.find('input[name=date]').val(response.date)

      modal.find('.loader-container').fadeOut()
    }
  })
}

function deleteData(id) {
  if (!confirm('Are you sure do you want to delete?')) return

  $(this).prop('disabled', false)

  $.ajax({
    url: 'data/delete',
    type: 'POST',
    data: { id },
    dataType: 'json',
    success: function(response) {
      if (response.success) {
        alert('Deleted Successfully!')
        loadTable()
      } else {
        alert(response.error)
      }
    }
  })
}

$('form[name=frmLogin]').submit(function(e) {
  e.preventDefault()

  $(this)
    .find('input')
    .prop('readonly', true)
  $(this)
    .find('button[type=submit]')
    .prop('disabled', true)

  $.ajax({
    context: this,
    type: 'POST',
    url: main_url + '/login',
    data: $(this).serialize(),
    dataType: 'json'
  })
    .done(function(response) {
      if (response.success) {
        location.href = './'
      } else {
        alert(response.error)
      }
    })
    .always(function() {
      $(this)
        .find('input')
        .prop('readonly', false)
      $(this)
        .find('button[type=submit]')
        .prop('disabled', false)
    })
})
