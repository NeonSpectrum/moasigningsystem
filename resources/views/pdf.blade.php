<body style="margin:0">
  <iframe src="http://docs.google.com/viewer?url=http://www.pdf995.com/samples/pdf.pdf&embedded=true" width="100%" height="100%" style="border: none;"></iframe>
</body>
<script src="{{ asset('public/js/jquery.min.js') }}"></script>
<script>
  var head = $("iframe").contents().find("head");
var css = '<style type="text/css">' +
          '.ndfHFb-c4YZDc-Wrql6b{display:none}; ' +
          '</style>';
$(head).append(css);
</script>
