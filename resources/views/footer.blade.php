  <script>const main_url="{{ url('/') }}"</script>
  <script src="{{ asset('js/app.js') }}"></script>
  <script src="{{ asset('js/materialize.min.js') }}"></script>
  <script src="{{ asset('js/datatables.min.js') }}"></script>
  <script src="{{ asset('js/underscore-min.js') }}"></script>
  <script src="{{ asset('js/moment.min.js') }}"></script>
  <script src="{{ asset('js/script.js') }}?v={{ filemtime(public_path('js/script.js')) }}"></script>
</body>
</html>
